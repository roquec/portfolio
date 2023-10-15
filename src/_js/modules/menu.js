/**
 * Class representing a menu manager that handles the state of the menu panels.
 */
class Menu {
  // Constants
  static STORAGE_KEY = "menu-status";
  static CLOSED_STATUS = "closed";

  static OPEN_CLASS = "open";
  static CLOSED_CLASS = "closed";

  static MENU_ID = "menu";
  static EXPLORER_PANEL_ID = "explorer";
  static EXPLORER_ACTION_ID = "explorer-action";
  static SEARCH_PANEL_ID = "search";
  static SEARCH_ACTION_ID = "search-action";

  static DEFAULT_STATUS = this.EXPLORER_PANEL_ID;

  #menu;
  #explorerPanel;
  #explorerAction;
  #searchPanel;
  #searchAction;

  constructor(stateManager) {
    //Always start closed if not wide screen
    if (!Util.isWideScreen()) {
      window.sessionStorage.setItem(Menu.STORAGE_KEY, Menu.CLOSED_STATUS);
    }

    const menuState = Util.getState(Menu.STORAGE_KEY, Menu.DEFAULT_STATUS);

    this.#registerInitialStyles(stateManager, menuState);

    Util.onPageReady(this.#initialize.bind(this));
    Util.onCacheNavigation(this.#onCacheNavigation.bind(this));
  }

  #onCacheNavigation() {
    this.#close(this.#explorerPanel, this.#explorerAction);
    this.#close(this.#searchPanel, this.#searchAction);
    this.#menu.classList.add(Menu.CLOSED_CLASS);
    this.#menu.classList.remove(Menu.OPEN_CLASS);
  }

  #registerInitialStyles(stateManager, menuState) {
    stateManager.setStateByQuery(
      (e) => {
        return [Menu.EXPLORER_PANEL_ID, Menu.EXPLORER_ACTION_ID, Menu.SEARCH_PANEL_ID, Menu.SEARCH_ACTION_ID, Menu.MENU_ID].includes(e.id)
      },
      (element) => {
        this.setInitialStyles(element, menuState)
      }
    )
  }

  setInitialStyles(element, menuState) {
    if (menuState === Menu.EXPLORER_PANEL_ID) {
      if (element.id === Menu.EXPLORER_PANEL_ID || element.id === Menu.EXPLORER_ACTION_ID) {
        element.classList.add(Menu.OPEN_CLASS);
        element.classList.remove(Menu.CLOSED_CLASS);
      }
      if (element.id === Menu.SEARCH_PANEL_ID || element.id === Menu.SEARCH_ACTION_ID) {
        element.classList.remove(Menu.OPEN_CLASS);
        element.classList.add(Menu.CLOSED_CLASS);
      }
    }

    if (menuState === Menu.SEARCH_PANEL_ID) {
      if (element.id === Menu.EXPLORER_PANEL_ID || element.id === Menu.EXPLORER_ACTION_ID) {
        element.classList.remove(Menu.OPEN_CLASS);
        element.classList.add(Menu.CLOSED_CLASS);
      }
      if (element.id === Menu.SEARCH_PANEL_ID || element.id === Menu.SEARCH_ACTION_ID) {
        element.classList.add(Menu.OPEN_CLASS);
        element.classList.remove(Menu.CLOSED_CLASS);
      }
    }

    if (menuState === Menu.CLOSED_STATUS) {
      element.classList.remove(Menu.OPEN_CLASS);
      element.classList.add(Menu.CLOSED_CLASS);
    } else {
      if (element.id === Menu.MENU_ID) {
        element.classList.add(Menu.OPEN_CLASS);
        element.classList.remove(Menu.CLOSED_CLASS);
      }
    }
  }

  #initialize() {
    this.#menu = document.getElementById(Menu.MENU_ID)
    this.#explorerPanel = document.getElementById(Menu.EXPLORER_PANEL_ID)
    this.#explorerAction = document.getElementById(Menu.EXPLORER_ACTION_ID)
    this.#searchPanel = document.getElementById(Menu.SEARCH_PANEL_ID)
    this.#searchAction = document.getElementById(Menu.SEARCH_ACTION_ID)

    this.#applyState();
  }

  #applyState() {
    let menuStatus = window.sessionStorage.getItem(Menu.STORAGE_KEY);

    if (menuStatus === Menu.EXPLORER_PANEL_ID) {
      this.#open(this.#explorerPanel, this.#explorerAction);
      this.#close(this.#searchPanel, this.#searchAction);
    }

    if (menuStatus === Menu.SEARCH_PANEL_ID) {
      this.#close(this.#explorerPanel, this.#explorerAction);
      this.#open(this.#searchPanel, this.#searchAction);
    }

    if (menuStatus === Menu.CLOSED_STATUS) {
      this.#close(this.#explorerPanel, this.#explorerAction);
      this.#close(this.#searchPanel, this.#searchAction);
      this.#menu.classList.add(Menu.CLOSED_CLASS);
      this.#menu.classList.remove(Menu.OPEN_CLASS);
    }
  }

  #open(panel, action) {
    this.#menu.classList.add(Menu.OPEN_CLASS);
    this.#menu.classList.remove(Menu.CLOSED_CLASS);
    panel.classList.add(Menu.OPEN_CLASS);
    action.classList.add(Menu.OPEN_CLASS);
    panel.classList.remove(Menu.CLOSED_CLASS);
    action.classList.remove(Menu.CLOSED_CLASS);
  }

  #close(panel, action) {
    panel.classList.remove(Menu.OPEN_CLASS);
    action.classList.remove(Menu.OPEN_CLASS);
    panel.classList.add(Menu.CLOSED_CLASS);
    action.classList.add(Menu.CLOSED_CLASS);
  }

  toggle(id) {
    let menuStatus = window.sessionStorage.getItem(Menu.STORAGE_KEY);
    if (id === menuStatus) {
      menuStatus = Menu.CLOSED_STATUS;
    } else {
      menuStatus = id;
    }
    window.sessionStorage.setItem(Menu.STORAGE_KEY, menuStatus);
    this.#applyState();
  }

  close() {
    window.sessionStorage.setItem(Menu.STORAGE_KEY, Menu.CLOSED_STATUS);
    this.#applyState();
  }
}
