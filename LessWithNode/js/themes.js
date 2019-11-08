function toggleTheme() {
  document.querySelectorAll("link[rel='stylesheet']").forEach(stylesheet => {
    stylesheet.disabled = !stylesheet.disabled;
  });
}
