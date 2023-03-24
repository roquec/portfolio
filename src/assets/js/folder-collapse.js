initializeFolders();

function initializeFolders() {
  const folders = document.getElementsByClassName("folder");
  for (let i = 0; i < folders.length; i++) {
    if (!window.sessionStorage.getItem(folders[i].id)) {
      window.sessionStorage.setItem(folders[i].id, "open");
    }
    setFolderState(folders[i]);
  }
}

function toggleFolder(folderId) {
  const folder = document.getElementById(folderId);
  let folderState = window.sessionStorage.getItem(folder.id) ?? "open";
  if (folderState === "collapsed") {
    window.sessionStorage.setItem(folder.id, "open");
  } else {
    window.sessionStorage.setItem(folder.id, "collapsed");
  }
  setFolderState(folder);
}

function setFolderState(folder) {
  let folderState = window.sessionStorage.getItem(folder.id) ?? "open";
  if (folderState === "collapsed") {
    folder.classList.add("collapsed");
  } else {
    folder.classList.remove("collapsed");
  }
}
