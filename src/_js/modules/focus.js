class Focus {

  // Constants
  static FOCUS_STORAGE_KEY = "focus-element";
  static TRACKED_ELEMENTS = ["file-item", "folder-item"];

  constructor() {
  }

  init() {
    this.#applyState();
    document.addEventListener("focusin", (event) => this.#onFocus(event));
    Util.onDomLoaded(() => this.#onDomReady());
    Util.onPageReady(() => this.#onPageReady());
    return this;
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      const focusedElement = document.getElementById(focusItemId);
      focusedElement.classList.add("focused");
      focusedElement.children[0].focus();
    }
  }

  #onDomReady() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      const focusedElement = document.getElementById(focusItemId);
      focusedElement.children[0].focus();
    }
  }

  #onPageReady() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      const focusedElement = document.getElementById(focusItemId);
      focusedElement.classList.remove("focused");
      focusedElement.children[0].focus();
    }
  }

  #onFocus(event) {
    const isTracked = Focus.TRACKED_ELEMENTS.filter(c => event.target.parentElement.classList.contains(c)).length > 0;
    if (isTracked) {
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, event.target.parentElement.id);
    } else {
      window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    }
  }
}
