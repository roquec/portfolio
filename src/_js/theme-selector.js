// Set theme on load
setTheme(getTheme());

function switchTheme() {
  // Disable transitions to avoid delayed color changes
  document.body.classList.add("no-transition");

  // Update theme
  if (getTheme() === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }

  // Trigger CSS update while transitions are disabled
  document.body.offsetHeight;

  // Re-enable transitions after theme change
  document.body.classList.remove("no-transition");
}

function setTheme(theme) {
  window.localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

function getTheme() {
  return localStorage.getItem("theme") ?? "dark";
}
