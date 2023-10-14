/**
 * Focus class manages and persists focus state for elements using sessionStorage.
 * It adds and removes a 'focused' class to indicate the focused element and ensures that the focused element is
 * retained even after page refreshes. It also handles focusing on elements with a 'link-overlay' class and tracks
 * focus changes to maintain the current focus state.
 */
class Focus {

  // Constants
  static FOCUS_STORAGE_KEY = "focus-element";
  static FOCUSED_CLASS = "focused";
  static LINK_OVERLAY_CLASS = "link-overlay";

  // Variables
  #focusedElement;
  #focusEventListener = this.#onFocus.bind(this);

  constructor() {
  }

  run() {
    this.#applyState();
    Util.onPageReady(this.#onPageReady.bind(this));
    return this;
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);

    // Clear previous focus if existed
    if (this.#focusedElement && focusItemId !== this.#focusedElement.id) {
      this.#focusedElement.classList.remove(Focus.FOCUSED_CLASS);
    }

    // Set new focus
    if (focusItemId) {
      const elementToFocus = document.getElementById(focusItemId);
      this.#focusedElement = elementToFocus;
      elementToFocus?.classList.add(Focus.FOCUSED_CLASS);
    }
  }

  #onPageReady() {
    if (this.#focusedElement) {
      const element = this.#focusedElement.getElementsByClassName(Focus.LINK_OVERLAY_CLASS)[0] ?? this.#focusedElement;
      element.focus();
    }
    this.startListeners();
  }

  startListeners() {
    console.log("LISTENER");
    document.addEventListener("focusin", this.#focusEventListener);
    document.addEventListener("focusout", this.#focusEventListener);
  }

  stopListeners() {
    document.removeEventListener("focusin", this.#focusEventListener);
  }

  #onFocus(event) {
    let element = document.activeElement;
    console.log("FOCUS");
    if (element.classList.contains(Focus.LINK_OVERLAY_CLASS) && element.parentElement) {
      element = element.parentElement;
    }

    if (element.id) {
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, element.id);
    } else {
      window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    }
    this.#applyState();
  }
}
