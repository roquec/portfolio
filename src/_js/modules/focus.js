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

  // Variables
  #focusedElement;
  #focusEventListener = this.#onFocus.bind(this);

  constructor(stateManager) {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);

    this.#registerInitialStyles(stateManager, focusItemId);

    Util.onPageReady(this.#initialize.bind(this));
  }

  #registerInitialStyles(stateManager, focusItemId) {
    if (focusItemId) {
      stateManager.setStateById(focusItemId,
        (element) => {
          element.classList.add("focused");
          console.log("Added focused class to: " + element.id);
        }
      )
    }
  }

  #initialize() {
    this.#applyState();
    document.addEventListener("focusin", this.#focusEventListener);
    document.addEventListener("focusout", this.#focusEventListener);
    return this;
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);

    // Clear previous focus if existed
    if (this.#focusedElement && focusItemId !== this.#focusedElement.id) {
      this.#focusedElement.classList.remove(Focus.FOCUSED_CLASS);
      console.log("Removed focused class from: " + this.#focusedElement.id);
    }

    // Set new focus
    if (focusItemId) {
      const elementToFocus = document.getElementById(focusItemId);
      this.#focusedElement = elementToFocus;
      elementToFocus?.classList.add(Focus.FOCUSED_CLASS);
      elementToFocus.focus();
    }
  }

  stopListeners() {
    document.removeEventListener("focusin", this.#focusEventListener);
    document.removeEventListener("focusout", this.#focusEventListener);
  }

  #onFocus(event) {
    let element = document.activeElement;
    console.log("Focus event on " + element.nodeName + " with ID " + element.id);
    if (element.nodeName === "A" && element.id !== null) {
      window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, element.id);
    } else {
      window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);
    }
    this.#applyState();
  }
}
