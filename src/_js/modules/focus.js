class Focus {

  // Constants
  static FOCUS_STORAGE_KEY = "focus-element";
  static TRACKED_ELEMENTS = ["file-item", "folder-item"];

  constructor() {
  }

  init() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      this.#setInitialStateStyles(focusItemId);
    }

    Util.onDomLoaded(() => this.#onDomReady());
    Util.onAfterLoad(() => this.#onAfterLoad());
    window.addEventListener("focusin", (event) => this.#onFocus(event));

    return this;
  }

  #onDomReady() {
    this.#applyState();
  }

  #onAfterLoad() {
    document.documentElement.setAttribute("data-state", "loaded");
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      document.getElementById(focusItemId).children[0].focus();
    }
  }

  #setInitialStateStyles(focusItemId) {
    let style = `
    <style>
      html[data-state="loading"] #${CSS.escape(focusItemId)} {
        background-color: var(--color-file-active-background) !important;
        color: var(--color-file-active-foreground) !important;
        outline: 0.0625rem solid var(--color-file-active-border) !important;
      }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style);
  }

  #onFocus(event) {
    let element = event.target.parentElement;
    const tracked = Focus.TRACKED_ELEMENTS.filter(c => element.classList.contains(c)).length > 0;
    if (element.id && tracked) {
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, element.id);
    } else {
      window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    }
  }
}
