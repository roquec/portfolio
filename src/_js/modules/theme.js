/**
 * The `Theme` class provides theme management for the website. It allows switching
 * between dark and light themes, stores the current theme in local storage, and
 * updates the website's appearance accordingly.
 */
class Theme {

  static THEME_STORAGE_KEY = "theme";
  static THEME_ATTRIBUTE = "data-theme";
  static DARK_THEME_KEY = "dark";
  static LIGHT_THEME_KEY = "light";
  static DEFAULT_THEME = this.DARK_THEME_KEY;

  #theme = Theme.DEFAULT_THEME;

  constructor() {
    this.#applyState();
  }

  #applyState() {
    this.#theme = this.getState();

    document.documentElement.setAttribute(Theme.THEME_ATTRIBUTE, this.#theme);
  }

  toggle() {
    // Disable transitions to avoid delayed color changes
    document.body.classList.add("no-transition");

    // Update theme
    if (this.#theme === Theme.DARK_THEME_KEY) {
      this.#theme = Theme.LIGHT_THEME_KEY;
    } else {
      this.#theme = Theme.DARK_THEME_KEY;
    }

    this.#setState(this.#theme);

    this.#applyState();

    // Trigger CSS update while transitions are disabled
    document.body.offsetHeight;

    // Re-enable transitions after theme change
    document.body.classList.remove("no-transition");
  }

  set(value) {
    if (value === Theme.DARK_THEME_KEY || value === Theme.LIGHT_THEME_KEY) {
      this.#setState(value);
      this.#applyState();
    }
  }

  getState() {
    return Storage.get(Theme.THEME_STORAGE_KEY, Theme.DEFAULT_THEME, localStorage);
  }

  #setState(value) {
    Storage.set(Theme.THEME_STORAGE_KEY, value, localStorage);
  }
}
