(() => {
  // Update this index when publishing pages or materials.
  const entries = [
    { title: 'About me', url: 'index.html', description: 'Mateus Jardim Benvenuti · Statistics and Data Science · UFSCar' },
    { title: 'Research', url: 'research.html', description: 'CNPq undergraduate research · Genotype–phenotype graphs, Random Forests and stability selection · Thiago Rodrigo Ramos' },
    { title: 'Projects', url: 'projects.html', description: 'Applications and code' },
    { title: 'Marketplace Promotions', url: 'projects.html#promotions-title', description: 'Python, Streamlit, Pandas, OpenPyXL · Excel and CSV spreadsheets, products, SKU and prices' },
    { title: 'Study Notes', url: 'notes.html', description: 'Notes and study materials' },
    { title: 'Statistical Programming', url: 'notes.html#statistical-programming-title', description: 'Lecture notes · Course taught by Thiago Rodrigo Ramos' },
    { title: 'Presentations', url: 'presentations.html', description: 'Academic presentations' },
    { title: 'Introduction to pandas', url: 'presentations.html#pandas-title', description: 'pandas, NumPy and Matplotlib · PET Statistics at UFSCar' },
    { title: 'Background', url: 'background.html', description: 'Undergraduate studies, PET Statistics and undergraduate research' },
    { title: 'Contact', url: 'contact.html', description: 'Email and academic contact information' },
  ];
  const trigger = document.querySelector('.search-toggle');
  if (!trigger || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.id = 'site-search';
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-labelledby', 'search-title');
  dialog.innerHTML = `
    <div class="search-heading">
      <h2 id="search-title">Search this site</h2>
      <button type="button">Close</button>
    </div>
    <label for="search-input">Page or topic</label>
    <input id="search-input" type="search" autocomplete="off" placeholder="e.g. graphs, projects, PET">
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
    status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'}.` : 'No results. Try another term.';
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
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });
})();
