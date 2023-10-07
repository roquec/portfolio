initializeFocus();

window.addEventListener("DOMContentLoaded", updateFocus);
window.addEventListener("pagehide", saveFocus);

function saveFocus() {
  const focusedElement = document.activeElement.parentElement;
  if (focusedElement.classList.contains("file-item")) {
    window.sessionStorage.setItem("file-item-focus", focusedElement.id);
  } else {
    window.sessionStorage.removeItem("file-item-focus");
  }
}

function updateFocus() {
  const focusItemId = window.sessionStorage.getItem("file-item-focus");
  if (focusItemId) {
    document.getElementById(focusItemId).children[0].focus();
  }

  window.sessionStorage.removeItem("file-item-focus");
}

function initializeFocus() {
  const focusItemId = window.sessionStorage.getItem("file-item-focus");
  if (focusItemId) {
    let style = `<style>
    .initial-state #${focusItemId} {
      background-color: var(--color-file-item-active-background) !important;
      color: var(--color-file-item-active-foreground) !important;
      outline: 0.0625rem solid var(--color-file-item-active-border) !important;
    }</style>`;

    document.head.insertAdjacentHTML("beforeend", style)
  }
}
