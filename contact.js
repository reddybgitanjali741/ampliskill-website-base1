/* ================================================================
   contact.js — Form validation + submission (demo — no backend)
   ================================================================ */

(function () {
  "use strict";

  /* ── Helpers ── */
  const $ = (id) => document.getElementById(id);
  const ALPHA_RE = /^[A-Za-z\s\-']+$/; // letters, spaces, hyphens, apostrophes
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple RFC-like check

  function setError(fieldId, errId, msg) {
    const field = $(fieldId);
    const err = $(errId);
    if (!field || !err) return;
    field.classList.toggle("has-error", !!msg);
    err.textContent = msg || "";
  }

  function clearError(fieldId, errId) {
    setError(fieldId, errId, "");
  }

  /* ── Success popup ── */
  function showSuccessPopup() {
    const overlay = $("successPopupOverlay");
    if (!overlay) return;
    overlay.classList.add("show");
    // close on overlay click (outside popup)
    overlay.addEventListener("click", function handler(e) {
      if (e.target === overlay) {
        overlay.classList.remove("show");
        overlay.removeEventListener("click", handler);
      }
    });
  }

  /* ── Live validation (clear errors as the user corrects) ── */
  function attachLiveValidation() {
    /* Full name — alphabets only */
    const nameInput = $("inp-name");
    if (nameInput) {
      nameInput.addEventListener("input", () => {
        const v = nameInput.value.trim();
        if (!v) return clearError("field-name", "err-name");
        if (!ALPHA_RE.test(v)) {
          setError(
            "field-name",
            "err-name",
            "Only letters, spaces, hyphens and apostrophes are allowed.",
          );
        } else {
          clearError("field-name", "err-name");
        }
      });
      nameInput.addEventListener("keypress", (e) => {
        if (!/[A-Za-z\s\-']/.test(e.key)) e.preventDefault();
      });
    }

    /* Work email */
    const emailInput = $("inp-email");
    if (emailInput) {
      emailInput.addEventListener("input", () => {
        const v = emailInput.value.trim();
        if (!v) return clearError("field-email", "err-email");
        if (!EMAIL_RE.test(v)) {
          setError(
            "field-email",
            "err-email",
            "Please enter a valid email address (e.g. you@company.com).",
          );
        } else {
          clearError("field-email", "err-email");
        }
      });
    }

    /* Organization — alphabets only (optional, validate if filled) */
    const orgInput = $("inp-org");
    if (orgInput) {
      orgInput.addEventListener("input", () => {
        const v = orgInput.value.trim();
        if (!v) return clearError("field-org", "err-org");
        if (!ALPHA_RE.test(v)) {
          setError(
            "field-org",
            "err-org",
            "Only letters and spaces are allowed.",
          );
        } else {
          clearError("field-org", "err-org");
        }
      });
      orgInput.addEventListener("keypress", (e) => {
        if (!/[A-Za-z\s\-']/.test(e.key)) e.preventDefault();
      });
    }

    /* Role — alphabets only (optional, validate if filled) */
    const roleInput = $("inp-role");
    if (roleInput) {
      roleInput.addEventListener("input", () => {
        const v = roleInput.value.trim();
        if (!v) return clearError("field-role", "err-role");
        if (!ALPHA_RE.test(v)) {
          setError(
            "field-role",
            "err-role",
            "Only letters and spaces are allowed.",
          );
        } else {
          clearError("field-role", "err-role");
        }
      });
      roleInput.addEventListener("keypress", (e) => {
        if (!/[A-Za-z\s\-']/.test(e.key)) e.preventDefault();
      });
    }

    /* Topic */
    const topicInput = $("inp-topic");
    if (topicInput) {
      topicInput.addEventListener("change", () => {
        if (topicInput.value) clearError("field-topic", "err-topic");
      });
    }

    /* Tell us more — min 20 chars */
    const msgInput = $("inp-message");
    if (msgInput) {
      msgInput.addEventListener("input", () => {
        const v = msgInput.value.trim();
        if (!v) return clearError("field-message", "err-message");
        if (v.length < 20) {
          setError(
            "field-message",
            "err-message",
            `At least 20 characters required (${v.length}/20).`,
          );
        } else {
          clearError("field-message", "err-message");
        }
      });
    }
  }

  /* ── Full validation on submit ── */
  function validateAll() {
    let valid = true;

    /* Full name */
    const name = $("inp-name") ? $("inp-name").value.trim() : "";
    if (!name) {
      setError("field-name", "err-name", "Full name is required.");
      valid = false;
    } else if (!ALPHA_RE.test(name)) {
      setError(
        "field-name",
        "err-name",
        "Only letters, spaces, hyphens and apostrophes are allowed.",
      );
      valid = false;
    } else {
      clearError("field-name", "err-name");
    }

    /* Email */
    const email = $("inp-email") ? $("inp-email").value.trim() : "";
    if (!email) {
      setError("field-email", "err-email", "Work email is required.");
      valid = false;
    } else if (!EMAIL_RE.test(email)) {
      setError(
        "field-email",
        "err-email",
        "Please enter a valid email address.",
      );
      valid = false;
    } else {
      clearError("field-email", "err-email");
    }

    /* Organization (optional, alpha if provided) */
    const org = $("inp-org") ? $("inp-org").value.trim() : "";
    if (org && !ALPHA_RE.test(org)) {
      setError("field-org", "err-org", "Only letters and spaces are allowed.");
      valid = false;
    } else {
      clearError("field-org", "err-org");
    }

    /* Role (optional, alpha if provided) */
    const role = $("inp-role") ? $("inp-role").value.trim() : "";
    if (role && !ALPHA_RE.test(role)) {
      setError(
        "field-role",
        "err-role",
        "Only letters and spaces are allowed.",
      );
      valid = false;
    } else {
      clearError("field-role", "err-role");
    }

    /* Topic */
    const topic = $("inp-topic") ? $("inp-topic").value : "";
    if (!topic) {
      setError("field-topic", "err-topic", "Please select a topic.");
      valid = false;
    } else {
      clearError("field-topic", "err-topic");
    }

    /* Message */
    const msg = $("inp-message") ? $("inp-message").value.trim() : "";
    if (!msg) {
      setError(
        "field-message",
        "err-message",
        "Please tell us a little about what you're looking for.",
      );
      valid = false;
    } else if (msg.length < 20) {
      setError(
        "field-message",
        "err-message",
        `Please write at least 20 characters (currently ${msg.length}).`,
      );
      valid = false;
    } else {
      clearError("field-message", "err-message");
    }

    return valid;
  }

  /* ── Boot ── */
  document.addEventListener("DOMContentLoaded", () => {
    attachLiveValidation();

    /* Popup close button */
    const closeBtn = $("successPopupClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        $("successPopupOverlay").classList.remove("show");
      });
    }

    /* ESC key closes popup */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const overlay = $("successPopupOverlay");
        if (overlay) overlay.classList.remove("show");
      }
    });

    const form = $("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateAll()) {
        const firstErr = form.querySelector(".field.has-error");
        if (firstErr)
          firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      /* All valid — show popup */
      showSuccessPopup();
      form.reset();
    });
  });
})();
