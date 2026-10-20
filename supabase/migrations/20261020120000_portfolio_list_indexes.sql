-- Portfolio home/list queries: filter by site + status + sort order (completed projects).

create index if not exists projects_site_completed_sort_idx
  on public.projects (site_id, sort_order asc)
  where deleted_at is null and status = 'Completed';

create index if not exists blog_posts_site_published_list_idx
  on public.blog_posts (site_id, sort_order asc, published_at desc)
  where deleted_at is null and status = 'Published';
