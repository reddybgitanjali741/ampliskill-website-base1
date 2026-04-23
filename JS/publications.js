
  document.querySelectorAll('.pub-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pub-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.pub-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
