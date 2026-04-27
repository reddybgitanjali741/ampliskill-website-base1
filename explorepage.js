/* ============================================================
   AmpliSkill — Hamburger Menu (Mobile & Tablet ≤ 1100px)
   ============================================================ */

(function () {
  /* ── Build the mobile-menu drawer ────────────────────────── */
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.innerHTML = `
    <a href="programs.html">Programs</a>
    <a href="programs.html#customized">Customised Programs</a>
    <a href="consulting.html">Consulting</a>
    <a href="publications.html">Publications</a>
    <a href="journal.html">AJMSI Journal</a>
    <a href="about.html">About</a>
    <a href="team.html">Team</a>
    <a href="events.html">Events</a>
    <a href="publications.html">Thought Leadership</a>
    <a href="publications.html#blogs">Articles</a>
    <a href="contact.html">Contact</a>
    <a href="programs.html" class="mobile-cta">Apply to a Program</a>
  `;

  /* Insert drawer right after <header> */
  const header = document.querySelector(".site-header");
  if (header) {
    header.insertAdjacentElement("afterend", mobileMenu);
  }

  /* ── Wire up the toggle button ───────────────────────────── */
  const toggle = document.querySelector(".mobile-toggle");
  const icon = toggle ? toggle.querySelector("i") : null;
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    if (icon) {
      icon.classList.replace("fa-bars", "fa-xmark");
    }
    document.body.style.overflow = "hidden"; // prevent background scroll
  }

  function closeMenu() {
    isOpen = false;
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    if (icon) {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
    document.body.style.overflow = "";
  }

  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "mobile-menu");

    toggle.addEventListener("click", () => {
      isOpen ? closeMenu() : openMenu();
    });
  }

  /* ── Close on backdrop click ─────────────────────────────── */
  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !mobileMenu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ── Close on Escape key ─────────────────────────────────── */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ── Close when a menu link is tapped ───────────────────── */
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ── Close if viewport grows past breakpoint (tablet→desktop) */
  const mq = window.matchMedia("(min-width: 1101px)");
  mq.addEventListener("change", (e) => {
    if (e.matches && isOpen) closeMenu();
  });
})();
