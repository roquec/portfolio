const defaultStylesFilesOpen = `<style>
  .navigation { display:flex !important; }
  .files-panel.initial-state{ display:flex !important; }
  .files-icon.initial-state{ color: var(--color-sidebar-selected-foreground) !important; }
  .files-icon.initial-state .highlight { display: block !important; }
</style>`

const defaultStylesSearchOpen = `<style>
  .navigation { display:flex !important; }
  .search-panel.initial-state{ display:flex !important; }
  .search-icon.initial-state{ color: var(--color-sidebar-selected-foreground) !important; }
  .search-icon.initial-state .highlight { display: block !important; }
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
  const filesIcon = document.getElementById("files-icon");
  const searchIcon = document.getElementById("search-icon");

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
  return window.matchMedia("(min-width: 62rem)").matches;
}
