var setClient = function () {
  var doc = document.documentElement;
  var clientWidth = doc.clientWidth;
  doc.style.fontSize = 100 * clientWidth / 750 + 'px';
}
window.changeTheme = function () {
  document.getElementById('profile').setAttribute('href', '../css/main-light.css');
  window.globalThemeType = 'light';
}
setClient()
window.addEventListener('resize', setClient, false)