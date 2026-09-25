(() => {
  const language = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
  const data = window.siteSearch?.[language];
  if (!data) return;
  const { entries, ui } = data;
  const trigger = document.querySelector('.search-toggle');
  if (!trigger || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.id = 'site-search';
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-labelledby', 'search-title');
  dialog.innerHTML = `
    <div class="search-heading">
      <h2 id="search-title">${ui.title}</h2>
      <button type="button">${ui.close}</button>
    </div>
    <label for="search-input">${ui.label}</label>
    <input id="search-input" type="search" autocomplete="off" placeholder="${ui.placeholder}">
    <p class="search-status" role="status" aria-live="polite"></p>
    <ul class="search-results"></ul>`;
  document.body.append(dialog);
  const input = dialog.querySelector('input');
  const results = dialog.querySelector('ul');
  const status = dialog.querySelector('.search-status');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  function render() {
    const words = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    const matches = entries.filter(entry => words.every(word => normalize(`${entry.title} ${entry.description}`).includes(word)));
    results.replaceChildren();
    for (const entry of matches) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = entry.url;
      link.textContent = entry.title;
      link.addEventListener('click', () => dialog.close());
      const description = document.createElement('span');
      description.textContent = entry.description;
      link.append(description);
      item.append(link);
      results.append(item);
    }
    status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? ui.one : ui.many}.` : ui.empty;
  }
  function open() {
    if (dialog.open) return;
    input.value = '';
    render();
    dialog.showModal();
    input.focus();
  }
  trigger.hidden = false;
  trigger.addEventListener('click', open);
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  input.addEventListener('input', render);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      results.querySelector('a')?.click();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      dialog.close();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });
})();
