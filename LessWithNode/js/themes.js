function setTheme(theme) {
  var selectedThemeStylesheet = document.querySelectorAll(
    `link[title="${theme}"]`
  )[0];
  if (selectedThemeStylesheet.disabled) {
    var allStylesheet = document.querySelectorAll(`link[rel="stylesheet"]`);
    allStylesheet.forEach(stylesheet => {
      stylesheet.disabled = true;
    });
    selectedThemeStylesheet.disabled = false;
  }
}
