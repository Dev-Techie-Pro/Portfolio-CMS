// @ts-nocheck
import { createClient } from '@supabase/supabase-js';

/**
 * Service-role client for trusted server-side operations only.
 * Never import this in client components or expose to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase admin environment variables.');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

let adminSingleton: ReturnType<typeof createAdminClient> | null = null;

/** Cached service-role client (portfolio + CMS server routes). */
export function getSupabaseAdmin() {
  if (!adminSingleton) adminSingleton = createAdminClient();
  return adminSingleton;
}

export function getSiteId(): string {
  return (
    process.env.SUPABASE_SITE_ID?.trim() ||
    process.env.NEXT_PUBLIC_SITE_ID?.trim() ||
    '00000000-0000-4000-8000-000000000001'
  );
}
