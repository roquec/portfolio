initializeResizer();

window.addEventListener("DOMContentLoaded", setResizer);

let resizerContainer = null;
let resizerElement = null;

function initializeResizer() {
  const storedWidth = window.localStorage.getItem("sidebar-width");
  if (storedWidth) {
    let style = `<style>
        .initial-state #navigation-wrapper { width:${storedWidth}px !important; }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style)
  }
}

function setResizer() {
  resizerContainer = document.getElementById("navigation-wrapper");
  resizerElement = document.getElementById("resizer");

  const storedWidth = window.localStorage.getItem("sidebar-width");
  if (storedWidth) {
    resizerContainer.style.width = storedWidth + "px";
  }

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

  window.localStorage.setItem("sidebar-width", resizerContainer.offsetWidth.toString());
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}
