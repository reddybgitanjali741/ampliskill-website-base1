document.querySelectorAll(".pub-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".pub-tab")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".pub-panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

function handlePubHash() {
  const id = window.location.hash.replace("#", "");
  const btn = document.querySelector(`.pub-tab[data-tab="${id}"]`);

  if (btn) {
    btn.click();

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
}

// page load
handlePubHash();

// same page navigation
window.addEventListener("hashchange", handlePubHash);
