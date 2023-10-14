/**
 * Resizer class manages the behavior of an element resizer.
 * It encapsulates the functionality to allow users to resize the element,
 * store the width in local storage, and maintain the UI state.
 */
class Resizer {

  static RESIZER_TARGET_ID = "menu";
  static RESIZER_ID = "resizer";
  static WIDTH_STORAGE_KEY = "menu-panel-width";
  static MENU_WIDTH_PROPERTY = "--menu-panel-width";
  static RESIZER_ACTIVE_CLASS = "active";

  resizerElement = null;
  resizerTarget = null;

  // Listeners
  clickResizerListener = this.#onResizerClick.bind(this);
  dragResizerListener = this.#onResizerDrag.bind(this);
  releaseResizerListener = this.#onResizerRelease.bind(this);

  constructor(stateManager) {
    const defaultWidth = getComputedStyle(document.documentElement).getPropertyValue(Resizer.MENU_WIDTH_PROPERTY);
    const width = Util.getState(Resizer.WIDTH_STORAGE_KEY, defaultWidth, localStorage);

    this.#registerInitialStyles(stateManager, width);

    Util.onPageReady(this.#initialize.bind(this));
  }

  #registerInitialStyles(stateManager, width) {
    if (width) {
      stateManager.setStateById(
        Resizer.RESIZER_TARGET_ID,
        (element) => element.style.width = width
      )
    }
  }

  #initialize() {
    this.resizerElement = document.getElementById(Resizer.RESIZER_ID);
    this.resizerTarget = document.getElementById(Resizer.RESIZER_TARGET_ID);
    this.start();
    this.#applyState();
  }

  start() {
    this.resizerElement.addEventListener("mousedown", this.clickResizerListener);
  }

  stop() {
    this.resizerElement.removeEventListener("mousedown", this.clickResizerListener);
    this.resizerElement.removeEventListener("mousedown", this.dragResizerListener);
    this.resizerElement.removeEventListener("mousedown", this.releaseResizerListener);
  }

  #applyState() {
    const storedWidth = window.localStorage.getItem(Resizer.WIDTH_STORAGE_KEY);
    if (storedWidth) {
      this.resizerElement.width = `${storedWidth}px`;
    }
  }

  #onResizerClick(e) {
    document.addEventListener("mousemove", this.dragResizerListener);
    document.addEventListener("mouseup", this.releaseResizerListener);
    this.resizerElement.classList.add(Resizer.RESIZER_ACTIVE_CLASS);
    Util.pauseEvent(e);
  }

  #onResizerDrag(e) {
    const newWidth = e.clientX - this.resizerElement.parentElement.offsetLeft;
    this.resizerTarget.style.width = `${newWidth}px`;
    Util.pauseEvent(e);
  }

  #onResizerRelease() {
    document.removeEventListener("mousemove", this.dragResizerListener);
    document.removeEventListener("mouseup", this.releaseResizerListener);
    this.resizerElement.classList.remove(Resizer.RESIZER_ACTIVE_CLASS);
    window.localStorage.setItem(Resizer.WIDTH_STORAGE_KEY, this.resizerTarget.style.width);
  }
}
