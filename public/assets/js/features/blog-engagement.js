(function () {
  const STORAGE_KEY = "portfolio_blog_visitor_id";

  function getVisitorKey() {
    try {
      let id = localStorage.getItem(STORAGE_KEY);
      if (!id || id.length < 16) {
        id =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `v_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
        localStorage.setItem(STORAGE_KEY, id);
      }
      return id;
    } catch {
      return `v_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
    }
  }

  function apiHeaders(visitorKey) {
    return {
      "Content-Type": "application/json",
      "x-blog-visitor": visitorKey,
    };
  }

  function initials(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function formatDate(iso) {
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(iso));
    } catch {
      return "";
    }
  }

  function formatRelativeTime(iso) {
    try {
      const d = new Date(iso);
      const sec = Math.floor((Date.now() - d.getTime()) / 1000);
      if (!Number.isFinite(sec) || sec < 0) return formatDate(iso);
      if (sec < 45) return "just now";
      const min = Math.floor(sec / 60);
      if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
      const hr = Math.floor(min / 60);
      if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
      const day = Math.floor(hr / 24);
      if (day < 7) return `${day} day${day === 1 ? "" : "s"} ago`;
      const week = Math.floor(day / 7);
      if (week < 5) return `${week} week${week === 1 ? "" : "s"} ago`;
      const month = Math.floor(day / 30);
      if (month < 12) return `${month} month${month === 1 ? "" : "s"} ago`;
      const year = Math.floor(day / 365);
      return `${year} year${year === 1 ? "" : "s"} ago`;
    } catch {
      return formatDate(iso);
    }
  }

  function toHandle(name) {
    const raw = String(name || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
    return raw ? `@${raw}` : "@user";
  }

  const AVATAR_HUES = [
    "#c62828",
    "#ad1457",
    "#6a1b9a",
    "#4527a0",
    "#283593",
    "#1565c0",
    "#0277bd",
    "#00838f",
    "#00695c",
    "#2e7d32",
    "#558b2f",
    "#9e9d24",
    "#f9a825",
    "#ff8f00",
    "#ef6c00",
    "#d84315",
    "#4e342e",
    "#546e7a",
  ];

  function avatarHue(name) {
    let h = 0;
    const s = String(name || "user");
    for (let i = 0; i < s.length; i++) h += s.charCodeAt(i);
    return AVATAR_HUES[h % AVATAR_HUES.length];
  }

  function mentionSlug(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function formatCommentBody(text) {
    const escaped = escapeHtml(text);
    return escaped
      .replace(
        /@([a-zA-Z0-9_.-]+)/g,
        '<span class="bd-yt-mention">@$1</span>',
      )
      .replace(/\n/g, "<br />");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeComment(raw) {
    return {
      id: raw.id,
      author_name: raw.author_name,
      body: raw.body,
      created_at: raw.created_at,
      parent_id: raw.parent_id || raw.parent_comment_id || null,
      like_count: Number(raw.like_count) || 0,
      liked: Boolean(raw.liked),
    };
  }

  function buildCommentTree(comments) {
    const byParent = new Map();
    const roots = [];
    comments.forEach((c) => {
      const pid = c.parent_id;
      if (pid) {
        if (!byParent.has(pid)) byParent.set(pid, []);
        byParent.get(pid).push(c);
      } else {
        roots.push(c);
      }
    });
    return { roots, byParent };
  }

  function renderActions(comment, likesEnabled) {
    const likeCount =
      comment.like_count > 0
        ? `<span class="bd-yt-like-count">${comment.like_count}</span>`
        : "";
    const likeBtn = likesEnabled
      ? `<button type="button" class="bd-yt-action-btn bd-yt-like-btn${comment.liked ? " is-liked" : ""}" data-comment-id="${escapeHtml(comment.id)}" aria-pressed="${comment.liked ? "true" : "false"}" aria-label="${comment.liked ? "Unlike" : "Like"}">
          <i class="ri-thumb-up-${comment.liked ? "fill" : "line"}" aria-hidden="true"></i>
          ${likeCount}
        </button>
        <button type="button" class="bd-yt-action-btn bd-yt-dislike-btn" aria-label="Dislike">
          <i class="ri-thumb-down-line" aria-hidden="true"></i>
        </button>`
      : "";
    return `
      <div class="bd-yt-comment__actions">
        ${likeBtn}
        <button type="button" class="bd-yt-reply-btn bd-comment-reply-btn" data-parent-id="${escapeHtml(comment.id)}" data-preview="${escapeHtml(comment.body.slice(0, 160))}">
          Reply
        </button>
      </div>`;
  }

  function renderCommentAvatar(comment, isReply) {
    const id = escapeHtml(comment.id);
    const label = `Comment by ${escapeHtml(comment.author_name)}`;
    const sizeClass = isReply ? "bd-yt-avatar--sm" : "";
    return `
      <a href="#bd-comment-${id}" class="bd-yt-avatar-link" aria-label="${label}">
        <span class="bd-yt-avatar ${sizeClass}" aria-hidden="true">${escapeHtml(initials(comment.author_name))}</span>
      </a>`;
  }

  function renderReplyBlock(
    parentComment,
    children,
    byParent,
    depth,
    likesEnabled,
    expandedThreads,
  ) {
    if (!children.length) return "";
    const parentId = parentComment.id;
    const isExpanded = expandedThreads.has(parentId);
    const count = children.length;

    if (!isExpanded) {
      const label =
        count === 1 ? "Show 1 reply" : `Show ${count} replies`;
      return `
        <div class="bd-yt-replies-toggle-wrap">
          <button type="button" class="bd-yt-thread-toggle bd-yt-show-replies" data-thread-root="${escapeHtml(parentId)}">
            <i class="ri-arrow-down-s-line" aria-hidden="true"></i>
            <span>${label}</span>
          </button>
        </div>`;
    }

    const nested = children
      .map((c) =>
        renderCommentNode(
          c,
          byParent,
          depth + 1,
          likesEnabled,
          expandedThreads,
          parentComment.author_name,
        ),
      )
      .join("");

    return `
      <div class="bd-yt-replies" role="group" aria-label="Replies">
        ${nested}
        <button type="button" class="bd-yt-thread-toggle bd-yt-hide-replies" data-thread-root="${escapeHtml(parentId)}">
          <i class="ri-arrow-up-s-line" aria-hidden="true"></i>
          <span>Hide replies</span>
        </button>
      </div>`;
  }

  function renderCommentNode(
    comment,
    byParent,
    depth,
    likesEnabled,
    expandedThreads,
    parentAuthor = null,
  ) {
    const author = escapeHtml(comment.author_name);
    const mentionPrefix =
      depth > 0 && parentAuthor
        ? `<span class="bd-yt-mention">@${escapeHtml(mentionSlug(parentAuthor))}</span> `
        : "";
    const body = `${mentionPrefix}${formatCommentBody(comment.body)}`;
    const when = formatDate(comment.created_at);
    const isReply = depth > 0;
    const children = byParent.get(comment.id) || [];
    const id = escapeHtml(comment.id);
    const replyBlock = renderReplyBlock(
      comment,
      children,
      byParent,
      depth,
      likesEnabled,
      expandedThreads,
    );

    const tag = isReply ? "div" : "li";
    const rootClass = isReply
      ? "bd-yt-comment bd-yt-comment--reply"
      : "bd-yt-thread";

    const inner = `
      <article class="${isReply ? "bd-yt-comment bd-yt-comment--reply" : "bd-yt-comment"}" id="bd-comment-${id}" data-comment-id="${id}" data-depth="${depth}">
        <div class="bd-yt-comment__row">
          ${renderCommentAvatar(comment, isReply)}
          <div class="bd-yt-comment__main">
            <div class="bd-yt-comment__header">
              <span class="bd-yt-author">${author}</span>
              ${when ? `<time class="bd-yt-time" datetime="${escapeHtml(comment.created_at)}">${escapeHtml(when)}</time>` : ""}
            </div>
            <div class="bd-yt-comment__text">${body}</div>
            ${renderActions(comment, likesEnabled)}
          </div>
          <button type="button" class="bd-yt-menu-btn" data-comment-menu="${id}" aria-label="Comment actions" aria-haspopup="menu">
            <i class="ri-more-vertical-fill" aria-hidden="true"></i>
          </button>
        </div>
        ${replyBlock}
      </article>`;

    if (isReply) {
      return `<div class="bd-yt-reply-item">${inner}</div>`;
    }
    return `<${tag} class="${rootClass}">${inner}</${tag}>`;
  }

  window.Portfolio.BLOG_ENGAGEMENT = {
    _activeSlug: "",
    init: function (post) {
      const section = document.getElementById("bdEngagement");
      if (!section || !post?.id) return;

      const slug = post.id;
      if (window.Portfolio.BLOG_ENGAGEMENT._activeSlug === slug) return;
      window.Portfolio.BLOG_ENGAGEMENT._activeSlug = slug;

      const visitorKey = getVisitorKey();
      const likeBtn = document.getElementById("bdLikeBtn");
      const likeCountEl = document.getElementById("bdLikeCount");
      const listEl = document.getElementById("bdCommentList");
      const emptyEl = document.getElementById("bdCommentsEmpty");
      const countLabel = document.getElementById("bdCommentCountLabel");
      const form = document.getElementById("bdCommentForm");
      const errorEl = document.getElementById("bdCommentError");
      const submitBtn = document.getElementById("bdCommentSubmit");
      const toastEl = document.getElementById("toast");

      const replyModal = document.getElementById("bdReplyModal");
      const replyForm = document.getElementById("bdReplyModalForm");
      const replyParentId = document.getElementById("bdReplyParentId");
      const replyQuote = document.getElementById("bdReplyModalQuote");
      const replyError = document.getElementById("bdReplyModalError");
      const replySubmit = document.getElementById("bdReplyModalSubmit");

      let likeSyncing = false;
      let likesEnabled = true;
      let cachedComments = [];
      let likeState = { liked: false, count: 0 };
      const commentLikeSync = new Set();

      function showToast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.add("show");
        setTimeout(() => toastEl.classList.remove("show"), 3000);
      }

      function setError(el, msg) {
        if (!el) return;
        if (!msg) {
          el.hidden = true;
          el.textContent = "";
          return;
        }
        el.hidden = false;
        el.textContent = msg;
      }

      function commentCountLabel(n) {
        return n === 1 ? "1 COMMENT" : `${n} COMMENTS`;
      }

      const expandedThreads = new Set();

      function findComment(id) {
        return cachedComments.find((c) => c.id === id);
      }

      function renderComments() {
        const total = cachedComments.length;
        if (countLabel) countLabel.textContent = commentCountLabel(total);
        const { roots, byParent } = buildCommentTree(cachedComments);
        if (listEl) {
          listEl.innerHTML = roots
            .map((c) =>
              renderCommentNode(c, byParent, 0, likesEnabled, expandedThreads),
            )
            .join("");
        }
        if (emptyEl) emptyEl.hidden = total > 0;
      }

      function applyLikeState(liked, likeCount) {
        likeState = { liked: Boolean(liked), count: likeCount ?? 0 };
        if (likeCountEl) likeCountEl.textContent = String(likeState.count);
        if (likeBtn) {
          likeBtn.classList.toggle("is-liked", likeState.liked);
          likeBtn.setAttribute("aria-pressed", likeState.liked ? "true" : "false");
          likeBtn.setAttribute(
            "aria-label",
            likeState.liked ? "Unlike this article" : "Like this article",
          );
        }
      }

      function openReplyModal(parentId, preview) {
        if (!replyModal || !parentId) return;
        if (replyParentId) replyParentId.value = parentId;
        if (replyQuote) {
          const text = String(preview || "").trim();
          replyQuote.textContent = text
            ? `Replying to: “${text}${text.length >= 160 ? "…" : ""}”`
            : "";
          replyQuote.hidden = !text;
        }
        setError(replyError, "");
        replyModal.hidden = false;
        document.body.classList.add("bd-reply-modal-open");
        document.getElementById("bdReplyMessage")?.focus();
      }

      function closeReplyModal() {
        if (!replyModal) return;
        replyModal.hidden = true;
        document.body.classList.remove("bd-reply-modal-open");
        replyForm?.reset();
        if (replyParentId) replyParentId.value = "";
        setError(replyError, "");
      }

      function upsertComment(raw) {
        const normalized = normalizeComment(raw);
        const idx = cachedComments.findIndex((c) => c.id === normalized.id);
        if (idx >= 0) cachedComments[idx] = normalized;
        else cachedComments.push(normalized);
        renderComments();
      }

      async function postComment(payload) {
        const res = await fetch(
          `/api/blog/${encodeURIComponent(slug)}/comments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        const data = await res.json().catch(() => ({}));
        return { res, data };
      }

      async function loadEngagement() {
        try {
          const res = await fetch(
            `/api/blog/${encodeURIComponent(slug)}/engagement?visitor=${encodeURIComponent(visitorKey)}`,
            { headers: { "x-blog-visitor": visitorKey } },
          );
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            console.warn("[blog engagement] load failed:", data.error);
            return;
          }
          likesEnabled = data.likesEnabled !== false;
          if (likeBtn) likeBtn.hidden = !likesEnabled;
          if (form) form.hidden = data.commentsEnabled === false;
          const commentsWrap = section.querySelector(".bd-comments-wrap");
          if (commentsWrap) commentsWrap.hidden = data.commentsEnabled === false;
          applyLikeState(data.liked, data.likeCount);
          cachedComments = (Array.isArray(data.comments) ? data.comments : []).map(
            normalizeComment,
          );
          renderComments();
          window.Portfolio?.ICONS?.hydrateAll?.(
            document.getElementById("bdArticleBody") || document,
          );
        } catch (err) {
          console.warn("[blog engagement] load error:", err);
        }
      }

      function toggleCommentLike(commentId, btn) {
        if (!likesEnabled || commentLikeSync.has(commentId)) return;
        const comment = findComment(commentId);
        if (!comment) return;

        const prev = { liked: comment.liked, count: comment.like_count };
        const next = {
          liked: !prev.liked,
          count: prev.liked ? Math.max(0, prev.count - 1) : prev.count + 1,
        };
        comment.liked = next.liked;
        comment.like_count = next.count;
        renderComments();
        commentLikeSync.add(commentId);

        fetch(
          `/api/blog/${encodeURIComponent(slug)}/comments/${encodeURIComponent(commentId)}/like`,
          {
            method: "POST",
            headers: apiHeaders(visitorKey),
            body: JSON.stringify({ visitor: visitorKey }),
          },
        )
          .then((res) => res.json().then((data) => ({ res, data })))
          .then(({ res, data }) => {
            if (!res.ok) {
              comment.liked = prev.liked;
              comment.like_count = prev.count;
              renderComments();
              showToast(data.error || "Could not update like.");
              return;
            }
            comment.liked = data.liked;
            comment.like_count = data.likeCount;
            renderComments();
          })
          .catch(() => {
            comment.liked = prev.liked;
            comment.like_count = prev.count;
            renderComments();
            showToast("Network error. Try again.");
          })
          .finally(() => commentLikeSync.delete(commentId));
      }

      function closeCommentMenus() {
        document.querySelectorAll(".bd-yt-menu-popover").forEach((el) => el.remove());
      }

      function openCommentMenu(anchor, commentId) {
        closeCommentMenus();
        const pop = document.createElement("div");
        pop.className = "bd-yt-menu-popover";
        pop.setAttribute("role", "menu");
        pop.innerHTML = `
          <button type="button" class="bd-yt-menu-item" data-menu-action="copy-link" role="menuitem">Copy link</button>
          <button type="button" class="bd-yt-menu-item" data-menu-action="copy-text" role="menuitem">Copy comment</button>`;
        document.body.appendChild(pop);
        const rect = anchor.getBoundingClientRect();
        pop.style.top = `${rect.bottom + 4}px`;
        pop.style.left = `${Math.max(8, rect.right - 180)}px`;
        pop.addEventListener("click", (ev) => {
          const btn = ev.target.closest("[data-menu-action]");
          if (!btn) return;
          const action = btn.getAttribute("data-menu-action");
          const comment = findComment(commentId);
          if (action === "copy-link") {
            const url = `${location.origin}${location.pathname}${location.search}#bd-comment-${commentId}`;
            navigator.clipboard?.writeText(url).then(
              () => showToast("Link copied"),
              () => showToast("Could not copy link"),
            );
          } else if (action === "copy-text" && comment) {
            navigator.clipboard?.writeText(comment.body).then(
              () => showToast("Comment copied"),
              () => showToast("Could not copy"),
            );
          }
          closeCommentMenus();
        });
        setTimeout(() => {
          document.addEventListener(
            "click",
            () => closeCommentMenus(),
            { once: true },
          );
        }, 0);
      }

      if (listEl) {
        listEl.addEventListener("click", (e) => {
          const showBtn = e.target.closest(".bd-yt-show-replies");
          if (showBtn && listEl.contains(showBtn)) {
            const rootId = showBtn.getAttribute("data-thread-root");
            if (rootId) expandedThreads.add(rootId);
            renderComments();
            return;
          }
          const hideBtn = e.target.closest(".bd-yt-hide-replies");
          if (hideBtn && listEl.contains(hideBtn)) {
            const rootId = hideBtn.getAttribute("data-thread-root");
            if (rootId) expandedThreads.delete(rootId);
            renderComments();
            return;
          }
          const menuBtn = e.target.closest(".bd-yt-menu-btn");
          if (menuBtn && listEl.contains(menuBtn)) {
            e.stopPropagation();
            openCommentMenu(
              menuBtn,
              menuBtn.getAttribute("data-comment-menu"),
            );
            return;
          }
          const replyBtn = e.target.closest(".bd-comment-reply-btn");
          if (replyBtn && listEl.contains(replyBtn)) {
            openReplyModal(
              replyBtn.getAttribute("data-parent-id"),
              replyBtn.getAttribute("data-preview"),
            );
            return;
          }
          const likeCommentBtn = e.target.closest(".bd-yt-like-btn");
          if (likeCommentBtn && listEl.contains(likeCommentBtn)) {
            toggleCommentLike(
              likeCommentBtn.getAttribute("data-comment-id"),
              likeCommentBtn,
            );
            return;
          }
          const dislikeBtn = e.target.closest(".bd-yt-dislike-btn");
          if (dislikeBtn && listEl.contains(dislikeBtn)) {
            dislikeBtn.classList.toggle("is-disliked");
            const icon = dislikeBtn.querySelector("i");
            if (icon) {
              icon.classList.toggle("ri-thumb-down-line", !dislikeBtn.classList.contains("is-disliked"));
              icon.classList.toggle("ri-thumb-down-fill", dislikeBtn.classList.contains("is-disliked"));
            }
          }
        });
      }

      replyModal?.querySelectorAll("[data-bd-reply-close]").forEach((el) => {
        el.addEventListener("click", closeReplyModal);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && replyModal && !replyModal.hidden) {
          closeReplyModal();
        }
      });

      if (replyForm) {
        replyForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          setError(replyError, "");
          const parentId = replyParentId?.value?.trim();
          const name = (document.getElementById("bdReplyName")?.value || "").trim();
          const email = (document.getElementById("bdReplyEmail")?.value || "").trim();
          const message = (document.getElementById("bdReplyMessage")?.value || "").trim();

          if (!parentId) {
            setError(replyError, "Missing reply target.");
            return;
          }
          if (name.length < 2) {
            setError(replyError, "Please enter your name.");
            return;
          }
          if (message.length < 3) {
            setError(replyError, "Reply should be at least 3 characters.");
            return;
          }

          if (replySubmit) replySubmit.disabled = true;
          const prevLabel = replySubmit?.textContent;
          if (replySubmit) replySubmit.textContent = "Posting…";

          try {
            const { res, data } = await postComment({
              name,
              email,
              message,
              parentId,
            });
            if (!res.ok) {
              setError(replyError, data.error || "Could not post reply.");
              return;
            }
            closeReplyModal();
            if (data.pending) {
              showToast(
                data.message || "Thanks! Your reply is awaiting moderation.",
              );
            } else if (data.comment) {
              upsertComment({
                id: data.comment.id,
                author_name: data.comment.author_name,
                body: data.comment.body,
                created_at: data.comment.created_at,
                parent_id: data.comment.parent_id,
                like_count: 0,
                liked: false,
              });
              showToast("Reply posted!");
            } else {
              await loadEngagement();
            }
          } catch {
            setError(replyError, "Network error. Please try again.");
          } finally {
            if (replySubmit) {
              replySubmit.disabled = false;
              replySubmit.textContent = prevLabel || "Post reply";
            }
          }
        });
      }

      if (likeBtn) {
        likeBtn.addEventListener("click", () => {
          if (likeSyncing) return;
          const prev = { ...likeState };
          applyLikeState(!prev.liked, prev.liked ? Math.max(0, prev.count - 1) : prev.count + 1);
          likeBtn.classList.add("is-syncing");
          likeSyncing = true;
          fetch(`/api/blog/${encodeURIComponent(slug)}/like`, {
            method: "POST",
            headers: apiHeaders(visitorKey),
            body: JSON.stringify({ visitor: visitorKey }),
          })
            .then((res) => res.json().then((data) => ({ res, data })))
            .then(({ res, data }) => {
              if (!res.ok) {
                applyLikeState(prev.liked, prev.count);
                showToast(data.error || "Could not update like.");
                return;
              }
              applyLikeState(data.liked, data.likeCount);
            })
            .catch(() => {
              applyLikeState(prev.liked, prev.count);
              showToast("Network error. Try again.");
            })
            .finally(() => {
              likeSyncing = false;
              likeBtn.classList.remove("is-syncing");
            });
        });
      }

      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          setError(errorEl, "");
          const name = (document.getElementById("bdCommentName")?.value || "").trim();
          const email = (document.getElementById("bdCommentEmail")?.value || "").trim();
          const message = (document.getElementById("bdCommentMessage")?.value || "").trim();

          if (name.length < 2) {
            setError(errorEl, "Please enter your name.");
            return;
          }
          if (message.length < 3) {
            setError(errorEl, "Comment should be at least 3 characters.");
            return;
          }

          if (submitBtn) submitBtn.disabled = true;
          const prevLabel = submitBtn?.textContent;
          if (submitBtn) submitBtn.textContent = "Posting…";

          try {
            const { res, data } = await postComment({ name, email, message });
            if (!res.ok) {
              setError(errorEl, data.error || "Could not post comment.");
              return;
            }
            form.reset();
            if (data.pending) {
              showToast(
                data.message || "Thanks! Your comment is awaiting moderation.",
              );
            } else if (data.comment) {
              upsertComment({
                id: data.comment.id,
                author_name: data.comment.author_name,
                body: data.comment.body,
                created_at: data.comment.created_at,
                parent_id: data.comment.parent_id,
                like_count: 0,
                liked: false,
              });
              showToast("Comment posted!");
            } else {
              await loadEngagement();
            }
          } catch {
            setError(errorEl, "Network error. Please try again.");
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = prevLabel || "Post comment";
            }
          }
        });
      }

      loadEngagement();
    },
  };
})();
