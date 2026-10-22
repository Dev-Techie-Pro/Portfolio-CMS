-- Footer / public newsletter sign-ups (service role inserts via API).

create table public.newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  site_id         uuid not null references public.sites (id) on delete cascade,
  email           text not null,
  source          text not null default 'footer',
  subscribed_at   timestamptz not null default timezone('utc', now()),
  unsubscribed_at timestamptz,
  sender_ip       inet
);

create unique index newsletter_subscribers_active_email_idx
  on public.newsletter_subscribers (site_id, lower(email))
  where unsubscribed_at is null;

create index newsletter_subscribers_site_subscribed_idx
  on public.newsletter_subscribers (site_id, subscribed_at desc);

alter table public.newsletter_subscribers enable row level security;
