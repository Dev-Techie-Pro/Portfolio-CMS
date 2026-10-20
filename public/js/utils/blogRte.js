import { promptUrl } from "./url-prompt.js";
import { getRteHtml, setRteHtml, updateRteButtonStates } from "./rte.js";
import {
  prettyPrintBlogJson,
  serializeBlogContentForStorage
} from "./blogContentPayload.js";
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function insertBlogImageHtml(body, url, alt = "") {
  if (!body || !url) return;
  body.focus();
  const html = `<figure class="pa-rte-figure"><img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy" /></figure><p><br></p>`;
  document.execCommand("insertHTML", false, html);
}
function syncCodeFromVisual(body, codeEl) {
  if (!codeEl || !body) return;
  codeEl.value = getRteHtml(body);
}
function syncVisualFromCode(body, codeEl) {
  if (!codeEl || !body) return;
  setRteHtml(body, codeEl.value);
}
function getJsonPane(wrap) {
  return wrap.querySelector(".pa-rte-json-pane");
}
function getJsonTextarea(wrap, jsonId) {
  if (jsonId) return document.getElementById(jsonId);
  return wrap.querySelector(".pa-rte-json-editor");
}
function getBlogRteActiveMode(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return "visual";
  if (wrap.classList.contains("pa-rte--json-mode")) return "json";
  if (wrap.classList.contains("pa-rte--code-mode")) return "code";
  return "visual";
}
function setRteEditorMode(wrap, body, codeEl, mode, jsonId, jsonSeedFromHtml) {
  wrap.querySelectorAll(".pa-rte-mode-btn").forEach((btn) => {
    const m = btn.getAttribute("data-rte-mode");
    const active = m === mode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
  const toolbar = wrap.querySelector(".pa-rte-toolbar");
  const jsonPane = getJsonPane(wrap);
  const jsonEl = getJsonTextarea(wrap, jsonId);
  wrap.classList.remove("pa-rte--code-mode", "pa-rte--json-mode");
  if (mode === "json") {
    syncCodeFromVisual(body, codeEl);
    if (jsonEl && !jsonEl.value.trim() && jsonSeedFromHtml) {
      jsonEl.value = prettyPrintBlogJson(jsonSeedFromHtml());
    }
    body.hidden = true;
    if (codeEl) {
      codeEl.hidden = true;
      codeEl.classList.remove("is-active");
    }
    if (jsonPane) jsonPane.hidden = false;
    if (jsonEl) jsonEl.hidden = false;
    toolbar?.setAttribute("hidden", "");
    wrap.classList.add("pa-rte--json-mode");
    jsonEl?.focus();
    return;
  }
  if (jsonPane) jsonPane.hidden = true;
  if (jsonEl) jsonEl.hidden = true;
  if (mode === "code") {
    syncCodeFromVisual(body, codeEl);
    body.hidden = true;
    if (codeEl) {
      codeEl.hidden = false;
      codeEl.classList.add("is-active");
    }
    toolbar?.setAttribute("hidden", "");
    wrap.classList.add("pa-rte--code-mode");
    codeEl?.focus();
    return;
  }
  syncVisualFromCode(body, codeEl);
  if (codeEl) {
    codeEl.hidden = true;
    codeEl.classList.remove("is-active");
  }
  body.hidden = false;
  toolbar?.removeAttribute("hidden");
  body.focus();
}
function handleBlogPaste(e, body) {
  const html = e.clipboardData?.getData("text/html")?.trim();
  const text = e.clipboardData?.getData("text/plain")?.trim();
  e.preventDefault();
  body.focus();
  if (html) {
    document.execCommand("insertHTML", false, html);
  } else if (text) {
    document.execCommand("insertText", false, text);
  }
}
function runRteCommand(body, wrap, btn) {
  body.focus();
  const cmd = btn.dataset.cmd;
  if (!cmd) return;
  if (cmd === "createLink") {
    const sel = window.getSelection();
    const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
    let existing = "";
    if (range) {
      let node = range.commonAncestorContainer;
      if (node?.nodeType === 3) node = node.parentElement;
      const anchor = node?.closest?.("a");
      if (anchor && body.contains(anchor)) {
        existing = anchor.getAttribute("href") || "";
      }
    }
    void promptUrl({
      defaultValue: existing,
      title: existing ? "Edit link" : "Insert link",
      confirmLabel: existing ? "Save link" : "Insert link"
    }).then((url) => {
      if (url === null) return;
      if (!url) {
        document.execCommand("unlink", false, null);
      } else if (range && !range.collapsed) {
        document.execCommand("createLink", false, url);
      } else {
        document.execCommand(
          "insertHTML",
          false,
          `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeAttr(url)}</a>`
        );
      }
      updateRteButtonStates(wrap);
    });
    return;
  }
  if (cmd === "formatBlock") {
    const tag = btn.dataset.value || "p";
    document.execCommand("formatBlock", false, tag);
  } else {
    document.execCommand(cmd, false, null);
  }
  updateRteButtonStates(wrap);
}
function ensureRteFullscreenButton(wrap, body) {
  const toolbar = wrap.querySelector(".pa-rte-toolbar");
  if (!toolbar || toolbar.querySelector(".pa-rte-fullscreen-wrap")) return;
  const group = document.createElement("div");
  group.className = "pa-rte-fullscreen-wrap";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pa-rte-btn pa-rte-fullscreen-btn";
  btn.title = "Full screen";
  btn.setAttribute("aria-label", "Full screen");
  btn.innerHTML = '<i class="ri-fullscreen-line"></i>';
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const active = !wrap.classList.contains("pa-rte--fullscreen");
    wrap.classList.toggle("pa-rte--fullscreen", active);
    document.body.classList.toggle("pa-rte-fullscreen-active", active);
    btn.innerHTML = active ? '<i class="ri-fullscreen-exit-line"></i>' : '<i class="ri-fullscreen-line"></i>';
    if (active) body.focus();
  });
  group.appendChild(btn);
  toolbar.appendChild(group);
}
function setupBlogPostRte(wrapId, bodyId, codeId, options = {}) {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId);
  if (!wrap || !body) return;
  wrap.classList.add("pa-rte--blog-pro");
  ensureRteFullscreenButton(wrap, body);
  wrap.querySelectorAll(".pa-rte-mode-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const mode = btn.getAttribute("data-rte-mode");
      if (mode === "visual" || mode === "code" || mode === "json") {
        setRteEditorMode(wrap, body, codeEl, mode, options.jsonId, options.jsonSeed);
      }
    });
  });
  wrap.querySelectorAll(".pa-rte-btn[data-cmd]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      runRteCommand(body, wrap, btn);
    });
  });
  const imageBtn = wrap.querySelector('[data-rte-action="insertImage"]');
  if (imageBtn && options.onInsertImage) {
    imageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      options.onInsertImage?.();
    });
  }
  body.addEventListener("keyup", () => updateRteButtonStates(wrap));
  body.addEventListener("mouseup", () => updateRteButtonStates(wrap));
  body.addEventListener("input", () => syncCodeFromVisual(body, codeEl));
  body.addEventListener("paste", (e) => handleBlogPaste(e, body));
  if (codeEl) {
    codeEl.addEventListener("input", () => {
      if (!wrap.classList.contains("pa-rte--code-mode")) return;
    });
  }
  setRteEditorMode(wrap, body, codeEl, "visual");
}
function getBlogRteHtml(bodyId, codeId, wrapId) {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId);
  if (wrap?.classList.contains("pa-rte--code-mode") && codeEl) {
    return codeEl.value.trim();
  }
  return getRteHtml(body);
}
function getBlogJsonEditorValue(jsonId) {
  const el = document.getElementById(jsonId);
  return el?.value?.trim() ?? "";
}
function setBlogJsonEditorValue(jsonId, raw) {
  const el = document.getElementById(jsonId);
  if (!el) return;
  el.value = raw ? prettyPrintBlogJson(raw) : "";
}
function setBlogRteHtml(bodyId, codeId, wrapId, html) {
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId);
  const wrap = document.getElementById(wrapId);
  setRteHtml(body, html);
  if (codeEl) codeEl.value = html || "";
  if (wrap && wrap.classList.contains("pa-rte--code-mode") && body && codeEl) {
    syncVisualFromCode(body, codeEl);
  }
}
function blogJsonSeedFromVisual(bodyId, codeId, wrapId, detailTemplate) {
  const html = getBlogRteHtml(bodyId, codeId, wrapId);
  return serializeBlogContentForStorage(html, detailTemplate);
}
export {
  blogJsonSeedFromVisual,
  getBlogJsonEditorValue,
  getBlogRteActiveMode,
  getBlogRteHtml,
  insertBlogImageHtml,
  setBlogJsonEditorValue,
  setBlogRteHtml,
  setupBlogPostRte
};
//# sourceMappingURL=blogRte.js.map
