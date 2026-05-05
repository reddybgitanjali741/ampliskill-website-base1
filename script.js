const url = window.location.href;
const title = document.title;

// TOAST
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-check"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle (global — handles bars ↔ X icon on all pages)
  const toggleBtn = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (toggleBtn && mobileMenu) {
    const barsIcon = toggleBtn.querySelector(".fa-bars");
    const xmarkIcon = toggleBtn.querySelector(".fa-xmark");

    // FIX: explicitly set initial icon state via JS so behaviour is
    // independent of CSS load order or CDN (Font Awesome) timing.
    // This is the root cause of the X showing by default on all pages
    // except Contact — styles.css never declares display for .fa-bars,
    // so when Font Awesome CDN loads late the icon states are unpredictable.
    function setIconState(isOpen) {
      if (barsIcon) barsIcon.style.display = isOpen ? "none" : "inline-block";
      if (xmarkIcon) xmarkIcon.style.display = isOpen ? "inline-block" : "none";
    }

    // Set correct default state immediately on page load
    setIconState(false);

    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      toggleBtn.classList.toggle("is-open", isOpen);
      toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");
      setIconState(isOpen);
    });

    // Close when a nav link inside the menu is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggleBtn.classList.remove("is-open");
        toggleBtn.setAttribute("aria-label", "Menu");
        setIconState(false);
      });
    });
  }

  // Highlight current page in nav
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href === path) a.classList.add("active");
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => item.classList.toggle("open"));
  });

  // Filter chips (purely visual for demo)
  document.querySelectorAll(".filter-row").forEach((row) => {
    const chips = row.querySelectorAll(".filter-chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

  // LINKEDIN
  document.querySelectorAll(".share-linkedin").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.open("https://www.linkedin.com/company/ampliskill/", "_blank");
    });
  });

  // X (TWITTER)
  document.querySelectorAll(".share-x").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    });
  });

  document.querySelectorAll(".share-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          showToast("Link copied");
        })
        .catch(() => {
          showToast("Copy failed – please copy the URL manually");
        });
    });
  });
});
