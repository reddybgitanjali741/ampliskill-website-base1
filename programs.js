/* ============================================================
   programs.js — AmpliSkill Programs Page
   Improvements:
   - Strict exact-match category filtering (no partial .includes())
   - Filter chip state management
   - Tab switching with hash support
   ============================================================ */

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

// Handle #customized deep-link
if (window.location.hash === "#customized") {
  const customBtn = document.querySelector('[data-tab="customized"]');
  if (customBtn) customBtn.click();
}

// ── Filter Chips (Strict Exact-Match) ─────────────────────────
const filterChips = document.querySelectorAll(".filter-chip");
const cards = document.querySelectorAll("#cards-grid .card");
const noResults = document.getElementById("no-results");
const cardsGrid = document.getElementById("cards-grid");

/**
 * Normalise a filter chip label into a lookup keyword.
 * "All programs" → "all"
 * "Non-residential" → "non-residential"
 * Anything else → lowercase, trimmed
 */
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

/**
 * Strict match: split data-category by spaces, compare each token exactly.
 * "leadership residential".split(' ') → ['leadership', 'residential']
 * keyword 'residential' → match ✓
 * keyword 'leadership' on a card tagged 'leadership residential' → match ✓
 * keyword 'residential' on a card tagged 'non-residential' → NO match ✓
 */
function cardMatchesKeyword(card, keyword) {
  if (keyword === "all") return true;
  const raw = (card.getAttribute("data-category") || "").toLowerCase();
  const tokens = raw.split(/\s+/).filter(Boolean); // exact token list
  return tokens.includes(keyword);
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    // Update active chip state
    filterChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const keyword = chipToKeyword(chip.textContent);
    let visibleCount = 0;

    cards.forEach((card) => {
      const show = cardMatchesKeyword(card, keyword);
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    // Toggle empty state
    if (visibleCount === 0) {
      cardsGrid.style.display = "none";
      noResults.style.display = "flex";
    } else {
      cardsGrid.style.display = "";
      noResults.style.display = "none";
    }
  });
});

// ── "View all programs" button inside no-results ───────────────
const resetBtn = document.getElementById("reset-filter-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const allChip = document.querySelector(
      '.filter-chip[data-keyword="all"], .filter-chip:first-child',
    );
    if (allChip) allChip.click();
  });
}
