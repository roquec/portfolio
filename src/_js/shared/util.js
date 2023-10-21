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
   * Method to run provided function as soon as the page is ready
   */
  static onPageReady(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      window.addEventListener("load", () => callback());
    }
  }

  /**
   * Method to run provided function when bfcache navigation occurred
   */
  static onCacheNavigation(callback) {
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        callback();
      }
    });
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
