initializePanels();

window.addEventListener("DOMContentLoaded", updateNavigationElements);

function initializePanels() {
  if (!isWideScreen()) {
    window.sessionStorage.removeItem("navigation-panel");
  }

  const state = window.sessionStorage.getItem("navigation-panel");

  if (state === "files") {
    setInitialNavigationPanelStyles("files");
  } else if (state === "search") {
    setInitialNavigationPanelStyles("search");
  } else if (state === "closed") {

  } else if (isWideScreen()) {
    window.sessionStorage.setItem("navigation-panel", "files");
    setInitialNavigationPanelStyles("files");
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

  document.getElementById("search-box").select();
}

function closeNavigationPanel() {
  window.sessionStorage.setItem("navigation-panel", "closed");
  updateNavigationElements();
}

function updateNavigationElements() {
  const filesPanel = document.getElementById("files-panel");
  const searchPanel = document.getElementById("search-panel");
  const filesIcon = document.getElementById("files-icon");
  const searchIcon = document.getElementById("search-icon");
  const navWrapper = document.getElementById("navigation-wrapper");

  const state = window.sessionStorage.getItem("navigation-panel");

  if (state === "files") {
    navWrapper.classList.add("open");
    filesPanel.classList.add("open");
    filesIcon.classList.add("open");
    searchPanel.classList.remove("open");
    searchIcon.classList.remove("open");
  } else if (state === "search") {
    navWrapper.classList.add("open");
    searchPanel.classList.add("open");
    searchIcon.classList.add("open");
    filesPanel.classList.remove("open");
    filesIcon.classList.remove("open");
  } else {
    searchPanel.classList.remove("open");
    searchIcon.classList.remove("open");
    filesPanel.classList.remove("open");
    filesIcon.classList.remove("open");
    navWrapper.classList.remove("open");
  }
}

function setInitialNavigationPanelStyles(panelId) {
  let style = `<style>
    .initial-state #navigation-wrapper { display:flex !important; }
    .initial-state #${panelId}-panel { display:flex !important; }
    .initial-state #${panelId}-icon { color: var(--color-sidebar-selected-foreground) !important; }
    .initial-state #${panelId}-icon .highlight { display: block !important; }
  </style>`;

  document.head.insertAdjacentHTML("beforeend", style)
}

function isWideScreen() {
  return window.matchMedia("(min-width: 62rem)").matches;
}
