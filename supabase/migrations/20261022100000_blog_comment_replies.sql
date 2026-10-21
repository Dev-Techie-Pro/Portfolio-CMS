-- Threaded replies on public blog comments (one level: reply to top-level comment)

alter table public.blog_post_comments
  add column if not exists parent_comment_id uuid references public.blog_post_comments (id) on delete cascade;

create index if not exists blog_post_comments_parent_idx
  on public.blog_post_comments (parent_comment_id)
  where parent_comment_id is not null and deleted_at is null;
