/**
 * Class representing a menu manager that handles the state of the menu panels.
 */
class Menu {

  // Constants
  static MENU_STORAGE_KEY = "menu-status";
  static MENU_ATTRIBUTE = "data-menu";
  static MENU_CLOSED_STATUS = "closed";
  static MENU_EXPLORER_ID = "explorer";
  static MENU_SEARCH_ID = "search";
  static DEFAULT_STATUS = this.MENU_EXPLORER_ID;

  constructor() {
  }

  init() {
    let menuStatus = window.sessionStorage.getItem(Menu.MENU_STORAGE_KEY);
    if (!menuStatus) {
      if (Util.isWideScreen()) {
        menuStatus = Menu.DEFAULT_STATUS;
      } else {
        menuStatus = Menu.MENU_CLOSED_STATUS;
      }
    }
    window.sessionStorage.setItem(Menu.MENU_STORAGE_KEY, menuStatus);
    this.#applyState();
    return this;
  }

  #applyState() {
    let menuStatus = window.sessionStorage.getItem(Menu.MENU_STORAGE_KEY);
    document.documentElement.setAttribute(Menu.MENU_ATTRIBUTE, menuStatus);
  }

  toggle(id) {
    let menuStatus = window.sessionStorage.getItem(Menu.MENU_STORAGE_KEY);
    if (id === menuStatus) {
      menuStatus = Menu.MENU_CLOSED_STATUS;
    } else {
      menuStatus = id;
    }
    console.log(menuStatus);
    window.sessionStorage.setItem(Menu.MENU_STORAGE_KEY, menuStatus);
    this.#applyState();
  }

  close() {
    window.sessionStorage.setItem(Menu.MENU_STORAGE_KEY, Menu.MENU_CLOSED_STATUS);
    this.#applyState();
  }
}
