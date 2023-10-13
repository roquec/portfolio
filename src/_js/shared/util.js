class Util {

  static WIDE_BREAKPOINT_KEY = "--breakpoint-wide";
  static MOBILE_BREAKPOINT_KEY = "--breakpoint-mobile";

  /**
   * Method to run provided function as soon as the DOM is loaded
   */
  static onDomLoaded(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      window.addEventListener("DOMContentLoaded", () => callback());
    }
  }

  /**
   * Method to run provided function as soon as the DOM is loaded
   */
  static onPageReady(callback) {
    setTimeout(function () {
      if (document.readyState !== "loading") {
        callback();
      } else {
        window.addEventListener("load", () => callback());
      }
    }, 100)
  }

  /**
   * Method to prevent default behavior for mouse events.
   */
  static pauseEvent(event) {
    if (event.stopPropagation) event.stopPropagation();
    if (event.preventDefault) event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;
  }

  /**
   * Method to check if the current screen is wide
   * @returns {boolean}
   */
  static isWideScreen() {
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue(this.WIDE_BREAKPOINT_KEY);
    return window.matchMedia(`(min-width: ${breakpoint})`).matches;
  }

  /**
   * Method to check if the current screen is mobile
   * @returns {boolean}
   */
  static isMobile() {
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue(this.MOBILE_BREAKPOINT_KEY)
    return window.matchMedia(`(max-width: ${breakpoint})`).matches;
  }
}
