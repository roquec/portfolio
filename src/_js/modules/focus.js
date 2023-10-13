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

  #onDomReady() {
    console.log(new Date().toISOString() + " - DOM READY");
    this.#applyState();
    window.addEventListener("focusin", (event) => this.#onFocus(event));
  }

  #onPageReady() {
    console.log(new Date().toISOString() + " - PAGE READY");
    document.body.classList.remove("initial-state");
  }


  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      this.element = document.getElementById(focusItemId);
      this.element.classList.add("focused");
      this.element.children[0].focus();
    }
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

  #onFocus(event) {
    this.element.classList.remove("focused");
    console.log(new Date().toISOString() + " - FOCUS EVENT " + event.target.parentElement.id);
    let element = event.target.parentElement;
    const tracked = Focus.TRACKED_ELEMENTS.filter(c => element.classList.contains(c)).length > 0;
    if (element.id && tracked) {
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, element.id);
    } else {
      window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    }
  }
}
