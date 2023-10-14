class Focus {

  // Constants
  static FOCUS_STORAGE_KEY = "focus-element";
  static TRACKED_ELEMENTS = ["file-item", "folder-item"];

  constructor() {
  }

  init() {
    this.#applyState();
    Util.onDomLoaded(() => this.#onDomReady());
    document.addEventListener("focusin", (event) => this.#onFocus(event));
    return this;
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      const focusedElement = document.getElementById(focusItemId);
      focusedElement.classList.add("focused");
    }
  }

  #onDomReady() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);
    if (focusItemId) {
      const focusedElement = document.getElementById(focusItemId);
      focusedElement.children[0].focus();
      focusedElement.classList.remove("focused");
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
