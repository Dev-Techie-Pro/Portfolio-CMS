(function () {
  function guessLang(pre) {
    const data = pre.getAttribute("data-language") || pre.dataset.language;
    if (data) return data;
    const code = pre.querySelector("code");
    if (code) {
      const cls = Array.from(code.classList).find((c) => c.startsWith("language-"));
      if (cls) return cls.replace("language-", "");
    }
    return "plaintext";
  }

  function copyText(text) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      return Promise.resolve();
    } finally {
      document.body.removeChild(ta);
    }
  }

  function showToast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    window.clearTimeout(el._bdToastTimer);
    el._bdToastTimer = window.setTimeout(() => el.classList.remove("show"), 2200);
  }

  function enhanceCodeBlocks(root) {
    if (!root) return;
    root.querySelectorAll(".article-content pre").forEach((pre) => {
      if (pre.closest(".bd-code-block") || pre.dataset.bdEnhanced === "1") return;
      pre.dataset.bdEnhanced = "1";
      const codeEl = pre.querySelector("code");
      const source = codeEl ? codeEl.textContent : pre.textContent;
      const lang = guessLang(pre);
      const wrap = document.createElement("div");
      wrap.className = "bd-code-block";
      wrap.setAttribute("data-lang", lang);
      const bar = document.createElement("div");
      bar.className = "bd-code-block__top";
      bar.innerHTML = `<span class="bd-code-block__lang">${lang}</span><button type="button" class="bd-code-block__copy" aria-label="Copy code"><i class="ri-file-copy-line" aria-hidden="true"></i><span>Copy</span></button>`;
      const parent = pre.parentNode;
      parent.insertBefore(wrap, pre);
      wrap.appendChild(bar);
      wrap.appendChild(pre);
      const btn = bar.querySelector(".bd-code-block__copy");
      btn.addEventListener("click", () => {
        copyText(source || "")
          .then(() => {
            btn.classList.add("is-copied");
            const label = btn.querySelector("span");
            if (label) label.textContent = "Copied";
            window.setTimeout(() => {
              btn.classList.remove("is-copied");
              if (label) label.textContent = "Copy";
            }, 1600);
          })
          .catch(() => showToast("Could not copy code"));
      });
    });
  }

  function collectSectionTargets(articleRoot) {
    const items = [];
    articleRoot.querySelectorAll("section[id]").forEach((section) => {
      const id = section.getAttribute("id");
      const title =
        section.querySelector("h2")?.textContent?.trim() ||
        section.querySelector("h3")?.textContent?.trim() ||
        id;
      if (id) items.push({ id, title, el: section, kind: "section" });
    });
    articleRoot
      .querySelectorAll("[data-bd-segment-id]")
      .forEach((node) => {
        const id = node.getAttribute("data-bd-segment-id");
        if (!id) return;
        const title =
          node.getAttribute("data-bd-segment-title") ||
          node.querySelector(".stat-value")?.textContent?.trim() ||
          id;
        items.push({ id, title, el: node, kind: "segment" });
      });
    return items;
  }

  function applyHiddenToDom(articleRoot, hiddenSet) {
    if (!articleRoot || !hiddenSet) return;
    collectSectionTargets(articleRoot).forEach((item) => {
      const hide = hiddenSet.has(item.id);
      item.el.classList.toggle("bd-article-segment--hidden", hide);
      item.el.setAttribute("aria-hidden", hide ? "true" : "false");
    });
  }

  function filterTocLinks(hiddenSet) {
    const toc = document.getElementById("tocNav");
    if (!toc || !hiddenSet?.size) return;
    toc.querySelectorAll("a[href^='#']").forEach((link) => {
      const id = (link.getAttribute("href") || "").replace(/^#/, "");
      const hide = hiddenSet.has(id);
      link.classList.toggle("bd-toc-link--hidden", hide);
      link.setAttribute("aria-hidden", hide ? "true" : "false");
      if (hide) link.tabIndex = -1;
      else link.removeAttribute("tabindex");
    });
  }

  function renderVisibilityPanel(post, articleRoot, hiddenSet) {
    const shell = document.getElementById("bdSectionVisibility");
    const list = document.getElementById("bdSectionVisibilityList");
    if (!shell || !list || !articleRoot) return;

    const targets = collectSectionTargets(articleRoot);
    if (!targets.length) {
      shell.hidden = true;
      return;
    }

    shell.hidden = false;
    list.innerHTML = targets
      .map((item) => {
        const checked = !hiddenSet.has(item.id);
        return `<label class="bd-section-vis-item">
          <input type="checkbox" data-section-id="${item.id}" ${checked ? "checked" : ""} />
          <span class="bd-section-vis-title">${item.title}</span>
        </label>`;
      })
      .join("");

    list.querySelectorAll("input[type=checkbox]").forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.getAttribute("data-section-id");
        if (!id) return;
        if (input.checked) hiddenSet.delete(id);
        else hiddenSet.add(id);
        applyHiddenToDom(articleRoot, hiddenSet);
        filterTocLinks(hiddenSet);
        persistHiddenSections(post, Array.from(hiddenSet));
      });
    });
  }

  function persistHiddenSections(post, hiddenSections) {
    const slug = post?.id;
    if (!slug) return;
    fetch(`/api/blogs/${encodeURIComponent(slug)}/section-visibility`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hiddenSections }),
    }).catch(() => showToast("Could not save section visibility"));
  }

  function probeEditorAccess(slug) {
    if (!slug) return Promise.resolve(false);
    return fetch(`/api/blogs/${encodeURIComponent(slug)}/section-visibility`, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => res.ok && Boolean(data?.canEdit))
      .catch(() => false);
  }

  function initSectionVisibility(post) {
    const article = document.getElementById("bdArticleBody");
    if (!article) return;

    const hidden = new Set(
      Array.isArray(post.hiddenSections) ? post.hiddenSections : [],
    );

    probeEditorAccess(post.id).then((canEdit) => {
      if (!canEdit) return;
      renderVisibilityPanel(post, article, hidden);
      const toggle = document.getElementById("bdSectionVisibilityToggle");
      const panel = document.getElementById("bdSectionVisibilityPanel");
      if (toggle && panel) {
        toggle.addEventListener("click", () => {
          const open = panel.hidden;
          panel.hidden = !open;
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
      }
    });
  }

  window.Portfolio.BLOG_ARTICLE_UI = {
    enhanceCodeBlocks,
    initSectionVisibility,
    applyHiddenToDom,
    filterTocLinks,
  };
})();
