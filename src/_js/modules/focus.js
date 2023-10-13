class Focus {

  // Constants
  static FOCUS_STORAGE_KEY = "focus-element";
  static TRACKED_ELEMENTS = ["file-item", "folder-item"];

  constructor() {
  }

  init() {
    this.focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (this.focusItemId) {
      this.#setInitialStateStyles(this.focusItemId);
    }
    Util.onDomLoaded(() => this.#onDomReady());
    Util.onPageReady(() => this.#onPageReady());
    document.addEventListener("focusin", (event) => this.#onFocus(event));
    return this;
  }

  #setInitialStateStyles(focusItemId) {
    let style = `
    <style>
      .initial-state #${CSS.escape(focusItemId)} {
        background-color: var(--color-file-active-background) !important;
        color: var(--color-file-active-foreground) !important;
        outline: 0.0625rem solid var(--color-file-active-border) !important;
      }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style);
  }

  #onDomReady() {
    this.#applyState();
  }

  #onPageReady() {
    document.body.classList.remove("initial-state");
  }

  #applyState() {
    if (this.focusItemId) {
      const focusedElement = document.getElementById(this.focusItemId);
      focusedElement.classList.add("focused");
      focusedElement.children[0].focus();
    }
    console.log("Apply state: " + this.focusItemId);
  }

  #onFocus(event) {
    if (this.focusItemId && this.focusItemId === event.target?.parentElement?.id) {
      return;
    }

    document.getElementById(this.focusItemId)?.classList.remove("focused");
    window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    this.focusItemId = null;

    const isTracked = Focus.TRACKED_ELEMENTS.filter(c => event.target.parentElement.classList.contains(c)).length > 0;
    if (isTracked) {
      this.focusItemId = event.target.parentElement.id;
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, this.focusItemId);
      event.target.parentElement.classList.add("focused");
    }
  }
}
