alter table public.site_settings
  add column if not exists icon_registry_json jsonb not null default '{"overrides":{},"removed":[],"labels":{},"sortOrder":[]}'::jsonb;
