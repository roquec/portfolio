/**
 * Resizer class manages the behavior of an element resizer.
 * It encapsulates the functionality to allow users to resize the element,
 * store the width in local storage, and maintain the UI state.
 */
class Resizer {

  static RESIZER_ID = "resizer";
  static WIDTH_STORAGE_KEY = "menu-panel-width";
  static MENU_WIDTH_PROPERTY = "--menu-panel-width";
  static RESIZER_ACTIVE_CLASS = "active";

  resizerElement = null;

  // Listeners
  clickResizerListener;
  dragResizerListener;
  releaseResizerListener;

  constructor() {
  }

  // Initialize the Resizer.
  init() {
    Util.onDomLoaded(() => this.#onDomReady());
    let storedWidth = window.localStorage.getItem(Resizer.WIDTH_STORAGE_KEY);

    if (!storedWidth) {
      // Get the initial width if not stored.
      const currentWidth = getComputedStyle(document.documentElement).getPropertyValue(Resizer.MENU_WIDTH_PROPERTY).slice(0, -2);
      console.log("menu width: " + currentWidth);
      window.localStorage.setItem(Resizer.WIDTH_STORAGE_KEY, currentWidth);
    }

    // Set the stored width.
    document.documentElement.style.setProperty(Resizer.MENU_WIDTH_PROPERTY, `${storedWidth}px`);

    return this;
  }

  // Private method: Called when the DOM is ready.
  #onDomReady() {
    this.resizerElement = document.getElementById(Resizer.RESIZER_ID);
    this.start();
    this.#applyState();
  }

  // Start the Resizer.
  start() {
    this.clickResizerListener = (e) => this.#onResizerClick(e);
    this.resizerElement.addEventListener("mousedown", this.clickResizerListener);
  }

  // Stop the Resizer.
  stop() {
    this.resizerElement.removeEventListener("mousedown", this.clickResizerListener);
    this.resizerElement.removeEventListener("mousedown", this.dragResizerListener);
    this.resizerElement.removeEventListener("mousedown", this.releaseResizerListener);
  }

  // Private method: Apply the stored state.
  #applyState() {
    const storedWidth = window.localStorage.getItem(Resizer.WIDTH_STORAGE_KEY);
    if (storedWidth) {
      document.documentElement.style.setProperty(Resizer.MENU_WIDTH_PROPERTY, `${storedWidth}px`);
    }
  }

  // Private method: Handle mousedown event on the Resizer.
  #onResizerClick(e) {
    this.dragResizerListener = (e) => this.#onResizerDrag(e);
    document.addEventListener("mousemove", this.dragResizerListener);
    this.releaseResizerListener = () => this.#onResizerRelease();
    document.addEventListener("mouseup", this.releaseResizerListener);
    this.resizerElement.classList.add(Resizer.RESIZER_ACTIVE_CLASS);
    Util.pauseEvent(e);
  }

  // Private method: Handle mousemove event during drag.
  #onResizerDrag(e) {
    const newWidth = e.clientX - this.resizerElement.parentElement.offsetLeft;
    document.documentElement.style.setProperty(Resizer.MENU_WIDTH_PROPERTY, `${newWidth}px`);
    Util.pauseEvent(e);
  }

  // Private method: Handle mouseup event to end the drag.
  #onResizerRelease() {
    document.removeEventListener("mousemove", this.dragResizerListener);
    document.removeEventListener("mouseup", this.releaseResizerListener);
    this.resizerElement.classList.remove(Resizer.RESIZER_ACTIVE_CLASS);
    window.localStorage.setItem(Resizer.WIDTH_STORAGE_KEY, this.resizerElement.parentElement.offsetWidth.toString());
  }
}
