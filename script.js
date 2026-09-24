(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* O tema continua funcionando se o armazenamento estiver bloqueado. */ }

  function applyTheme() {
    const dark = preference ? preference === 'dark' : systemTheme.matches;
    root.dataset.theme = dark ? 'dark' : 'light';
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(dark));
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#191c20' : '#ffffff');
  }

  // Executado no cabeçalho para aplicar a preferência antes de exibir a página.
  applyTheme();
  systemTheme.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', preference); } catch { /* Preferência apenas nesta página. */ }
      applyTheme();
    });
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
