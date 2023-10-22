class Config {

  static CONFIG_THEME_INPUT_ID = "config-theme-input";
  static CONFIG_PANEL_WIDTH_INPUT_ID = "config-panel-width-input";
  static CONFIG_MENU_PANEL_INPUT_ID = "config-menu-panel-input";
  static CONFIG_SEARCH_QUERY_INPUT_ID = "config-search-query-input";

  #themeElement;
  #widthElement;
  #menuElement;
  #searchElement;

  // Listeners
  #stateListener = this.#onStateChange.bind(this);
  #inputChangeListener = this.#onInputChange.bind(this);

  constructor() {
    Util.onPageReady(this.#initialize.bind(this));
  }

  #initialize() {
    this.#themeElement = document.getElementById(Config.CONFIG_THEME_INPUT_ID);
    this.#widthElement = document.getElementById(Config.CONFIG_PANEL_WIDTH_INPUT_ID);
    this.#menuElement = document.getElementById(Config.CONFIG_MENU_PANEL_INPUT_ID);
    this.#searchElement = document.getElementById(Config.CONFIG_SEARCH_QUERY_INPUT_ID);

    window.addEventListener("state", this.#stateListener);
    this.#themeElement.addEventListener("change", this.#inputChangeListener);
    this.#widthElement.addEventListener("change", this.#inputChangeListener);
    this.#menuElement.addEventListener("change", this.#inputChangeListener);
    this.#searchElement.addEventListener("change", this.#inputChangeListener);

    if (Util.isMobile()) {
      this.#menuElement.disabled = true;
      this.#widthElement.disabled = true;
    }

    this.#onStateChange();
  }

  #onStateChange() {
    if (this.#themeElement) {
      this.#themeElement.value = theme.getState();
    }
    if (this.#widthElement) {
      this.#widthElement.value = resizer.getState();
    }
    if (this.#menuElement) {
      this.#menuElement.value = menu.getState();
    }
    if (this.#searchElement) {
      this.#searchElement.value = "\"" + search.getQueryState() + "\"";
    }
  }

  #onInputChange() {
    this.#onStateChange();
  }

  setThemeConfig() {
    theme.set(this.#themeElement.value);
  }

  setWidthConfig() {
    resizer.set(this.#widthElement.value);
  }

  setMenuConfig() {
    menu.set(this.#menuElement.value);
  }

  setSearchConfig() {
    search.search(this.#searchElement.value.replaceAll("\"", ""));
  }
}
