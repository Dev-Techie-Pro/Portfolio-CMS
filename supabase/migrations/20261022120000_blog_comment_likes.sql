-- Likes on individual blog comments (public visitors)

create table if not exists public.blog_post_comment_likes (
  id          uuid primary key default gen_random_uuid(),
  site_id     uuid not null references public.sites (id) on delete cascade,
  comment_id  uuid not null references public.blog_post_comments (id) on delete cascade,
  visitor_key text not null,
  created_at  timestamptz not null default timezone('utc', now()),
  constraint blog_post_comment_likes_visitor_key_len check (char_length(visitor_key) between 8 and 128),
  unique (comment_id, visitor_key)
);

create index if not exists blog_post_comment_likes_comment_idx
  on public.blog_post_comment_likes (comment_id);

alter table public.blog_post_comment_likes enable row level security;
