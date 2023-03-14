// Set theme on load
setTheme(getTheme());

function switchTheme() {
  if (getTheme() === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

function setTheme(theme) {
  window.localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

function getTheme() {
  return localStorage.getItem("theme") ?? "dark";
}
