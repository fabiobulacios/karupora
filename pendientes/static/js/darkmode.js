(function () {
  var btn = document.getElementById('dark-mode-toggle');
  var body = document.body;

  function applyTheme(dark) {
    if (dark) {
      body.classList.add('dark-mode');
      btn.textContent = '☀️';
      btn.title = 'Modo claro';
    } else {
      body.classList.remove('dark-mode');
      btn.textContent = '🌙';
      btn.title = 'Modo oscuro';
    }
  }

  var saved = localStorage.getItem('karupora-dark-mode');
  applyTheme(saved === 'true');

  btn.addEventListener('click', function () {
    var isDark = body.classList.contains('dark-mode');
    localStorage.setItem('karupora-dark-mode', String(!isDark));
    applyTheme(!isDark);
  });
})();
