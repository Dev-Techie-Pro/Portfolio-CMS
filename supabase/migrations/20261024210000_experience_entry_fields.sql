-- Extended experience entry fields for portfolio timeline detail panels.

do $$ begin
  create type public.work_mode as enum ('on-site', 'remote', 'hybrid');
exception
  when duplicate_object then null;
end $$;

alter table public.experience_entries
  add column if not exists work_mode public.work_mode,
  add column if not exists team_size text,
  add column if not exists domain text,
  add column if not exists key_achievements text[] not null default '{}',
  add column if not exists role_impacts jsonb not null default '[]'::jsonb,
  add column if not exists technology_ids integer[] not null default '{}';

alter table public.experience_entries
  drop constraint if exists experience_key_achievements_max_three;

alter table public.experience_entries
  add constraint experience_key_achievements_max_three
  check (coalesce(array_length(key_achievements, 1), 0) <= 3);

alter table public.experience_entries
  drop constraint if exists experience_role_impacts_is_array;

alter table public.experience_entries
  add constraint experience_role_impacts_is_array
  check (jsonb_typeof(role_impacts) = 'array' and jsonb_array_length(role_impacts) <= 3);
