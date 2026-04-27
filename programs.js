// Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Handle #customized link
  if (window.location.hash === '#customized') {
    document.querySelector('[data-tab="customized"]').click();
  }

  // Filter chips
  const filterChips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('#cards-grid .card');
  const noResults = document.getElementById('no-results');
  const cardsGrid = document.getElementById('cards-grid');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.textContent.trim().toLowerCase();

      const map = {
        'all programs': 'all',
        'leadership': 'leadership',
        'strategy': 'strategy',
        'innovation': 'innovation',
        'governance': 'governance',
        'residential': 'residential',
        'non-residential': 'non-residential'
      };
      const keyword = map[filter] || filter;

      let visibleCount = 0;

      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase();
        if (keyword === 'all' || categories.includes(keyword)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (visibleCount === 0) {
        cardsGrid.style.display = 'none';
        noResults.style.display = 'flex';
      } else {
        cardsGrid.style.display = '';
        noResults.style.display = 'none';
      }
    });
  });