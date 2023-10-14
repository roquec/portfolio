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
  static FOCUS_TARGETS = "a[id]";

  // Variables
  #clickEventListener = this.#onClick.bind(this);

  constructor(stateManager) {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);

    this.#registerInitialStyles(stateManager, focusItemId);

    Util.onPageReady(this.#initialize.bind(this));
  }

  #registerInitialStyles(stateManager, focusItemId) {
    if (focusItemId) {
      stateManager.setStateById(
        focusItemId,
        (element) => {
          element.classList.add(Focus.FOCUSED_CLASS);
        }
      )
    }
  }

  #initialize() {
    this.#applyState();

    const targets = document.querySelectorAll(Focus.FOCUS_TARGETS);
    for (let target of targets) {
      target.addEventListener("click", this.#clickEventListener);
    }

    window.sessionStorage.removeItem(Focus.FOCUS_STORAGE_KEY);

    setTimeout(function () {
      const focused = document.getElementsByClassName(Focus.FOCUSED_CLASS);
      for (let focusedElement of focused) {
        focusedElement.classList.remove(Focus.FOCUSED_CLASS);
      }
    }, 2000);
  }

  #applyState() {
    const focusItemId = window.sessionStorage.getItem(Focus.FOCUS_STORAGE_KEY);

    // Set new focus
    if (focusItemId) {
      const elementToFocus = document.getElementById(focusItemId);
      elementToFocus?.focus();
    }
  }

  #onClick(event) {
    const id = event.target.closest(Focus.FOCUS_TARGETS).id;
    window.sessionStorage.setItem(Focus.FOCUS_STORAGE_KEY, id);
    this.#applyState();
  }
}
