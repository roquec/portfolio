class Config {

  static CONFIG_THEME_INPUT_ID = "config-theme-input";
  static CONFIG_PANEL_WIDTH_INPUT_ID = "config-panel-width-input";
  static CONFIG_MENU_PANEL_INPUT_ID = "config-menu-panel-input";
  static CONFIG_SEARCH_QUERY_INPUT_ID = "config-search-query-input";

  #themeElement;
  #widthElement;
  #menuElement;
  #searchElement;

  constructor() {
    Util.onPageReady(this.#initialize.bind(this));
  }

  #initialize() {
    this.#themeElement = document.getElementById(Config.CONFIG_THEME_INPUT_ID);
    this.#widthElement = document.getElementById(Config.CONFIG_PANEL_WIDTH_INPUT_ID);
    this.#menuElement = document.getElementById(Config.CONFIG_MENU_PANEL_INPUT_ID);
    this.#searchElement = document.getElementById(Config.CONFIG_SEARCH_QUERY_INPUT_ID);
    this.storageChange();
  }

  storageChange() {
    if (this.#themeElement) {
      this.#themeElement.value = localStorage.getItem(Theme.THEME_STORAGE_KEY);
    }
    if (this.#widthElement) {
      this.#widthElement.value = localStorage.getItem(Resizer.WIDTH_STORAGE_KEY);
    }
    if (this.#menuElement) {
      this.#menuElement.value = sessionStorage.getItem(Menu.STORAGE_KEY);
    }
    if (this.#searchElement) {
      this.#searchElement.value = "\"" + sessionStorage.getItem(Search.SEARCH_TEXT_KEY) + "\"";
    }
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
