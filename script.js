const url = window.location.href;
const title = document.title;

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

// ─── Carousel ────────────────────────────────────────────────────────────────
// Hide carousel tracks immediately so they never flash all-items-visible.
// We do this inline before DOMContentLoaded so it takes effect as soon as the
// elements are parsed.
(function hideCarouselsEarly() {
  // Inject a style tag that hides both tracks until we're ready.
  const s = document.createElement("style");
  s.id = "carousel-init-hide";
  s.textContent = `
    .h3-carousel-track,
    .meta-row-carousel-track {
      visibility: hidden;
      opacity: 0;
    }
  `;
  // Append to <head> if available, otherwise to <html>
  (document.head || document.documentElement).appendChild(s);
})();

function initVerticalCarousel(opts) {
  const {
    wrapSel,
    trackSel,
    slideSel,
    wrapProp,
    slideProp,
    animName,
    duration,
    easing,
    paddingPx,
  } = opts;

  const wrap = document.querySelector(wrapSel);
  const track = document.querySelector(trackSel);
  if (!wrap || !track) return;

  const slides = Array.from(track.querySelectorAll(slideSel));
  const total = slides.length;
  const real = total - 1;

  // Reset any previous animation so getBoundingClientRect is accurate
  track.style.animation = "none";
  track.style.transform = "none";
  slides.forEach((s) => {
    s.style.height = "auto";
    s.style.flexBasis = "auto";
  });

  // Force a reflow so the browser recalculates layout with real font metrics
  void track.offsetHeight;

  const heights = slides.map((s) => s.getBoundingClientRect().height);
  const maxH = Math.max(...heights) + (paddingPx || 0);
  const slotPx = Math.ceil(maxH);

  wrap.style.setProperty(wrapProp, slotPx + "px");
  wrap.style.height = slotPx + "px";

  slides.forEach((s) => {
    s.style.height = slotPx + "px";
    s.style.flexBasis = slotPx + "px";
    s.style.setProperty(slideProp, slotPx + "px");
  });

  const holdPct = 14;
  const transPct = 4;
  const perSlide = holdPct + transPct;

  let kf = `@keyframes ${animName} {\n`;
  kf += `  0% { transform: translateY(0px); }\n`;

  for (let i = 0; i < real; i++) {
    const holdStart = i * perSlide;
    const holdEnd = holdStart + holdPct;
    const transEnd = holdEnd + transPct;
    const yStart = -(i * slotPx);
    const yEnd = -((i + 1) * slotPx);

    kf += `  ${holdStart.toFixed(3)}% { transform: translateY(${yStart}px); }\n`;
    kf += `  ${holdEnd.toFixed(3)}%   { transform: translateY(${yStart}px); }\n`;
    kf += `  ${transEnd.toFixed(3)}%  { transform: translateY(${yEnd}px); }\n`;
  }

  const snapAt = real * perSlide;
  const finalY = -(real * slotPx);
  kf += `  ${snapAt.toFixed(3)}%   { transform: translateY(${finalY}px); }\n`;
  kf += `  99.99%               { transform: translateY(${finalY}px); }\n`;
  kf += `  100%                 { transform: translateY(0px); }\n`;
  kf += `}\n`;

  const styleId = "carousel-keyframes-" + animName;
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = kf;

  track.style.animation = `${animName} ${duration} ${easing} infinite`;
}

function initAllCarousels() {
  initVerticalCarousel({
    wrapSel: ".h3-carousel-wrap",
    trackSel: ".h3-carousel-track",
    slideSel: "h3",
    wrapProp: "--slide-h",
    slideProp: "--slide-h",
    animName: "h3CarouselSlideUp",
    duration: "12.5s",
    easing: "cubic-bezier(0.4,0,0.2,1)",
    paddingPx: 12,
  });

  initVerticalCarousel({
    wrapSel: ".meta-row-carousel-wrap",
    trackSel: ".meta-row-carousel-track",
    slideSel: ".meta-row",
    wrapProp: "--meta-slide-h",
    slideProp: "--meta-slide-h",
    animName: "metaRowSlideUp",
    duration: "12.5s",
    easing: "cubic-bezier(0.4,0,0.2,1)",
    paddingPx: 8,
  });
}

/**
 * Reveal the carousel tracks with a short fade-in after dimensions are set.
 * This prevents the "all items visible" flash on first load.
 */
