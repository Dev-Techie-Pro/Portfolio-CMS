export class AppearancePanel {
  static selector = "#paCustomPanel";
  static toastSelector = "#paCustomToastWrap";
  static overlaySelector = "#paPanelOverlay";

  static markup() {
    return `
    <div class="pa-panel" id="paCustomPanel" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="paCustomPanelTitle">
      <div class="pa-panel-head">
        <span class="pa-panel-title" id="paCustomPanelTitle">Appearance Settings</span>
        <button class="pa-panel-close" id="paCustomPanelClose" aria-label="Close">
          <span class="icon" data-icon="siColse"></span>
        </button>
      </div>
      <div class="pa-panel-tabs">
        <button class="pa-panel-tab active" data-panel="custom" data-tab="theme">Theme &amp; Color</button>
        <button class="pa-panel-tab" data-panel="custom" data-tab="effects">Effects</button>
      </div>
      <div class="pa-panel-body" id="paCustomPanelBody">
        <div class="pa-tab-panel active" data-panel="custom" data-content="theme">
          <div class="pa-form-group">
            <label class="pa-form-label">Theme</label>
            <div class="custom-theme-group" role="radiogroup" aria-label="Theme">
              <button class="custom-theme-card" data-theme="light" role="radio" aria-checked="false" tabindex="0">
                <div class="custom-theme-thumb thumb-light">
                  <div class="th-bar"></div><div class="th-bar2"></div>
                  <div class="th-block"></div><div class="th-block2"></div>
                </div>
                <span class="custom-theme-radio"><span class="radio-dot"></span>Light</span>
              </button>
              <button class="custom-theme-card" data-theme="dark" role="radio" aria-checked="false" tabindex="0">
                <div class="custom-theme-thumb thumb-dark">
                  <div class="th-bar"></div><div class="th-bar2"></div>
                  <div class="th-block"></div><div class="th-block2"></div>
                </div>
                <span class="custom-theme-radio"><span class="radio-dot"></span>Dark</span>
              </button>
              <button class="custom-theme-card" data-theme="system" role="radio" aria-checked="false" tabindex="0">
                <div class="custom-theme-thumb thumb-system">
                  <div class="th-bar"></div><div class="th-bar2"></div>
                </div>
                <span class="custom-theme-radio"><span class="radio-dot"></span>System</span>
              </button>
            </div>
          </div>
          <div class="pa-form-group mt-8">
            <label class="pa-form-label">Accent Color</label>
            <div class="custom-color-row" role="radiogroup" aria-label="Accent color">
              <button class="custom-swatch pa-orange" data-color="#ff6600" aria-label="Orange" role="radio" aria-checked="false">
                <span class="icon" data-icon="siCheckmark"></span>
              </button>
              <button class="custom-swatch pa-pink" data-color="#f0437e" aria-label="Pink" role="radio" aria-checked="false">
                <span class="icon" data-icon="siCheckmark"></span>
              </button>
              <button class="custom-swatch pa-green" data-color="#22c55e" aria-label="Green" role="radio" aria-checked="false">
                <span class="icon" data-icon="siCheckmark"></span>
              </button>
              <button class="custom-swatch pa-yellow" data-color="#ced11b" aria-label="Yellow" role="radio" aria-checked="false">
                <span class="icon" data-icon="siCheckmark"></span>
              </button>
              <button class="custom-swatch pa-blue" data-color="#445deb" aria-label="Blue" role="radio" aria-checked="false">
                <span class="icon" data-icon="siCheckmark"></span>
              </button>
              <button class="custom-swatch pa-purple" data-color="#dc12f7" aria-label="Purple" role="radio" aria-checked="false">
                <span class="icon" data-icon="siCheckmark"></span>
              </button>
            </div>
          </div>
          <div class="pa-form-group">
            <label class="pa-form-label">Border Radius</label>
            <div class="custom-cr-group" id="customCrGroup" role="radiogroup" aria-label="Border Radius">
              <button class="custom-cr-btn rad-0" data-radius="0px" role="radio" aria-checked="false" aria-label="None" tabindex="0"><span class="icon" data-icon="siBorderBox"></span>None</button>
              <button class="custom-cr-btn rad-sm" data-radius="5px" role="radio" aria-checked="false" aria-label="Small" tabindex="0"><span class="icon" data-icon="siBorderBox"></span>Small</button>
              <button class="custom-cr-btn rad-md" data-radius="14px" role="radio" aria-checked="false" aria-label="Medium" tabindex="0"><span class="icon" data-icon="siBorderBox"></span>Medium</button>
              <button class="custom-cr-btn rad-lg" data-radius="25px" role="radio" aria-checked="false" aria-label="Large" tabindex="0"><span class="icon" data-icon="siBorderBox"></span>Large</button>
            </div>
          </div>
          <div class="pa-form-group mt-8">
            <label class="pa-form-label">Spacing</label>
            <div class="custom-font-size-control" role="radiogroup" aria-label="Spacing">
              <div class="custom-fs-seg">
                <button class="custom-fs-btn" data-spacing="5px" role="radio" aria-checked="false">Tight</button>
                <button class="custom-fs-btn" data-spacing="10px" role="radio" aria-checked="false">Medium</button>
                <button class="custom-fs-btn" data-spacing="15px" role="radio" aria-checked="false">Large</button>
              </div>
            </div>
          </div>
        </div>
        <div class="pa-tab-panel" data-panel="custom" data-content="effects">
          <div class="pa-form-group">
            <div class="custom-toggle-row">
              <div class="custom-toggle-text">
                <span class="custom-toggle-title">Background Textures</span>
                <span class="custom-toggle-desc">Canvas particle networks behind hero sections and the footer</span>
              </div>
              <button class="custom-toggle-switch" id="customTexturesToggle" type="button" role="switch" aria-checked="false" aria-label="Background Textures"></button>
            </div>
            <div class="custom-toggle-row">
              <div class="custom-toggle-text">
                <span class="custom-toggle-title">Background Symbols</span>
                <span class="custom-toggle-desc">Floating code glyphs layered over hero sections</span>
              </div>
              <button class="custom-toggle-switch" id="customSymbolsToggle" type="button" role="switch" aria-checked="false" aria-label="Background Symbols"></button>
            </div>
            <div class="custom-toggle-row">
              <div class="custom-toggle-text">
                <span class="custom-toggle-title">Animations</span>
                <span class="custom-toggle-desc">Decorative motion: glow, scan line, brackets, floating elements</span>
              </div>
              <button class="custom-toggle-switch" id="customAnimationsToggle" type="button" role="switch" aria-checked="false" aria-label="Animations"></button>
            </div>
          </div>
          <div class="pa-form-group mt-8">
            <label class="pa-form-label">Animation Speed</label>
            <div class="custom-font-size-control" role="radiogroup" aria-label="Animation speed" id="customSpeedGroup">
              <div class="custom-fs-seg custom-speed-seg">
                <button class="custom-fs-btn" data-speed="slow" role="radio" aria-checked="false">Slow</button>
                <button class="custom-fs-btn" data-speed="normal" role="radio" aria-checked="false">Normal</button>
                <button class="custom-fs-btn" data-speed="fast" role="radio" aria-checked="false">Fast</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pa-panel-footer">
        <button class="pa-btn pa-btn-cancel" id="paCustomCancel">Close</button>
      </div>
    </div>
    <div class="pa-toast-wrap" id="paCustomToastWrap"></div>
    <div class="pa-panel-overlay" id="paPanelOverlay"></div>`;
  }

  static #insertMissingSiblings(root, panel) {
    if (!root.querySelector(this.toastSelector)) {
      panel.insertAdjacentHTML(
        "afterend",
        `<div class="pa-toast-wrap" id="paCustomToastWrap"></div>`,
      );
    }
    const toast = root.querySelector(this.toastSelector);
    const overlayHost = toast || panel;
    if (!root.querySelector(this.overlaySelector)) {
      overlayHost.insertAdjacentHTML(
        "afterend",
        `<div class="pa-panel-overlay" id="paPanelOverlay"></div>`,
      );
    }
  }

  static mount(root = document) {
    if (!root?.body) {
      console.warn(
        "[Portfolio.AppearancePanel] Cannot mount: document body is missing.",
      );
      return null;
    }

    let panel = root.querySelector(this.selector);
    let toast = root.querySelector(this.toastSelector);
    let overlay = root.querySelector(this.overlaySelector);

    if (!panel && !toast && !overlay) {
      root.body.insertAdjacentHTML("afterbegin", this.markup());
      panel = root.querySelector(this.selector);
    } else if (!panel) {
      console.warn(
        "[Portfolio.AppearancePanel] Toast or overlay found without #paCustomPanel; inserting full markup.",
      );
      root.body.insertAdjacentHTML("afterbegin", this.markup());
      panel = root.querySelector(this.selector);
    } else {
      this.#insertMissingSiblings(root, panel);
    }

    toast = root.querySelector(this.toastSelector);
    overlay = root.querySelector(this.overlaySelector);

    if (!panel) {
      console.error(
        "[Portfolio.AppearancePanel] Markup inserted but #paCustomPanel was not found.",
      );
      return null;
    }
    if (!toast) {
      console.error(
        "[Portfolio.AppearancePanel] #paCustomToastWrap is missing; toasts will not render.",
      );
    }
    if (!overlay) {
      console.error(
        "[Portfolio.AppearancePanel] #paPanelOverlay is missing; the dialog dimmer will not render.",
      );
    }

    if (panel.dataset.componentReady === "true") return panel;

    const customize = window.Portfolio?.CUSTOMIZE;
    if (typeof customize?.init === "function") {
      try {
        customize.init();
        if (customize._ready) {
          panel.dataset.componentReady = "true";
        }
      } catch (error) {
        console.error(
          "[Portfolio.AppearancePanel] Portfolio.CUSTOMIZE.init() failed.",
          error,
        );
      }
    }

    return panel;
  }
}
