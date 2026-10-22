// @ts-nocheck
import { createAdminClient } from '@/lib/supabase/admin';
import { SITE_ID } from '@/lib/cms/constants';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribePublicNewsletter(
  rawEmail: string,
  senderIp: string | null,
  honeypot?: string,
) {
  if (honeypot?.trim()) {
    return { ok: false as const, error: 'Unable to subscribe.', status: 400 };
  }

  const email = rawEmail?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false as const, error: 'Please enter a valid email address.', status: 400 };
  }

  const sb = createAdminClient();
  const { data: existing, error: lookupErr } = await sb
    .from('newsletter_subscribers')
    .select('id')
    .eq('site_id', SITE_ID)
    .ilike('email', email)
    .is('unsubscribed_at', null)
    .maybeSingle();

  if (lookupErr) {
    if (lookupErr.code === '42P01') {
      console.error('[newsletter] table missing — run Supabase migration');
      return {
        ok: false as const,
        error: 'Newsletter is not available right now. Please try again later.',
        status: 503,
      };
    }
    throw lookupErr;
  }

  if (existing?.id) {
    return { ok: true as const, already: true };
  }

  const { error: insertErr } = await sb.from('newsletter_subscribers').insert({
    site_id: SITE_ID,
    email,
    source: 'footer',
    sender_ip: senderIp,
  });

  if (insertErr) {
    if (insertErr.code === '23505') {
      return { ok: true as const, already: true };
    }
    throw insertErr;
  }

  return { ok: true as const, already: false };
}
