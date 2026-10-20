/** Whether staff bootstrap / prefetch should load full blog post bodies for this admin page. */
export function blogPostsIncludeContent(page: string): boolean {
  return page === 'blogposts';
}

export function blogPostsApiPath(page: string): string {
  return blogPostsIncludeContent(page)
    ? '/api/blog-posts?full=1'
    : '/api/blog-posts';
}
