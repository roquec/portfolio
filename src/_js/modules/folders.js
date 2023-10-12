/**
 * Folders class manages the state of open folders, using sessionStorage for persistence.
 * It allows toggling the visibility of folders and updating the DOM accordingly.
 */
class Folders {

  // Constants
  static FOLDERS_STORAGE_KEY = "open-folders";
  static FOLDERS_ATTRIBUTE = "data-folders";
  static DEFAULT_OPEN_FOLDERS = ["portfolio-folder"];

  constructor() {
  }

  init() {
    if (!window.sessionStorage.getItem(Folders.FOLDERS_STORAGE_KEY)) {
      window.sessionStorage.setItem(Folders.FOLDERS_STORAGE_KEY, JSON.stringify(Folders.DEFAULT_OPEN_FOLDERS));
    }

    this.#applyState();
    return this;
  }

  #applyState() {
    let folders = this.#getOpenFolders();
    if (folders.length > 0) {
      let attribute = folders.join(" ");
      document.documentElement.setAttribute(Folders.FOLDERS_ATTRIBUTE, attribute);
    } else {
      document.documentElement.setAttribute(Folders.FOLDERS_ATTRIBUTE, "");
    }
  }

  toggle(folderId) {
    const folders = this.#getOpenFolders();
    const index = folders.indexOf(folderId);
    if (index > -1) {
      folders.splice(index, 1);
    } else {
      folders.push(folderId);
    }
    window.sessionStorage.setItem(Folders.FOLDERS_STORAGE_KEY, JSON.stringify(folders));
    this.#applyState();
  }

  #getOpenFolders() {
    return JSON.parse(window.sessionStorage.getItem(Folders.FOLDERS_STORAGE_KEY) ?? "[]");
  }
}
