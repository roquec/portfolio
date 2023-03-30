window.addEventListener("DOMContentLoaded", setResizer);

let resizerContainer = null;
let resizerElement = null;

function setResizer() {
  resizerContainer = document.getElementById("navigation-wrapper");
  resizerElement = document.getElementById("resizer");
  resizerElement.addEventListener("mousedown", onResizerClick);
}

function onResizerClick(e) {
  document.addEventListener("mouseup", onResizerRelease);
  document.addEventListener("mousemove", onResizerDrag);
  resizerElement.style.opacity = "1";
  pauseEvent(e);
}

function onResizerDrag(e) {
  const sidebarWidth = e.clientX - resizerContainer.offsetLeft;
  resizerContainer.style.width = sidebarWidth + "px";
  pauseEvent(e);
}

function onResizerRelease(e) {
  document.removeEventListener("mousemove", onResizerDrag);
  document.removeEventListener("mouseup", onResizerRelease);
  resizerElement.style.opacity = null;
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}
