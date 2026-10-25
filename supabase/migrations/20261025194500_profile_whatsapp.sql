alter table public.profiles
  add column if not exists whatsapp text;

alter table public.site_settings
  add column if not exists profile_whatsapp text;
