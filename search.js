(() => {
  // Mantenha este índice atualizado ao publicar páginas ou materiais.
  const entries = [
    { title: 'Sobre mim', url: 'index.html', description: 'Mateus Jardim Benvenuti · Estatística e Ciência de Dados · UFSCar' },
    { title: 'Pesquisa', url: 'pesquisa.html', description: 'Iniciação científica CNPq · Grafos genótipo-fenótipo, Florestas Aleatórias e seleção de estabilidade · Thiago Rodrigo Ramos' },
    { title: 'Projetos', url: 'projetos.html', description: 'Aplicações e código' },
    { title: 'Promoções para marketplaces', url: 'projetos.html#promocoes-title', description: 'Python, Streamlit, Pandas, OpenPyXL · Planilhas Excel e CSV, produtos, SKU e preços' },
    { title: 'Notas de estudo', url: 'notas.html', description: 'Página de notas e materiais de estudo' },
    { title: 'Apresentações', url: 'apresentacoes.html', description: 'Página de apresentações acadêmicas' },
    { title: 'Trajetória', url: 'trajetoria.html', description: 'Graduação, PET Estatística e iniciação científica' },
    { title: 'Contato', url: 'contato.html', description: 'E-mail e contato acadêmico' },
  ];
  const trigger = document.querySelector('.search-toggle');
  if (!trigger || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.id = 'site-search';
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-labelledby', 'search-title');
  dialog.innerHTML = `
    <div class="search-heading">
      <h2 id="search-title">Buscar no site</h2>
      <button type="button">Fechar</button>
    </div>
    <label for="search-input">Página ou assunto</label>
    <input id="search-input" type="search" autocomplete="off" placeholder="Ex.: grafos, projetos, PET">
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
    status.textContent = matches.length ? `${matches.length} resultado${matches.length === 1 ? '' : 's'}.` : 'Nenhum resultado. Tente outro termo.';
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
