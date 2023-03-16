const defaultStylesFilesOpen = `<style>
  .files.initial-state{ display:flex !important; }
  .icon-files.initial-state{ border-left: 2px solid var(--color-sidebar-selected-foreground) !important; color: var(--color-sidebar-selected-foreground) !important; }
</style>`

const defaultStylesSearchOpen = `<style>
  .search.initial-state{ display:flex !important; }
  .icon-search.initial-state{ border-left: 2px solid var(--color-sidebar-selected-foreground) !important; color: var(--color-sidebar-selected-foreground) !important; }
</style>`

initializePanels();

window.addEventListener("load", updateNavigationElements);

function initializePanels() {
  if (!isWideScreen()) {
    window.sessionStorage.removeItem("navigation-panel");
  }

  const state = window.sessionStorage.getItem("navigation-panel");

  if (state === "files") {
    document.write(defaultStylesFilesOpen);
  } else if (state === "search") {
    document.write(defaultStylesSearchOpen);
  } else if (state === "closed") {

  } else if (isWideScreen()) {
    window.sessionStorage.setItem("navigation-panel", "files");
    document.write(defaultStylesFilesOpen);
  }
}

function toggleFilesPanel() {
  const state = window.sessionStorage.getItem("navigation-panel");

  if (state === "files") {
    window.sessionStorage.setItem("navigation-panel", "closed");
  } else {
    window.sessionStorage.setItem("navigation-panel", "files");
  }

  updateNavigationElements();
}

function toggleSearchPanel() {
  const state = window.sessionStorage.getItem("navigation-panel");

  if (state === "search") {
    window.sessionStorage.setItem("navigation-panel", "closed");
  } else {
    window.sessionStorage.setItem("navigation-panel", "search");
  }

  updateNavigationElements();
}

function updateNavigationElements() {
  const filesPanel = document.getElementById("files-panel");
  const searchPanel = document.getElementById("search-panel");
  const filesIcon = document.getElementById("icon-files");
  const searchIcon = document.getElementById("icon-search");

  const state = window.sessionStorage.getItem("navigation-panel");

  if (state === "files") {
    filesPanel.classList.add("open");
    filesIcon.classList.add("open");
    searchPanel.classList.remove("open");
    searchIcon.classList.remove("open");
  } else if (state === "search") {
    searchPanel.classList.add("open");
    searchIcon.classList.add("open");
    filesPanel.classList.remove("open");
    filesIcon.classList.remove("open");
  } else {
    searchPanel.classList.remove("open");
    searchIcon.classList.remove("open");
    filesPanel.classList.remove("open");
    filesIcon.classList.remove("open");
  }

  // Remove initial state class
  filesPanel.classList.remove("initial-state");
  searchPanel.classList.remove("initial-state");
  filesIcon.classList.remove("initial-state");
  searchIcon.classList.remove("initial-state");
}

function isWideScreen() {
  return window.matchMedia("(min-width: 992px)").matches;
}
