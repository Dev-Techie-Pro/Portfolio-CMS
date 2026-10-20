import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const path = resolve("public/assets/js/data/blogs-data.js");
const src = readFileSync(path, "utf8");
const fnStart = src.indexOf("function _resolveBlogIcon");
if (fnStart < 0) throw new Error("fn start not found");

const header = `"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.BLOGS = {}),
  (window.Portfolio.BLOG_ORDER = []),
  (window.Portfolio.BLOG_GALLERY_ORDER = []));

`;

let out = header + src.slice(fnStart);

// BLOG_LIST async
out = out.replace(
  `function init() {
    if (window.Portfolio.UTILS.getActivePage() !== "blogs") return;

    const posts = _getPosts();`,
  `function init() {
    if (window.Portfolio.UTILS.getActivePage() !== "blogs") return;

    const run = () => {
    const posts = _getPosts();`,
);

out = out.replace(
  `    _refreshSkeleton(document.querySelector(".blog-page") || document);
  }

  return { init };
})()),
  (window.Portfolio.BLOG_DETAILS`,
  `    _refreshSkeleton(document.querySelector(".blog-page") || document);
    };

    window.Portfolio.ensureBlogCatalog().then(run).catch(() => {
      const gallery = document.getElementById("blogsGrid");
      if (gallery) {
        gallery.innerHTML =
          '<p class="blog-load-error">Could not load blogs. Please try again later.</p>';
      }
    });
  }

  return { init };
})()),
  (window.Portfolio.BLOG_DETAILS`,
);

// BLOG_DETAILS async
out = out.replace(
  `    function init() {
      if (window.Portfolio.UTILS.getActivePage() !== "blog-details") return;

      const id = _resolveBlogId();`,
  `    function init() {
      if (window.Portfolio.UTILS.getActivePage() !== "blog-details") return;

      const runDetail = () => {
      const id = _resolveBlogId();`,
);

out = out.replace(
  `      _refreshSkeleton(
        document.querySelector(".blog-details-page") || document,
      );
    }

    return { init };
  })()),
  (window.Portfolio.BLOG_LINKS`,
  `      _refreshSkeleton(
        document.querySelector(".blog-details-page") || document,
      );
      };

      window.Portfolio.ensureBlogCatalog().then(runDetail).catch(() => {
        window.location.href = "/blogs";
      });
    }

    return { init };
  })()),
  (window.Portfolio.BLOG_LINKS`,
);

// BLOG_LINKS async
out = out.replace(
  `    return {
      init: function () {
        const page = window.Portfolio.UTILS.getActivePage();
        if (page === "home") {`,
  `    return {
      init: function () {
        const page = window.Portfolio.UTILS.getActivePage();
        const start = () => {
        if (page === "home") {`,
);

out = out.replace(
  `          if (viewAll) viewAll.href = "/blogs";
        }
      },
    };
  })()),
  (function () {
    function _initBlogModules`,
  `          if (viewAll) viewAll.href = "/blogs";
        }
        };
        window.Portfolio.ensureBlogCatalog().then(start).catch(() => {});
      },
    };
  })()),
  (function () {
    function _initBlogModules`,
);

// Dynamic topic counts
out = out.replace(
  `    if (topics) {
      const topicConfig = [
        { slug: "backend", name: "Backend", count: 3 },
        { slug: "frontend", name: "Frontend", count: 3 },
        { slug: "wordpress", name: "WordPress", count: 1 },
        { slug: "architecture", name: "Architecture", count: 1 },
        { slug: "ui-ux", name: "UI/UX Design", count: 1 },
        { slug: "designs-system", name: "Designs System", count: 1 },
      ];
      topics.innerHTML = topicConfig
        .map((topic) => _renderTopicCard(topic.name, topic.count, topic.slug))
        .join("");
    }`,
  `    if (topics) {
      const categoryCounts = {};
      posts.forEach((post) => {
        const slug = _categorySlug(post.category);
        categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
      });
      const topicConfig = Object.entries(categoryCounts)
        .map(([slug, count]) => ({
          slug,
          name: slug,
          count,
        }))
        .sort((a, b) => b.count - a.count);
      // fix name from first matching post
      topicConfig.forEach((topic) => {
        const sample = posts.find((p) => _categorySlug(p.category) === topic.slug);
        if (sample) topic.name = sample.category;
      });
      topics.innerHTML = topicConfig
        .map((topic) => _renderTopicCard(topic.name, topic.count, topic.slug))
        .join("");
    }`,
);

writeFileSync(path, out);
console.log("patched blogs-data.js", out.length);
