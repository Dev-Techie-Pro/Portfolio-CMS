-- FAQ entries for portfolio homepage accordion (admin CRUD at /admin/faqs)

create table public.faq_entries (
  id            uuid primary key default gen_random_uuid(),
  site_id       uuid not null references public.sites (id) on delete cascade,
  legacy_id     integer,
  question      text not null,
  answer        text not null,
  is_published  boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default timezone('utc', now()),
  updated_at    timestamptz not null default timezone('utc', now()),
  deleted_at    timestamptz,
  version       integer not null default 1
);

create index faq_entries_site_id_idx on public.faq_entries (site_id);
create unique index faq_entries_site_legacy_id_idx on public.faq_entries (site_id, legacy_id)
  where legacy_id is not null;

create trigger faq_entries_set_updated_at
  before update on public.faq_entries
  for each row execute function public.set_updated_at();

alter table public.faq_entries enable row level security;

create policy "Public read published faqs"
  on public.faq_entries for select
  using (deleted_at is null and is_published = true);

create policy "Staff manage faqs"
  on public.faq_entries for all
  using (public.is_authenticated_staff())
  with check (public.is_authenticated_staff());
