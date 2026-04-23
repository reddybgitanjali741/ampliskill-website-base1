
  // Form submission handling (demo — no backend)
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.style.display = 'none';
    document.getElementById('successMsg').classList.add('show');
    document.getElementById('successMsg').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
