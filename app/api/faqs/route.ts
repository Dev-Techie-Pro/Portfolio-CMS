// @ts-nocheck
import { NextResponse } from 'next/server';
import { getFaqs, saveFaqs } from '@/lib/cms/repository';
import { getFaqActivitySnapshots } from '@/lib/cms/activity-snapshots';
import { guardEditor } from '@/lib/auth/guard';
import { withStaffGet } from '@/lib/api/with-staff-get';
import { logArrayEntityChanges } from '@/lib/cms/activity-events';

export async function GET() {
  return withStaffGet(() => getFaqs(), { maxAgeSec: 180 });
}

export async function PUT(request) {
  const auth = await guardEditor();
  if (!auth.ok) return auth.response;
  try {
    const before = await getFaqActivitySnapshots();
    const records = await request.json();
    await saveFaqs(records);
    await logArrayEntityChanges({
      auth,
      request,
      entity: 'faq',
      entityLabel: 'FAQ',
      before,
      after: records,
      titleFn: (f) => f.question || 'Untitled',
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
