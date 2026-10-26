(function initPrefetchConfig(global) {
  const PAGE_KEYS = {
    dashboard: [
      "pa_projects",
      "pa_technologies",
      "pa_experience",
      "pa_testimonials",
      "pa_media_library",
      "pa_tools",
      "pa_category_meta",
      "pa_recent_activities"
    ],
    projects: ["pa_projects", "pa_category_meta", "pa_technologies", "pa_tool_categories"],
    categories: ["pa_category_meta"],
    technologies: ["pa_technologies"],
    "tool-categories": ["pa_tool_categories"],
    tools: ["pa_tools", "pa_tool_categories"],
    media: ["pa_media_library"],
    testimonials: ["pa_testimonials"],
    blogposts: ["pa_blog_posts", "pa_blog_categories"],
    "blog-tags": ["pa_blog_tags", "pa_blog_posts"],
    "project-tags": ["pa_project_tag_labels", "pa_projects"],
    "blog-engagement": ["pa_blog_posts"],
    experience: ["pa_experience"],
    faqs: ["pa_faqs"],
    "contact-messages": ["pa_contact_messages"],
    "recent-activities": ["pa_recent_activities"],
    settings: ["pa_settings", "pa_recent_activities", "pa_notification_preferences"]
  };
  const GLOBAL_KEYS = ["pa_notifications", "pa_settings"];
  const ROUTE_BY_KEY = {
    pa_projects: "/api/projects",
    pa_category_meta: "/api/categories",
    pa_technologies: "/api/technologies",
    pa_media_library: "/api/media",
    pa_testimonials: "/api/testimonials",
    pa_blog_posts: "/api/blog-posts",
    pa_blog_categories: "/api/blog-categories",
    pa_project_tag_labels: "/api/project-tags",
    pa_project_technology_usage: "/api/project-technologies",
    pa_blog_tags: "/api/blog-tags",
    pa_project_tags: "/api/project-tags",
    pa_experience: "/api/experience",
    pa_faqs: "/api/faqs",
    pa_contact_messages: "/api/contact-messages",
    pa_recent_activities: "/api/recent-activities",
    pa_tools: "/api/tools",
    pa_tool_categories: "/api/tool-categories",
    pa_settings: "/api/settings",
    pa_msg_column_visibility: "/api/preferences/contact-columns",
    pa_notification_preferences: "/api/notification-preferences",
    pa_notifications: "/api/notifications"
  };
  function resolvePage(path) {
    if (path.includes("/admin/project-tags")) return "project-tags";
    if (path.includes("/admin/project-technologies")) return "project-technologies";
    if (path.includes("/admin/project-categories")) return "categories";
    if (path.includes("/admin/blog-categories")) return "blog-categories";
    if (path.includes("/admin/tool-categories")) return "tool-categories";
    if (path.includes("/admin/blog-tags")) return "blog-tags";
    if (path.includes("/admin/projects")) return "projects";
    if (path.includes("/admin/categories")) return "categories";
    if (path.includes("/admin/technologies")) return "technologies";
    if (path.includes("/admin/tools")) return "tools";
    if (path.includes("/admin/media-library")) return "media";
    if (path.includes("/admin/testimonials")) return "testimonials";
    if (path.includes("/admin/blog-engagement")) return "blog-engagement";
    if (path.includes("/admin/blog-post")) return "blogposts";
    if (path.includes("/admin/experience")) return "experience";
    if (path.includes("/admin/faqs")) return "faqs";
    if (path.includes("/admin/icon-registry")) return "icon-registry";
    if (path.includes("/admin/contact-messages")) return "contact-messages";
    if (path.includes("/admin/recent-activities")) return "recent-activities";
    if (path.includes("/admin/settings")) return "settings";
    return "dashboard";
  }
  function getKeysForPage(page) {
    const pageKeys = PAGE_KEYS[page] || [];
    const merged = GLOBAL_KEYS.slice();
    pageKeys.forEach(function(key) {
      if (merged.indexOf(key) === -1) merged.push(key);
    });
    return merged;
  }
  function routeForKey(key, page) {
    if (key === "pa_blog_posts") {
      return page === "blogposts" ? "/api/blog-posts?full=1" : "/api/blog-posts";
    }
    return ROUTE_BY_KEY[key];
  }
  global.__paPrefetchConfig = {
    PAGE_KEYS,
    GLOBAL_KEYS,
    ROUTE_BY_KEY,
    routeForKey,
    resolvePage,
    getKeysForPage
  };
})(typeof window !== "undefined" ? window : globalThis);
//# sourceMappingURL=prefetch-config.js.map
