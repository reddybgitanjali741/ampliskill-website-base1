// ── Tab Switching ──────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Handle #customized deep-link (EXISTING — DO NOT REMOVE)
if (window.location.hash === "#customized") {
  const customBtn = document.querySelector('[data-tab="customized"]');
  if (customBtn) customBtn.click();
}

// ================== NEW FIX (HASH CHANGE HANDLER) ==================
window.addEventListener("hashchange", () => {
  const id = window.location.hash.replace("#", "");
  const tabBtn = document.querySelector(`[data-tab="${id}"]`);

  if (tabBtn) {
    tabBtn.click();

    // smooth scroll (optional but recommended)
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
});
// ==================================================================

// ── Filter Chips (Strict Exact-Match) ─────────────────────────
const filterChips = document.querySelectorAll(".filter-chip");
const cards = document.querySelectorAll("#cards-grid .card");
const noResults = document.getElementById("no-results");
const cardsGrid = document.getElementById("cards-grid");

function chipToKeyword(label) {
  const map = {
    "all programs": "all",
    leadership: "leadership",
    strategy: "strategy",
    innovation: "innovation",
    governance: "governance",
    residential: "residential",
    "non-residential": "non-residential",
  };
  return map[label.trim().toLowerCase()] ?? label.trim().toLowerCase();
}

function cardMatchesKeyword(card, keyword) {
  if (keyword === "all") return true;
  const raw = (card.getAttribute("data-category") || "").toLowerCase();
  const tokens = raw.split(/\s+/).filter(Boolean);
  return tokens.includes(keyword);
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const keyword = chipToKeyword(chip.textContent);
    let visibleCount = 0;

    cards.forEach((card) => {
      const show = cardMatchesKeyword(card, keyword);
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (visibleCount === 0) {
      cardsGrid.style.display = "none";
      noResults.style.display = "flex";
    } else {
      cardsGrid.style.display = "";
      noResults.style.display = "none";
    }
  });
});

// ── Reset Filter Button ───────────────────────────────────────
const resetBtn = document.getElementById("reset-filter-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const allChip = document.querySelector(
      '.filter-chip[data-keyword="all"], .filter-chip:first-child',
    );
    if (allChip) allChip.click();
  });
}
