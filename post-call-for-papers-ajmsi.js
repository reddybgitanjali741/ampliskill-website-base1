// ================== READING PROGRESS ==================
const progressFill = document.getElementById("progressFill");
const article = document.querySelector(".article-body");

function updateProgress() {
  if (!article) return;

  const articleTop = article.offsetTop;
  const articleHeight = article.offsetHeight;
  const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
  const progress = Math.max(0, Math.min(100, (scrolled / articleHeight) * 100));

  if (progressFill) {
    progressFill.style.width = progress + "%";
  }
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ================== TOC ACTIVE ==================
const sections = document.querySelectorAll(".article-body h2[id]");
const tocLinks = document.querySelectorAll(".rail-toc li");

function updateTOC() {
  let activeIdx = 0;

  sections.forEach((s, i) => {
    const rect = s.getBoundingClientRect();
    if (rect.top < 200) activeIdx = i;
  });

  tocLinks.forEach((li, i) => {
    li.classList.toggle("active", i === activeIdx);
  });
}

window.addEventListener("scroll", updateTOC, { passive: true });
