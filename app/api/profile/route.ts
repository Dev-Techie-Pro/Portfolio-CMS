// @ts-nocheck
import { NextResponse } from 'next/server';
import { guardAuthenticated } from '@/lib/auth/guard';
import { getProfileForUser, updateProfileByUserId } from '@/lib/auth/profile';
import { STAFF_ROLES } from '@/lib/auth/constants';
import { logProfileChanges } from '@/lib/cms/activity-events';
import { syncPortfolioProfileToSiteSettings } from '@/lib/portfolio/social-cms';

export async function GET() {
  try {
    const auth = await guardAuthenticated();
    if (!auth.ok) return auth.response;

    const profile = await getProfileForUser(auth.user);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const auth = await guardAuthenticated();
    if (!auth.ok) return auth.response;

    const current = await getProfileForUser(auth.user);
    const body = await request.json();
    if ('email' in body) {
      delete body.email;
    }
    const canEditRole = STAFF_ROLES.includes(current.role) && current.role === 'super_admin';

    const profile = await updateProfileByUserId(auth.user.id, body, { canEditRole });

    await logProfileChanges({
      auth,
      request,
      before: current,
      after: profile,
      payload: body,
    });

    try {
      await syncPortfolioProfileToSiteSettings({
        fullName: profile.fullName,
        username: profile.username,
        role: profile.role,
        phone: profile.phone,
        dob: profile.dob,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        whatsapp: profile.whatsapp,
        email: profile.email,
        socialLinks: profile.socialLinks,
      });
    } catch (syncErr) {
      console.warn('[profile] public profile sync failed:', syncErr);
    }

    return NextResponse.json({ ok: true, profile });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
