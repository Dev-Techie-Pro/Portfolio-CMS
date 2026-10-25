// @ts-nocheck
import { NextResponse } from 'next/server';
import { authorizeCronRequest } from '@/lib/api/cron-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { purgeExpiredLoginActivity } from '@/lib/auth/login-activity-retention';
import { purgeExpiredApiRateLimits } from '@/lib/api/rate-limit-retention';
import { sessionPruneKeepDays } from '@/lib/config/runtime-settings';

/**
 * Scheduled purge for stale user_sessions, login_activity, and api_rate_limits rows.
 * Set CRON_SECRET in env and call with: Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request) {
  const denied = authorizeCronRequest(request);
  if (denied) return denied;

  try {
    const keepDays = await sessionPruneKeepDays();
    const { data, error } = await createAdminClient().rpc('pa_prune_user_sessions', {
      p_keep_days: keepDays,
    });
    if (error) throw error;

    const loginActivity = await purgeExpiredLoginActivity();
    const apiRateLimits = await purgeExpiredApiRateLimits();

    return NextResponse.json({
      ok: true,
      sessionsDeleted: data ?? 0,
      loginActivity,
      apiRateLimits,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
