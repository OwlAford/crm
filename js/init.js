var setClient = function () {
  var doc = document.documentElement;
  var clientWidth = doc.clientWidth;
  doc.style.fontSize = 100 * clientWidth / 750 + 'px';
}

window.globalThemeType = "dark";

window.changeTheme = function (notLight) {
  var cssfile = document.getElementById('profile');
  if (notLight) {
    cssfile.setAttribute('href', '../css/main.css');
    window.globalThemeType = 'dark';
  } else {
    cssfile.setAttribute('href', '../css/main-light.css');
    window.globalThemeType = 'light';
  }
}

setClient()
window.addEventListener('resize', setClient, false)