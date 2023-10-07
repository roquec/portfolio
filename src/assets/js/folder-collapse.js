initializeFolders();

window.addEventListener("DOMContentLoaded", updateFolders);

function initializeFolders() {
  if (!window.sessionStorage.getItem("collapsed-folders")) {
    window.sessionStorage.setItem("collapsed-folders", "[\"projects-folder\",\"articles-folder\",\"drawings-folder\"]");
  }

  const collapsedFolders = getCollapsedFolders();

  if (window.location.href.includes("/projects/") && collapsedFolders.indexOf("projects-folder") > -1) {
    collapsedFolders.splice(collapsedFolders.indexOf("projects-folder"), 1);
  } else if (window.location.href.includes("/articles/") && collapsedFolders.indexOf("articles-folder") > -1) {
    collapsedFolders.splice(collapsedFolders.indexOf("articles-folder"), 1);
  } else if (window.location.href.includes("/drawings/") && collapsedFolders.indexOf("drawings-folder") > -1) {
    collapsedFolders.splice(collapsedFolders.indexOf("drawings-folder"), 1);
  }

  window.sessionStorage.setItem("collapsed-folders", JSON.stringify(collapsedFolders));

  setInitialFolderStyles(collapsedFolders);
}

function toggleFolder(folderId) {
  const collapsedFolders = getCollapsedFolders();

  const index = collapsedFolders.indexOf(folderId);

  if (index > -1) {
    collapsedFolders.splice(index, 1);
    openFolder(folderId);
  } else {
    collapsedFolders.push(folderId);
    collapseFolder(folderId);
  }

  window.sessionStorage.setItem("collapsed-folders", JSON.stringify(collapsedFolders));

}

function updateFolders() {
  const collapsedFolders = getCollapsedFolders();
  for (let i = 0; i < collapsedFolders.length; i++) {
    collapseFolder(collapsedFolders[i]);
  }
}

function collapseFolder(folderId) {
  document.getElementById(folderId).classList.add("collapsed");
}

function openFolder(folderId) {
  document.getElementById(folderId).classList.remove("collapsed");
}

function setInitialFolderStyles(folderIds) {
  let style = "<style>";
  for (let i = 0; i < folderIds.length; i++) {
    style = style + `.initial-state #${folderIds[i]} .icon-chevron-down`;
    if (i < folderIds.length - 1) {
      style = style + ", ";
    }
  }
  style = style + " { display: none !important; } "

  for (let i = 0; i < folderIds.length; i++) {
    style = style + `.initial-state #${folderIds[i]} .icon-chevron-right`;
    if (i < folderIds.length - 1) {
      style = style + ", ";
    }
  }
  style = style + " { display: block !important; } "

  for (let i = 0; i < folderIds.length; i++) {
    style = style + `.initial-state #${folderIds[i]} + .folder`;
    if (i < folderIds.length - 1) {
      style = style + ", ";
    }
  }
  style = style + " { display: none !important; } "
  style = style + "</style>";

  document.head.insertAdjacentHTML("beforeend", style)
}

function getCollapsedFolders() {
  return JSON.parse(window.sessionStorage.getItem("collapsed-folders") ?? "[]");
}