function revealCarousels() {
  const tracks = document.querySelectorAll(
    ".h3-carousel-track, .meta-row-carousel-track",
  );
  tracks.forEach((t) => {
    t.style.transition = "opacity 0.25s ease";
    t.style.visibility = "visible";
    t.style.opacity = "1";
  });

  // Remove the early-hide style tag — no longer needed
  const hideStyle = document.getElementById("carousel-init-hide");
  if (hideStyle) hideStyle.remove();
}

/**
 * Run init + reveal. Accepts an optional extra delay (ms) for fallbacks.
 */
function runCarousels(extraDelayMs) {
  if (extraDelayMs) {
    setTimeout(() => {
      initAllCarousels();
      revealCarousels();
    }, extraDelayMs);
  } else {
    initAllCarousels();
    revealCarousels();
  }
}

// Resize handler — recalculate on viewport change (debounced)
let _carouselResizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(_carouselResizeTimer);
  _carouselResizeTimer = setTimeout(() => {
    // Hide briefly, recalculate, then reveal again
    document
      .querySelectorAll(".h3-carousel-track, .meta-row-carousel-track")
      .forEach((t) => {
        t.style.transition = "none";
        t.style.opacity = "0";
        t.style.visibility = "hidden";
      });
    setTimeout(() => {
      initAllCarousels();
      revealCarousels();
    }, 50);
  }, 220);
});

// ─── Primary initialization sequence ─────────────────────────────────────────
// Strategy:
//  1. Wait for DOMContentLoaded so elements exist.
//  2. Wait for document.fonts.ready so Google Fonts metrics are available.
//  3. Wait for window load (images etc.) to ensure final layout is stable.
//  4. Use requestAnimationFrame twice to ensure the browser has painted at
//     least one frame with correct metrics before we read getBoundingClientRect.
//  5. On mobile (≤425px), add an extra 150ms buffer for slower render pipelines.

document.addEventListener("DOMContentLoaded", () => {
  // ── Non-carousel UI setup (runs immediately) ──────────────────────────────
  const toggleBtn = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (toggleBtn && mobileMenu) {
    const barsIcon = toggleBtn.querySelector(".fa-bars");
    const xmarkIcon = toggleBtn.querySelector(".fa-xmark");

    function setIconState(isOpen) {
      if (barsIcon) barsIcon.style.display = isOpen ? "none" : "inline-block";
      if (xmarkIcon) xmarkIcon.style.display = isOpen ? "inline-block" : "none";
    }

    setIconState(false);

    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      toggleBtn.classList.toggle("is-open", isOpen);
      toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");
      setIconState(isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggleBtn.classList.remove("is-open");
        toggleBtn.setAttribute("aria-label", "Menu");
        setIconState(false);
      });
    });
  }

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href === path) a.classList.add("active");
  });

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

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => item.classList.toggle("open"));
  });

  document.querySelectorAll(".filter-row").forEach((row) => {
    const chips = row.querySelectorAll(".filter-chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

  document.querySelectorAll(".share-linkedin").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.open("https://www.linkedin.com/company/ampliskill/", "_blank");
    });
  });

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

  // ── Carousel initialization ───────────────────────────────────────────────
  // We need both fonts AND images to be settled before reading layout metrics.
  const isMobile = window.innerWidth <= 425;

  /**
   * After fonts are confirmed ready, wait for the window load event
   * (images, etc.) then do two rAF ticks so the browser has definitely
   * painted before we measure heights.
   */
  function scheduleCarouselAfterLoad() {
    function doInit() {
      // Two rAF ticks: first ensures styles are applied, second ensures paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Extra buffer on small mobile screens for slower render pipelines
          const delay = isMobile ? 150 : 0;
          runCarousels(delay);
        });
      });
    }

    if (document.readyState === "complete") {
      // window.load already fired (e.g. script is deferred / async)
      doInit();
    } else {
      window.addEventListener("load", doInit, { once: true });

      // Safety net: if load doesn't fire within 4 s (e.g. slow/blocked images)
      // init anyway so the carousel isn't permanently hidden.
      setTimeout(() => {
        // Only run if carousel tracks are still hidden
        const track = document.querySelector(".h3-carousel-track");
        if (track && track.style.opacity !== "1") {
          doInit();
        }
      }, 4000);
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleCarouselAfterLoad);
  } else {
    // Fonts API not available — fall back to load event only
    scheduleCarouselAfterLoad();
  }
});
