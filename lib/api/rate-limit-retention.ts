import { createAdminClient } from '@/lib/supabase/admin';
import {
  getRuntimeSettingSync,
  warmRuntimeSettings,
} from '@/lib/config/runtime-settings';

export const DEFAULT_API_RATE_LIMITS_PRUNE_KEEP_DAYS = 7;

function parsePositiveInt(value: string | undefined, fallback: number) {
  const n = Number.parseInt(value || '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function apiRateLimitsPruneKeepDays() {
  await warmRuntimeSettings();
  return parsePositiveInt(
    getRuntimeSettingSync('API_RATE_LIMITS_PRUNE_KEEP_DAYS'),
    DEFAULT_API_RATE_LIMITS_PRUNE_KEEP_DAYS,
  );
}

/** Remove expired rate-limit window rows (hygiene; does not weaken active limits). */
export async function purgeExpiredApiRateLimits() {
  const keepDays = await apiRateLimitsPruneKeepDays();
  const sb = createAdminClient();
  const { data, error } = await sb.rpc('pa_prune_api_rate_limits', {
    p_keep_days: keepDays,
  });
  if (error) throw error;
  return { deleted: data ?? 0, keepDays };
}
