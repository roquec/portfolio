window.addEventListener("load", removeInitialState);

function removeInitialState() {
  setTimeout(test, 1000)
}

function test() {
  document.body.classList.remove("initial-state");
}
