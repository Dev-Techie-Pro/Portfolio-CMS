-- Retention for api_rate_limits (expired rate-limit windows; safe to delete).

create or replace function public.pa_prune_api_rate_limits(p_keep_days int default 7)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted bigint;
begin
  if p_keep_days is null or p_keep_days < 1 then
    p_keep_days := 7;
  end if;
  delete from public.api_rate_limits
  where window_start < timezone('utc', now()) - make_interval(days => p_keep_days);
  get diagnostics deleted = row_count;
  return deleted;
end;
$$;

comment on function public.pa_prune_api_rate_limits(int) is
  'Deletes api_rate_limits rows whose window_start is older than p_keep_days. Does not affect active windows.';

revoke all on function public.pa_prune_api_rate_limits(int) from public;
grant execute on function public.pa_prune_api_rate_limits(int) to service_role;

do $schedule$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(jobid)
    from cron.job
    where jobname = 'prune-api-rate-limits';

    perform cron.schedule(
      'prune-api-rate-limits',
      '45 3 * * *',
      $$select public.pa_prune_api_rate_limits(7);$$
    );
  end if;
end;
$schedule$;
