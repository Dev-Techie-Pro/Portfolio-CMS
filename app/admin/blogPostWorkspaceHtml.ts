// @ts-nocheck
/** Inline blog post editor — injected into the blog posts list page. */
export const BLOG_POST_WORKSPACE_HTML = `
<div class="pa-blog-workspace" id="paBlogWorkspace" aria-hidden="true">
  <header class="pa-blog-ws-head">
    <div class="pa-blog-ws-head-left">
      <button type="button" class="pa-btn pa-btn-cancel pa-btn-icon" id="paBlogWsBackBtn" title="Back to posts" aria-label="Back to posts"><i class="ri-arrow-left-line"></i></button>
      <div class="pa-blog-ws-head-titles">
        <h2 class="pa-blog-ws-title" id="paBlogWsHeadTitle"><i class="ri-article-line" aria-hidden="true"></i> <span id="paBlogWsHeadTitleText">Edit Post</span></h2>
        <p class="pa-blog-ws-subtitle" id="paBlogWsHeadSubtitle">Update content and publishing settings</p>
      </div>
    </div>
    <div class="pa-blog-ws-head-actions">
      <div class="pa-view-toggle pa-blog-ws-mode-toggle" role="group" aria-label="Editor mode" id="paBlogWsModeToggle">
        <button type="button" class="pa-view-btn active" id="paBlogWsEditBtn" data-ws-mode="edit" title="Edit post"><i class="ri-edit-line"></i> Edit</button>
        <button type="button" class="pa-view-btn" id="paBlogWsPreviewBtn" data-ws-mode="preview" title="Preview"><i class="ri-eye-line"></i> Preview</button>
      </div>
      <button type="button" class="pa-btn pa-btn-cancel" id="paBlogWsDeleteBtn" hidden><i class="ri-delete-bin-line"></i> Delete</button>
      <button type="button" class="pa-btn pa-btn-primary" id="paBlogWsSaveBtn">
        <span class="pa-spinner"></span>
        <span class="pa-btn-label"><i class="ri-save-line"></i> Save changes</span>
      </button>
    </div>
  </header>

  <div class="pa-blog-ws-layout">
    <div class="pa-blog-ws-main">
      <div class="pa-form-group pa-blog-ws-field">
        <label class="pa-form-label" for="blogWsTitle">Post Title <span class="pa-form-required">*</span></label>
        <div class="pa-blog-ws-input-wrap">
          <input class="pa-form-input" type="text" id="blogWsTitle" maxlength="100" autocomplete="off" placeholder="Enter post title" />
          <span class="pa-blog-ws-char-count" id="blogWsTitleCount">0/100</span>
        </div>
        <div class="pa-form-error-msg" id="blogWsTitleError"><i class="ri-error-warning-line"></i> Post title is required</div>
      </div>

      <div class="pa-form-group pa-blog-ws-field pa-blog-ws-content-field">
        <div class="pa-blog-ws-content-label-row">
          <label class="pa-form-label" for="blogWsContent">Content <span class="pa-form-required">*</span></label>
        </div>
        <div class="pa-blog-ws-preview-pane" id="paBlogWsPreviewPane" hidden>
          <p class="pa-blog-ws-preview-layout-label">Detail layout: <strong id="paBlogWsPreviewLayoutLabel">Auto</strong></p>
          <div class="pa-blog-ws-detail-preview-shell blog-details-page" id="paBlogWsDetailPreviewShell">
            <div class="pa-blog-ws-detail-preview-layout">
              <span class="pa-blog-ws-detail-preview-side pa-blog-ws-detail-preview-side--left"></span>
              <div class="pa-blog-ws-preview-inner pa-rte-body" id="paBlogWsPreviewContent"></div>
              <span class="pa-blog-ws-detail-preview-side pa-blog-ws-detail-preview-side--right"></span>
            </div>
          </div>
        </div>
        <div class="pa-blog-ws-editor-pane" id="paBlogWsEditorPane">
          <div class="pa-rte pa-blog-ws-rte pa-rte--blog-pro" id="blogWsRteWrap">
            <div class="pa-rte-mode-bar" role="tablist" aria-label="Editor mode">
              <button type="button" class="pa-rte-mode-btn active" data-rte-mode="editor" role="tab" aria-selected="true">Editor</button>
              <button type="button" class="pa-rte-mode-btn" data-rte-mode="code" role="tab" aria-selected="false">Code</button>
              <button type="button" class="pa-rte-mode-btn" data-rte-mode="preview" role="tab" aria-selected="false">Preview</button>
            </div>
            <div class="pa-rte-toolbar pa-rte-toolbar--blog">
              <button class="pa-rte-btn" type="button" data-cmd="undo" title="Undo (Ctrl+Z)"><i class="ri-arrow-go-back-line"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="redo" title="Redo (Ctrl+Y)"><i class="ri-arrow-go-forward-line"></i></button>
              <span class="pa-rte-divider"></span>
              <button class="pa-rte-btn pa-rte-btn--text" type="button" data-cmd="formatBlock" data-value="p" title="Paragraph">P</button>
              <button class="pa-rte-btn pa-rte-btn--text" type="button" data-cmd="formatBlock" data-value="h2" title="Heading 2">H2</button>
              <button class="pa-rte-btn pa-rte-btn--text" type="button" data-cmd="formatBlock" data-value="h3" title="Heading 3">H3</button>
              <button class="pa-rte-btn pa-rte-btn--text" type="button" data-cmd="formatBlock" data-value="h4" title="Heading 4">H4</button>
              <span class="pa-rte-divider"></span>
              <button class="pa-rte-btn" type="button" data-cmd="bold" title="Bold"><b>B</b></button>
              <button class="pa-rte-btn" type="button" data-cmd="italic" title="Italic"><i class="italic">I</i></button>
              <button class="pa-rte-btn" type="button" data-cmd="underline" title="Underline"><u>U</u></button>
              <button class="pa-rte-btn" type="button" data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button>
              <button class="pa-rte-btn" type="button" data-cmd="removeFormat" title="Clear formatting"><i class="ri-format-clear"></i></button>
              <span class="pa-rte-divider"></span>
              <button class="pa-rte-btn" type="button" data-cmd="justifyLeft" title="Align left"><i class="ri-align-left"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="justifyCenter" title="Align center"><i class="ri-align-center"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="justifyRight" title="Align right"><i class="ri-align-right"></i></button>
              <span class="pa-rte-divider"></span>
              <button class="pa-rte-btn" type="button" data-cmd="insertUnorderedList" title="Bullet list"><i class="ri-list-unordered"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="insertOrderedList" title="Numbered list"><i class="ri-list-ordered"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="indent" title="Increase indent"><i class="ri-indent-increase"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="outdent" title="Decrease indent"><i class="ri-indent-decrease"></i></button>
              <span class="pa-rte-divider"></span>
              <button class="pa-rte-btn" type="button" data-cmd="createLink" title="Insert / edit link"><i class="ri-link"></i></button>
              <button class="pa-rte-btn" type="button" data-rte-action="insertImage" title="Insert image"><i class="ri-image-add-line"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="formatBlock" data-value="blockquote" title="Quote"><i class="ri-double-quotes-l"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="formatBlock" data-value="pre" title="Code block"><i class="ri-code-line"></i></button>
              <button class="pa-rte-btn" type="button" data-cmd="insertHorizontalRule" title="Horizontal line"><i class="ri-separator"></i></button>
            </div>
            <div class="pa-rte-editor-surface">
              <div class="pa-rte-body pa-rte-body--blog" contenteditable="true" id="blogWsContent" data-placeholder="Start writing your article — paste from Word or Google Docs with formatting preserved…"></div>
              <div class="pa-rte-code-shell" id="blogWsRteCodeShell" hidden>
                <div class="pa-rte-code-toolbar" role="toolbar" aria-label="HTML code tools">
                  <button type="button" class="pa-rte-code-tool" data-code-action="search-toggle" title="Search in HTML (Ctrl+F)" aria-expanded="false" aria-controls="blogWsCodeSearch">
                    <i class="ri-search-line" aria-hidden="true"></i><span>Search</span>
                  </button>
                  <button type="button" class="pa-rte-code-tool" data-code-action="format" title="Format with Prettier (Ctrl+Shift+F)">
                    <i class="ri-magic-line" aria-hidden="true"></i><span>Format</span>
                  </button>
                  <button type="button" class="pa-rte-code-tool" data-code-action="beautify" title="Beautify HTML (indent tags)">
                    <i class="ri-code-s-slash-line" aria-hidden="true"></i><span>Beautify</span>
                  </button>
                  <span class="pa-rte-code-toolbar-spacer" aria-hidden="true"></span>
                  <span class="pa-rte-code-meta" id="blogWsCodeMeta">Ln 1, Col 1</span>
                </div>
                <div class="pa-rte-code-search" id="blogWsCodeSearch" hidden>
                  <input
                    type="search"
                    class="pa-rte-code-search-input"
                    id="blogWsCodeSearchInput"
                    placeholder="Search in HTML…"
                    autocomplete="off"
                    spellcheck="false"
                    aria-label="Search in HTML source"
                  />
                  <button type="button" class="pa-rte-code-search-btn" data-code-search="prev" title="Previous match (Shift+Enter)">
                    <i class="ri-arrow-up-s-line" aria-hidden="true"></i>
                  </button>
                  <button type="button" class="pa-rte-code-search-btn" data-code-search="next" title="Next match (Enter)">
                    <i class="ri-arrow-down-s-line" aria-hidden="true"></i>
                  </button>
                  <span class="pa-rte-code-search-status" id="blogWsCodeSearchStatus" aria-live="polite"></span>
                  <button type="button" class="pa-rte-code-search-close" data-code-search="close" aria-label="Close search">
                    <i class="ri-close-line" aria-hidden="true"></i>
                  </button>
                </div>
                <textarea class="pa-rte-code-pane pa-blog-ws-html-source pa-rte-code-pane--wrap" id="blogWsContentHtml" spellcheck="false" aria-label="HTML source" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
              </div>
              <div class="pa-rte-preview-pane" id="blogWsRtePreviewWrap" hidden>
                <p class="pa-blog-ws-preview-layout-label">Detail layout: <strong id="blogWsRtePreviewLayoutLabel">Standard</strong></p>
                <iframe
                  class="pa-blog-ws-rte-preview-iframe"
                  id="blogWsRtePreviewFrame"
                  title="Article detail preview"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div class="pa-blog-ws-main-panels" aria-label="SEO, revisions, and engagement">
          <section class="pa-blog-ws-panel" data-ws-panel id="paBlogWsSectionVisPanel" data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
            <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
              <span class="pa-blog-ws-panel-head-left"><i class="ri-layout-row-line"></i> Section visibility</span>
              <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
            </button>
            <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
              <p class="pa-blog-ws-engagement-hint">
                Control which blocks visitors see on the <strong>live post</strong>. Each row needs an <code>&lt;section id="…"&gt;</code> in your HTML (Longform / Case study starters include these). Uncheck to hide; save the post to publish. While logged in, you can also use the <strong>Sections</strong> button at the bottom-right on the public post.
              </p>
              <div class="pa-blog-ws-section-vis-list" id="paBlogWsSectionVisList" aria-live="polite"></div>
              <p class="pa-blog-ws-section-vis-empty" id="paBlogWsSectionVisEmpty" hidden>
                No sections found yet. Pick a detail layout above (e.g. Longform), use <strong>Replace with layout starter</strong>, or add sections in the editor — for example <code>&lt;section id="intro"&gt;&lt;h2&gt;Introduction&lt;/h2&gt;…&lt;/section&gt;</code>.
              </p>
            </div>
          </section>

          <section class="pa-blog-ws-panel is-collapsed" data-ws-panel data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
            <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
              <span class="pa-blog-ws-panel-head-left"><i class="ri-search-line"></i> SEO</span>
              <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
            </button>
            <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
              <div class="pa-form-group">
                <label class="pa-form-label" for="blogWsMetaTitle">Meta title</label>
                <input class="pa-form-input" type="text" id="blogWsMetaTitle" maxlength="70" placeholder="Defaults to post title" />
                <div class="pa-char-count"><span id="blogWsMetaTitleCount">0</span>/70</div>
              </div>
              <div class="pa-form-group">
                <label class="pa-form-label" for="blogWsMetaDesc">Meta description</label>
                <textarea class="pa-form-textarea" id="blogWsMetaDesc" maxlength="160" rows="3" placeholder="Defaults to excerpt"></textarea>
                <div class="pa-char-count"><span id="blogWsMetaDescCount">0</span>/160</div>
              </div>
            </div>
          </section>

          <section class="pa-blog-ws-panel is-collapsed" data-ws-panel id="paBlogWsRevisionsPanel" data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
            <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="false">
              <span class="pa-blog-ws-panel-head-left"><i class="ri-history-line"></i> Version history</span>
              <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
            </button>
            <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
              <p class="pa-blog-ws-engagement-hint">Up to 10 snapshots are saved before each save. Restore replaces the editor with a past version (save to persist).</p>
              <ul class="pa-blog-ws-revisions-list" id="paBlogWsRevisionsList" aria-live="polite"></ul>
              <p class="pa-blog-ws-revisions-empty" id="paBlogWsRevisionsEmpty" hidden>No revisions yet. Save the post to create snapshots.</p>
            </div>
          </section>

          <section class="pa-blog-ws-panel is-collapsed" data-ws-panel id="paBlogWsEngagementPanel" data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
            <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
              <span class="pa-blog-ws-panel-head-left"><i class="ri-chat-3-line"></i> Comments &amp; likes</span>
              <span class="pa-blog-ws-engagement-badge" id="paBlogWsEngagementBadge" hidden></span>
              <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
            </button>
            <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
              <p class="pa-blog-ws-engagement-hint">Shown on your public portfolio site. Save the post after changing toggles.</p>
              <div class="pa-form-group">
                <label class="pa-form-label" for="blogWsCommentsEnabled">Comments</label>
                <select class="pa-form-select" id="blogWsCommentsEnabled">
                  <option value="1">Enabled on portfolio</option>
                  <option value="0">Disabled</option>
                </select>
              </div>
              <div class="pa-form-group">
                <label class="pa-form-label" for="blogWsLikesEnabled">Likes</label>
                <select class="pa-form-select" id="blogWsLikesEnabled">
                  <option value="1">Enabled on portfolio</option>
                  <option value="0">Disabled</option>
                </select>
              </div>
              <div class="pa-form-group">
                <label class="pa-form-label" for="blogWsCommentsAutoApprove">New comments</label>
                <select class="pa-form-select" id="blogWsCommentsAutoApprove">
                  <option value="0">Require approval (moderation)</option>
                  <option value="1">Publish immediately</option>
                </select>
              </div>
              <div class="pa-blog-ws-engagement-stats" id="paBlogWsEngagementStats">
                <span><i class="ri-thumb-up-line"></i> <strong id="paBlogWsLikeCount">0</strong> likes</span>
                <span><i class="ri-chat-1-line"></i> <strong id="paBlogWsCommentCount">0</strong> approved</span>
                <span class="pa-blog-ws-engagement-pending" id="paBlogWsPendingWrap" hidden><i class="ri-time-line"></i> <strong id="paBlogWsPendingCount">0</strong> pending</span>
              </div>
              <div class="pa-blog-ws-comments" id="paBlogWsCommentsList" aria-live="polite">
                <div class="pa-blog-ws-comments-empty" id="paBlogWsCommentsEmpty">No comments yet. They will appear here when visitors comment on the portfolio.</div>
              </div>
            </div>
          </section>
        </div>
        <div class="pa-form-error-msg" id="blogWsContentError"><i class="ri-error-warning-line"></i> Full content is required</div>
      </div>
    </div>

    <aside class="pa-blog-ws-sidebar" aria-label="Post settings">
      <section class="pa-blog-ws-panel is-collapsed" data-ws-panel data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
        <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
          <span class="pa-blog-ws-panel-head-left"><i class="ri-upload-cloud-2-line"></i> Publish</span>
          <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
        </button>
        <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsStatus">Status</label>
            <select class="pa-form-select" id="blogWsStatus">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsPublishedDate">Schedule</label>
            <input class="pa-form-input" type="date" id="blogWsPublishedDate" />
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsFeatured">Featured</label>
            <select class="pa-form-select" id="blogWsFeatured">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsCategory">Category <span class="pa-form-required">*</span></label>
            <select class="pa-form-select" id="blogWsCategory">
              <option value="">Select category</option>
            </select>
            <div class="pa-form-error-msg" id="blogWsCategoryError"><i class="ri-error-warning-line"></i> Please select a category</div>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsSlug">URL Slug <span class="pa-form-required">*</span></label>
            <input class="pa-form-input" type="text" id="blogWsSlug" maxlength="100" autocomplete="off" spellcheck="false" />
            <div class="pa-form-error-msg" id="blogWsSlugError"><i class="ri-error-warning-line"></i> <span>URL slug is required</span></div>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsSortOrder">Sort order</label>
            <input class="pa-form-input" type="number" min="0" id="blogWsSortOrder" placeholder="0" />
          </div>
          <div class="pa-form-group">
            <span class="pa-form-label">Portfolio preview</span>
            <p class="pa-text-mute fs-sm mb-8">Signed link for draft posts (expires in 1 hour). Use on your portfolio site via <code>GET /api/public/preview?token=…</code>.</p>
            <button type="button" class="pa-btn pa-btn-secondary pa-btn-sm w-full" id="paBlogWsCopyPreviewLinkBtn"><i class="ri-link"></i> Copy preview API URL</button>
          </div>
          <div class="pa-blog-ws-publish-actions">
            <button type="button" class="pa-btn pa-btn-primary pa-blog-ws-publish-now" id="paBlogWsPublishNowBtn">Publish now</button>
            <button type="button" class="pa-btn pa-btn-cancel" id="paBlogWsSaveDraftBtn">Save draft</button>
          </div>
        </div>
      </section>

      <section class="pa-blog-ws-panel is-collapsed" data-ws-panel data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
        <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
          <span class="pa-blog-ws-panel-head-left"><i class="ri-layout-masonry-line"></i> Detail page layout</span>
          <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
        </button>
        <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
          <p class="pa-blog-ws-engagement-hint">How this post appears on your portfolio blog detail page.</p>
          <div class="pa-blog-tpl-grid" id="paBlogWsTemplateGrid" role="radiogroup" aria-label="Blog detail template"></div>
          <div class="pa-blog-tpl-preview-wrap">
            <span class="pa-form-label">Layout preview</span>
            <div class="pa-blog-tpl-preview" id="paBlogWsTemplatePreview" data-tpl="auto" aria-hidden="true">
              <div class="pa-blog-tpl-preview__hero"></div>
              <div class="pa-blog-tpl-preview__body">
                <span class="pa-blog-tpl-preview__col pa-blog-tpl-preview__col--left"></span>
                <span class="pa-blog-tpl-preview__col pa-blog-tpl-preview__col--main"></span>
                <span class="pa-blog-tpl-preview__col pa-blog-tpl-preview__col--right"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pa-blog-ws-panel is-collapsed" data-ws-panel data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
        <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
          <span class="pa-blog-ws-panel-head-left"><i class="ri-text-snippet"></i> Excerpt &amp; tags</span>
          <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
        </button>
        <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsExcerpt">Excerpt <span class="pa-form-required">*</span></label>
            <textarea class="pa-form-textarea" id="blogWsExcerpt" maxlength="160" rows="3" placeholder="Short summary for cards and previews"></textarea>
            <div class="pa-char-count"><span id="blogWsExcerptCount">0</span>/160</div>
            <div class="pa-form-error-msg" id="blogWsExcerptError"><i class="ri-error-warning-line"></i> Excerpt is required</div>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsTagInput">Tags</label>
            <div class="pa-tech-input-wrap">
              <input class="pa-tech-input" type="text" placeholder="Add tags (comma-separated)…" id="blogWsTagInput" />
              <button class="pa-tech-add-btn" type="button" id="blogWsTagAddBtn">+ Add</button>
            </div>
            <div class="pa-tech-chips" id="blogWsTagChips"></div>
          </div>
        </div>
      </section>

      <section class="pa-blog-ws-panel is-collapsed" data-ws-panel data-pa-collapse data-pa-collapse-inverted data-pa-collapse-class="is-collapsed">
        <button type="button" class="pa-blog-ws-panel-head pa-collapse-trigger" data-ws-panel-toggle data-pa-collapse-trigger aria-expanded="true">
          <span class="pa-blog-ws-panel-head-left"><i class="ri-image-add-line"></i> Media</span>
          <i class="ri-arrow-down-s-line pa-blog-ws-panel-chevron" aria-hidden="true"></i>
        </button>
        <div class="pa-blog-ws-panel-body pa-collapse-panel" data-pa-collapse-panel>
          <div class="pa-form-group">
            <div class="pa-form-label-row">
              <label class="pa-form-label" for="blogWsImageFileInput">Featured image</label>
              <button type="button" class="pa-btn pa-btn-cancel pa-btn-sm" id="blogWsFeaturedPickBtn"><i class="ri-image-add-line"></i> Media library</button>
            </div>
            <div class="pa-media-upload" id="blogWsImageDropzone">
              <i class="ri-upload-cloud-2-line"></i>
              <div class="pa-media-upload-text">Upload images or drag &amp; drop</div>
              <div class="pa-media-upload-hint">PNG, JPG, WebP up to 5MB</div>
              <input type="file" id="blogWsImageFileInput" name="blogWsImageFileInput" accept="image/png,image/jpeg,image/webp" aria-label="Featured image upload" />
            </div>
            <div class="pa-media-preview" id="blogWsImagePreviewWrap" style="display:none;">
              <img id="blogWsImagePreviewImg" src="" alt="" />
              <div class="pa-media-preview-remove" id="blogWsImageRemoveBtn" aria-label="Remove image"><i class="ri-close-line"></i></div>
            </div>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label" for="blogWsImageAlt">Image alt text</label>
            <input class="pa-form-input" type="text" id="blogWsImageAlt" maxlength="120" />
          </div>
        </div>
      </section>
    </aside>
  </div>
</div>`;
