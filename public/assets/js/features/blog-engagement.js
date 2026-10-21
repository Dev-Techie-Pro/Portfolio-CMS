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

  function renderReplyItem(comment) {
    const name = escapeHtml(comment.author_name);
    const body = escapeHtml(comment.body).replace(/\n/g, "<br />");
    const date = formatDate(comment.created_at);
    return `
      <li class="bd-comment-reply-item" data-comment-id="${escapeHtml(comment.id)}">
        <span class="bd-comment-reply-marker" aria-hidden="true"></span>
        <div class="bd-comment-reply-body">
          <div class="bd-comment-meta">
            <span class="bd-comment-author">${name}</span>
            ${date ? `<time class="bd-comment-date" datetime="${escapeHtml(comment.created_at)}">${escapeHtml(date)}</time>` : ""}
          </div>
          <p class="bd-comment-text">${body}</p>
        </div>
      </li>`;
  }

  function renderReplyForm(parentId) {
    return `
      <form class="bd-comment-reply-form" data-parent-id="${escapeHtml(parentId)}" novalidate>
        <label class="bd-comment-label" for="bdReplyMessage-${escapeHtml(parentId)}">Your reply</label>
        <textarea
          id="bdReplyMessage-${escapeHtml(parentId)}"
          class="bd-comment-textarea bd-comment-reply-textarea"
          rows="3"
          placeholder="Write a reply…"
          required
          maxlength="4000"
        ></textarea>
        <p class="bd-comment-error bd-comment-reply-error" role="alert" hidden></p>
        <div class="bd-comment-reply-actions">
          <button type="button" class="bd-comment-reply-cancel">Cancel</button>
          <button type="submit" class="faq-cta-btn bd-comment-reply-submit">Post reply</button>
        </div>
      </form>`;
  }

  function renderCommentItem(comment, replies) {
    const name = escapeHtml(comment.author_name);
    const body = escapeHtml(comment.body).replace(/\n/g, "<br />");
    const date = formatDate(comment.created_at);
    const replyList =
      replies && replies.length
        ? `<ul class="bd-comment-replies" aria-label="Replies">${replies.map(renderReplyItem).join("")}</ul>`
        : "";
    return `
      <li class="bd-comment-item" data-comment-id="${escapeHtml(comment.id)}">
        <div class="bd-comment-avatar" aria-hidden="true">${escapeHtml(initials(comment.author_name))}</div>
        <div class="bd-comment-body">
          <div class="bd-comment-meta">
            <span class="bd-comment-author">${name}</span>
            ${date ? `<time class="bd-comment-date" datetime="${escapeHtml(comment.created_at)}">${escapeHtml(date)}</time>` : ""}
          </div>
          <p class="bd-comment-text">${body}</p>
          <button type="button" class="bd-comment-reply-btn" data-parent-id="${escapeHtml(comment.id)}">
            <i class="ri-reply-line" aria-hidden="true"></i> Reply
          </button>
          <div class="bd-comment-reply-slot" data-parent-id="${escapeHtml(comment.id)}" hidden></div>
          ${replyList}
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
      let likeSyncing = false;
      let cachedComments = [];
      let likeState = { liked: false, count: 0 };

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

      function renderComments(comments) {
        cachedComments = comments.map(normalizeComment);
        const total = cachedComments.length;
        if (countLabel) countLabel.textContent = commentCountLabel(total);
        const { roots, byParent } = buildCommentTree(cachedComments);
        if (listEl) {
          listEl.innerHTML = roots
            .map((c) => renderCommentItem(c, byParent.get(c.id) || []))
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

      function closeAllReplySlots() {
        section.querySelectorAll(".bd-comment-reply-slot").forEach((slot) => {
          slot.hidden = true;
          slot.innerHTML = "";
        });
      }

      function openReplySlot(parentId) {
        if (!parentId) return;
        closeAllReplySlots();
        const slot = section.querySelector(
          `.bd-comment-reply-slot[data-parent-id="${parentId}"]`,
        );
        if (!slot) return;
        slot.hidden = false;
        slot.innerHTML = renderReplyForm(parentId);
        const replyForm = slot.querySelector("form");
        const cancelBtn = slot.querySelector(".bd-comment-reply-cancel");
        const replyError = slot.querySelector(".bd-comment-reply-error");
        const replySubmit = slot.querySelector(".bd-comment-reply-submit");
        const replyMessage = slot.querySelector("textarea");

        cancelBtn?.addEventListener("click", () => {
          slot.hidden = true;
          slot.innerHTML = "";
        });

        replyForm?.addEventListener("submit", async (e) => {
              e.preventDefault();
              setError(replyError, "");
              const nameInput = document.getElementById("bdCommentName");
              const emailInput = document.getElementById("bdCommentEmail");
              const name = (nameInput?.value || "").trim();
              const email = (emailInput?.value || "").trim();
              const message = (replyMessage?.value || "").trim();

              if (name.length < 2) {
                setError(replyError, "Enter your name in the form above first.");
                nameInput?.focus();
                return;
              }
              if (message.length < 3) {
                setError(replyError, "Reply should be at least 3 characters.");
                replyMessage?.focus();
                return;
              }

              if (replySubmit) replySubmit.disabled = true;
              const prev = replySubmit?.textContent;
              if (replySubmit) replySubmit.textContent = "Posting…";

              try {
                const res = await fetch(
                  `/api/blog/${encodeURIComponent(slug)}/comments`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name,
                      email,
                      message,
                      parentId,
                    }),
                  },
                );
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                  setError(replyError, data.error || "Could not post reply.");
                  return;
                }
                slot.hidden = true;
                slot.innerHTML = "";
                if (data.pending) {
                  showToast(
                    data.message ||
                      "Thanks! Your reply is awaiting moderation.",
                  );
                } else if (data.comment) {
                  const normalized = normalizeComment({
                    id: data.comment.id,
                    author_name: data.comment.author_name,
                    body: data.comment.body,
                    created_at: data.comment.created_at,
                    parent_id: data.comment.parent_id,
                  });
                  cachedComments.push(normalized);
                  renderComments(cachedComments);
                  showToast("Reply posted!");
                } else {
                  await loadEngagement();
                }
              } catch {
                setError(replyError, "Network error. Please try again.");
              } finally {
                if (replySubmit) {
                  replySubmit.disabled = false;
                  replySubmit.textContent = prev || "Post reply";
                }
              }
            });
      }

      if (listEl) {
        listEl.addEventListener("click", (e) => {
          const btn = e.target.closest(".bd-comment-reply-btn");
          if (!btn || !listEl.contains(btn)) return;
          openReplySlot(btn.getAttribute("data-parent-id"));
        });
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
          if (likeBtn) likeBtn.hidden = data.likesEnabled === false;
          if (form) form.hidden = data.commentsEnabled === false;
          const commentsWrap = section.querySelector(".bd-comments-wrap");
          if (commentsWrap) commentsWrap.hidden = data.commentsEnabled === false;
          applyLikeState(data.liked, data.likeCount);
          renderComments(Array.isArray(data.comments) ? data.comments : []);
          window.Portfolio?.ICONS?.hydrateAll?.(
            document.getElementById("bdArticleBody") || document,
          );
        } catch (err) {
          console.warn("[blog engagement] load error:", err);
        }
      }

      if (likeBtn) {
        likeBtn.addEventListener("click", () => {
          if (likeSyncing) return;
          const prev = { ...likeState };
          const nextLiked = !prev.liked;
          const nextCount = nextLiked
            ? prev.count + 1
            : Math.max(0, prev.count - 1);
          applyLikeState(nextLiked, nextCount);
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
          const nameInput = document.getElementById("bdCommentName");
          const emailInput = document.getElementById("bdCommentEmail");
          const messageInput = document.getElementById("bdCommentMessage");
          const name = (nameInput?.value || "").trim();
          const email = (emailInput?.value || "").trim();
          const message = (messageInput?.value || "").trim();

          if (name.length < 2) {
            setError(errorEl, "Please enter your name.");
            nameInput?.focus();
            return;
          }
          if (message.length < 3) {
            setError(errorEl, "Comment should be at least 3 characters.");
            messageInput?.focus();
            return;
          }

          if (submitBtn) submitBtn.disabled = true;
          const prevLabel = submitBtn?.textContent;
          if (submitBtn) submitBtn.textContent = "Posting…";

          try {
            const res = await fetch(
              `/api/blog/${encodeURIComponent(slug)}/comments`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
              },
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
              setError(errorEl, data.error || "Could not post comment.");
              return;
            }
            form.reset();
            if (data.pending) {
              showToast(
                data.message ||
                  "Thanks! Your comment is awaiting moderation.",
              );
            } else if (data.comment) {
              cachedComments.push(
                normalizeComment({
                  id: data.comment.id,
                  author_name: data.comment.author_name,
                  body: data.comment.body,
                  created_at: data.comment.created_at,
                  parent_id: data.comment.parent_id,
                }),
              );
              renderComments(cachedComments);
              showToast("Comment posted!");
            } else {
              showToast("Comment posted!");
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
