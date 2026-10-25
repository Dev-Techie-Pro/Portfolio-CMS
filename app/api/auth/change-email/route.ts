// @ts-nocheck
import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { guardAal2 } from '@/lib/auth/guard';
import { jsonInternalError } from '@/lib/api/api-error';

export async function POST(request) {
  try {
    const auth = await guardAal2();
    if (!auth.ok) return auth.response;

    const { newEmail, currentPassword } = await request.json();
    const email = auth.user.email;
    const nextEmail = String(newEmail || '').trim().toLowerCase();

    if (!nextEmail) {
      return NextResponse.json({ error: 'New email address is required.' }, { status: 400 });
    }
    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required.' }, { status: 400 });
    }
    if (nextEmail === String(email || '').toLowerCase()) {
      return NextResponse.json({ error: 'That is already your email address.' }, { status: 400 });
    }

    const verifyOnly = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { error: verifyError } = await verifyOnly.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (verifyError) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
    }

    const { error } = await auth.supabase.auth.updateUser({ email: nextEmail });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message:
        'We sent confirmation links to your current and new email. Your login email updates after you confirm.',
    });
  } catch (error) {
    return jsonInternalError('auth/change-email', error);
  }
}
