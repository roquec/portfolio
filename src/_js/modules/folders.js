/**
 * Folders class manages the state of open folders, using sessionStorage for persistence.
 * It allows toggling the visibility of folders and updating the DOM accordingly.
 */
class Folders {

  // Constants
  static FOLDERS_STORAGE_KEY = "open-folders";
  static DEFAULT_OPEN_FOLDERS = ["portfolio-folder", "search-results-projects", "search-results-articles", "search-results-drawings"];
  static FOLDERS_CLASS = "folder";
  static OPEN_FOLDER_CLASS = "open";

  constructor(stateManager) {
    this.#registerInitialStyles(stateManager, this.#getState());

    Util.onPageReady(this.#initialize.bind(this));
  }

  #registerInitialStyles(stateManager, openFolders) {
    if (openFolders.length > 0) {
      stateManager.setStateByClass(Folders.FOLDERS_CLASS,
        (element) => {
          if (openFolders.includes(element.id) || element.querySelector(".file-item.open")) {
            element.classList.add(Folders.OPEN_FOLDER_CLASS);
          }
        }
      )
    }
  }

  #initialize() {
    const stateFolders = this.#getState();
    const folders = document.getElementsByClassName("folder");

    let currentFolders = [];
    for (let folder of folders) {
      if (folder.querySelector(".file-item.open")) {
        currentFolders.push(folder);
      }
    }

    for (let currentFolder of currentFolders) {
      if (currentFolder.id && !stateFolders.includes(currentFolder.id)) {
        stateFolders.push(currentFolder.id);
      }
    }

    Storage.set(Folders.FOLDERS_STORAGE_KEY, JSON.stringify(stateFolders));

    this.#applyState();
  }

  #applyState() {
    let folders = this.#getState();

    const currentFolders = document.querySelectorAll(".folder.open");

    for (let currentFolder of currentFolders) {
      if (!folders.includes(currentFolder)) {
        currentFolder.classList.remove(Folders.OPEN_FOLDER_CLASS);
      }
    }

    for (let folderId of folders) {
      document.getElementById(folderId).classList.add(Folders.OPEN_FOLDER_CLASS);
    }
  }

  toggle(folderId) {
    const folders = this.#getState();
    const index = folders.indexOf(folderId);
    if (index > -1) {
      folders.splice(index, 1);
    } else {
      folders.push(folderId);
    }

    Storage.set(Folders.FOLDERS_STORAGE_KEY, JSON.stringify(folders));

    this.#applyState();
  }

  #getState() {
    const state = Storage.get(Folders.FOLDERS_STORAGE_KEY, JSON.stringify(Folders.DEFAULT_OPEN_FOLDERS));
    return JSON.parse(state);
  }
}
