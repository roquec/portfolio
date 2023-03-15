initializePanels();

function initializePanels() {
  const filesPanelStatus = window.sessionStorage.getItem("files-panel");
  const searchPanelStatus = window.sessionStorage.getItem("search-panel");

  if (filesPanelStatus === "open") {
    document.write("<style>.files.display-default{display:flex;} .search.display-default{display:none;}</style>");
  } else if (searchPanelStatus === "open") {
    document.write("<style>.files.display-default{display:none;} .search.display-default{display:flex;}</style>");
  } else if (filesPanelStatus === "closed" || searchPanelStatus === "closed") {
    document.write("<style>.files.display-default{display:none;} .search.display-default{display:none;}</style>");
  }
}

function toggleFilesPanel() {
  const filesPanel = document.getElementById("files-panel");
  const searchPanel = document.getElementById("search-panel");

  const currentState = window.getComputedStyle(filesPanel, null).display;
  console.log(currentState);
  if (currentState === "flex") {
    closePanel(filesPanel);
    closePanel(searchPanel);
  } else {
    openPanel(filesPanel);
    closePanel(searchPanel);
  }
}

function toggleSearchPanel() {
  const filesPanel = document.getElementById("files-panel");
  const searchPanel = document.getElementById("search-panel");

  const currentState = window.getComputedStyle(searchPanel, null).display;

  if (currentState === "flex") {
    closePanel(searchPanel);
    closePanel(filesPanel);
  } else {
    openPanel(searchPanel);
    closePanel(filesPanel);
  }
}

function openPanel(panel) {
  panel.classList.add("display-open");
  panel.classList.remove("display-closed");
  panel.classList.remove("display-default");
  window.sessionStorage.setItem(panel.id, "open");
}

function closePanel(panel) {
  panel.classList.add("display-closed");
  panel.classList.remove("display-open");
  panel.classList.remove("display-default");
  window.sessionStorage.setItem(panel.id, "closed");
}
