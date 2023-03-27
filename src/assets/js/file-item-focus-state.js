window.addEventListener("load", updateFocus);
window.addEventListener("beforeunload", saveFocus);

function saveFocus() {
  const fileItemElements = document.getElementsByClassName("file-item");
  let focusIndex = -1;
  for (let i = 0; i < fileItemElements.length; i++) {
    if (document.activeElement === fileItemElements[i].children[0]) {
      focusIndex = i;
    }
  }
  window.sessionStorage.setItem("file-item-focus-index", focusIndex.toString());
}

function updateFocus() {
  const focusIndex = window.sessionStorage.getItem("file-item-focus-index") ?? -1;
  const fileItemElements = document.getElementsByClassName("file-item");
  if (focusIndex > -1) {
    fileItemElements[focusIndex].children[0].focus();
  }
  window.sessionStorage.setItem("file-item-focus-index", "-1");
}
