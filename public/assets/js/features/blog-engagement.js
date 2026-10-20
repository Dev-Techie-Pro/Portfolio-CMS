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

  function renderCommentItem(comment) {
    const name = escapeHtml(comment.author_name);
    const body = escapeHtml(comment.body).replace(/\n/g, "<br />");
    const date = formatDate(comment.created_at);
    return `
      <li class="bd-comment-item">
        <div class="bd-comment-avatar" aria-hidden="true">${escapeHtml(initials(comment.author_name))}</div>
        <div class="bd-comment-body">
          <div class="bd-comment-meta">
            <span class="bd-comment-author">${name}</span>
            ${date ? `<time class="bd-comment-date" datetime="${escapeHtml(comment.created_at)}">${escapeHtml(date)}</time>` : ""}
          </div>
          <p class="bd-comment-text">${body}</p>
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
      let likeBusy = false;
      let cachedComments = [];

      function showToast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.add("show");
        setTimeout(() => toastEl.classList.remove("show"), 3000);
      }

      function setError(msg) {
        if (!errorEl) return;
        if (!msg) {
          errorEl.hidden = true;
          errorEl.textContent = "";
          return;
        }
        errorEl.hidden = false;
        errorEl.textContent = msg;
      }

      function renderComments(comments) {
        cachedComments = comments;
        if (countLabel) {
          countLabel.textContent =
            comments.length === 1
              ? "1 comment"
              : `${comments.length} comments`;
        }
        if (listEl) {
          listEl.innerHTML = comments.map(renderCommentItem).join("");
        }
        if (emptyEl) {
          emptyEl.hidden = comments.length > 0;
        }
      }

      function applyLikeState(liked, likeCount) {
        if (likeCountEl) likeCountEl.textContent = String(likeCount ?? 0);
        if (likeBtn) {
          likeBtn.classList.toggle("is-liked", Boolean(liked));
          likeBtn.setAttribute("aria-pressed", liked ? "true" : "false");
          likeBtn.setAttribute(
            "aria-label",
            liked ? "Unlike this article" : "Like this article",
          );
        }
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
          if (likeBtn) {
            likeBtn.hidden = data.likesEnabled === false;
          }
          if (form) {
            form.hidden = data.commentsEnabled === false;
          }
          const commentsWrap = section.querySelector(".bd-comments-wrap");
          if (commentsWrap) {
            commentsWrap.hidden = data.commentsEnabled === false;
          }
          applyLikeState(data.liked, data.likeCount);
          renderComments(Array.isArray(data.comments) ? data.comments : []);
        } catch (err) {
          console.warn("[blog engagement] load error:", err);
        }
      }

      if (likeBtn) {
        likeBtn.addEventListener("click", async () => {
          if (likeBusy) return;
          likeBusy = true;
          likeBtn.disabled = true;
          try {
            const res = await fetch(
              `/api/blog/${encodeURIComponent(slug)}/like`,
              {
                method: "POST",
                headers: apiHeaders(visitorKey),
                body: JSON.stringify({ visitor: visitorKey }),
              },
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
              showToast(data.error || "Could not update like.");
              return;
            }
            applyLikeState(data.liked, data.likeCount);
            renderComments(cachedComments);
          } catch {
            showToast("Network error. Try again.");
          } finally {
            likeBusy = false;
            likeBtn.disabled = false;
          }
        });
      }

      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          setError("");
          const nameInput = document.getElementById("bdCommentName");
          const emailInput = document.getElementById("bdCommentEmail");
          const messageInput = document.getElementById("bdCommentMessage");
          const name = (nameInput?.value || "").trim();
          const email = (emailInput?.value || "").trim();
          const message = (messageInput?.value || "").trim();

          if (name.length < 2) {
            setError("Please enter your name.");
            nameInput?.focus();
            return;
          }
          if (message.length < 3) {
            setError("Comment should be at least 3 characters.");
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
              setError(data.error || "Could not post comment.");
              return;
            }
            form.reset();
            if (data.pending) {
              showToast(
                data.message ||
                  "Thanks! Your comment is awaiting moderation.",
              );
            } else {
              showToast("Comment posted!");
              await loadEngagement();
            }
          } catch {
            setError("Network error. Please try again.");
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
