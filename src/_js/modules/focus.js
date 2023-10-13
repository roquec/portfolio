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
    Util.onPageReady(() => this.#onPageReady());

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
    document.addEventListener("focusin", (event) => this.#onFocus(event));
  }

  #onPageReady() {
    document.body.classList.remove("initial-state");
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      this.focusedElement = document.getElementById(focusItemId);
      this.focusedElement.classList.add("focused");
      this.focusedElement.children[0].focus();
      window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    }
  }

  #onFocus(event) {
    if (this.focusedElement && event.target.parentElement.id !== this.focusedElement.id) {
      this.focusedElement.classList.remove("focused");
    }
    const isTracked = Focus.TRACKED_ELEMENTS.filter(c => event.target.parentElement.classList.contains(c)).length > 0;
    if (isTracked) {
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, event.target.parentElement.id);
      event.target.parentElement.classList.add("focused");
      this.focusedElement = event.target.parentElement;
    }
  }
}
