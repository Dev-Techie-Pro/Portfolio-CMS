"use strict";

(function () {
  const Portfolio = window.Portfolio || {};
  window.Portfolio = Portfolio;

  Portfolio.BLOGS = Portfolio.BLOGS || {};
  Portfolio.BLOG_ORDER = Portfolio.BLOG_ORDER || [];
  Portfolio.BLOG_GALLERY_ORDER = Portfolio.BLOG_GALLERY_ORDER || [];

  let catalogPromise = null;
  const postPromises = new Map();

  function applyCatalog(catalog) {
    const posts = catalog.posts || [];
    const blogs = {};
    posts.forEach((post) => {
      if (post && post.id) blogs[post.id] = post;
    });
    Portfolio.BLOGS = blogs;
    Portfolio.BLOG_ORDER = catalog.order || Object.keys(blogs);
    Portfolio.BLOG_GALLERY_ORDER =
      catalog.galleryOrder || Portfolio.BLOG_ORDER.slice();
    Portfolio.__blogCatalogLoaded = true;
  }

  function postHasBody(post) {
    return post && Array.isArray(post.content) && post.content.length > 0;
  }

  Portfolio.ensureBlogPost = function ensureBlogPost(slug) {
    const id = String(slug || "").trim().toLowerCase();
    if (!id) {
      return Promise.reject(new Error("Missing blog id"));
    }
    const cached = Portfolio.BLOGS[id];
    if (postHasBody(cached)) {
      return Promise.resolve(cached);
    }
    if (!postPromises.has(id)) {
      const promise = fetch(`/api/blogs/${encodeURIComponent(id)}`, {
        credentials: "same-origin",
      })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load blog post");
          }
          const post = data.post;
          if (post && post.id) {
            Portfolio.BLOGS[post.id] = Object.assign(
              {},
              Portfolio.BLOGS[post.id] || {},
              post,
            );
          }
          return post;
        })
        .catch((err) => {
          postPromises.delete(id);
          throw err;
        });
      postPromises.set(id, promise);
    }
    return postPromises.get(id);
  };

  Portfolio.ensureBlogCatalog = function ensureBlogCatalog() {
    if (Portfolio.__blogCatalogLoaded) {
      return Promise.resolve(Portfolio.BLOGS);
    }
    if (!catalogPromise) {
      catalogPromise = fetch("/api/blogs", { credentials: "same-origin" })
        .then((res) => res.json().then((data) => ({ res, data })))
        .then(({ res, data }) => {
          if (!res.ok) {
            throw new Error(data.error || "Failed to load blogs");
          }
          applyCatalog(data);
          return Portfolio.BLOGS;
        })
        .catch((err) => {
          catalogPromise = null;
          console.error("[blogs-loader]", err);
          throw err;
        });
    }
    return catalogPromise;
  };

  Portfolio.resetBlogCatalog = function resetBlogCatalog() {
    Portfolio.__blogCatalogLoaded = false;
    catalogPromise = null;
    postPromises.clear();
    Portfolio.BLOGS = {};
    Portfolio.BLOG_ORDER = [];
    Portfolio.BLOG_GALLERY_ORDER = [];
  };
})();
