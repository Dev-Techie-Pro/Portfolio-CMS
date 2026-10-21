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
    const likeBtn = likesEnabled
      ? `<button type="button" class="bd-comment-like-btn${comment.liked ? " is-liked" : ""}" data-comment-id="${escapeHtml(comment.id)}" aria-pressed="${comment.liked ? "true" : "false"}">
          <i class="ri-thumb-up-line" aria-hidden="true"></i>
          <span class="bd-comment-like-count">${comment.like_count}</span>
        </button>`
      : "";
    return `
      <div class="bd-comment-actions">
        ${likeBtn}
        <button type="button" class="bd-comment-reply-btn" data-parent-id="${escapeHtml(comment.id)}" data-preview="${escapeHtml(comment.body.slice(0, 160))}">
          <i class="ri-reply-line" aria-hidden="true"></i> Reply
        </button>
      </div>`;
  }

  function renderCommentNode(comment, byParent, depth, likesEnabled) {
    const name = escapeHtml(comment.author_name);
    const body = escapeHtml(comment.body).replace(/\n/g, "<br />");
    const date = formatDate(comment.created_at);
    const children = byParent.get(comment.id) || [];
    const childHtml = children.length
      ? `<ul class="bd-comment-replies" aria-label="Replies">${children
          .map((c) => renderCommentNode(c, byParent, depth + 1, likesEnabled))
          .join("")}</ul>`
      : "";

    if (depth === 0) {
      return `
      <li class="bd-comment-item" data-comment-id="${escapeHtml(comment.id)}">
        <div class="bd-comment-avatar" aria-hidden="true">${escapeHtml(initials(comment.author_name))}</div>
        <div class="bd-comment-body">
          <div class="bd-comment-meta">
            <span class="bd-comment-author">${name}</span>
            ${date ? `<time class="bd-comment-date" datetime="${escapeHtml(comment.created_at)}">${escapeHtml(date)}</time>` : ""}
          </div>
          <p class="bd-comment-text">${body}</p>
          ${renderActions(comment, likesEnabled)}
          ${childHtml}
        </div>
      </li>`;
    }

    return `
      <li class="bd-comment-reply-item" data-comment-id="${escapeHtml(comment.id)}">
        <span class="bd-comment-reply-marker" aria-hidden="true"></span>
        <div class="bd-comment-reply-body">
          <div class="bd-comment-meta">
            <span class="bd-comment-author">${name}</span>
            ${date ? `<time class="bd-comment-date" datetime="${escapeHtml(comment.created_at)}">${escapeHtml(date)}</time>` : ""}
          </div>
          <p class="bd-comment-text">${body}</p>
          ${renderActions(comment, likesEnabled)}
          ${childHtml}
        </div>
      </li>`;
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
        return n === 1 ? "1 comment" : `${n} comments`;
      }

      function findComment(id) {
        return cachedComments.find((c) => c.id === id);
      }

      function renderComments() {
        const total = cachedComments.length;
        if (countLabel) countLabel.textContent = commentCountLabel(total);
        const { roots, byParent } = buildCommentTree(cachedComments);
        if (listEl) {
          listEl.innerHTML = roots
            .map((c) => renderCommentNode(c, byParent, 0, likesEnabled))
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

      if (listEl) {
        listEl.addEventListener("click", (e) => {
          const replyBtn = e.target.closest(".bd-comment-reply-btn");
          if (replyBtn && listEl.contains(replyBtn)) {
            openReplyModal(
              replyBtn.getAttribute("data-parent-id"),
              replyBtn.getAttribute("data-preview"),
            );
            return;
          }
          const likeCommentBtn = e.target.closest(".bd-comment-like-btn");
          if (likeCommentBtn && listEl.contains(likeCommentBtn)) {
            toggleCommentLike(
              likeCommentBtn.getAttribute("data-comment-id"),
              likeCommentBtn,
            );
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
