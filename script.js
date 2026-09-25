(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* The theme still works when browser storage is unavailable. */ }

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

  // Run in the head to apply the preference before the page is displayed.
  applyTheme();
  systemTheme.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', preference); } catch { /* Preference applies to this page only. */ }
      applyTheme();
    });
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
