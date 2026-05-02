// Active TOC highlight on scroll
(function () {
  const sections = document.querySelectorAll(".policy-section[id]");
  const tocLinks = document.querySelectorAll(".policy-toc a");

  function onScroll() {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 140) current = sec.id;
    });
    tocLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
