window.addEventListener("DOMContentLoaded", setResizer);

let container = null;
let isResizing = false;

function setResizer() {
  container = document.getElementById("navigation-wrapper");

  document.getElementById("resizer").addEventListener("mousedown", function (e) {
    isResizing = true;
    pauseEvent(e);
  });
}

document.addEventListener("mousemove", function (e) {
  if (!isResizing) return;

  const sidebarWidth = e.clientX - container.offsetLeft;
  container.style.width = sidebarWidth + "px";
  pauseEvent(e);
});

document.addEventListener("mouseup", function (e) {
  isResizing = false;
});

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}
