function switchTheme() {
  let themeToggle = document.getElementById('theme-toggle');

  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
