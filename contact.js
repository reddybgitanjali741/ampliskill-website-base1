(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const ALPHA_RE = /^[A-Za-z\s\-']+$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  function showSuccessPopup() {
    const overlay = $("successPopupOverlay");
    if (!overlay) return;
    overlay.classList.add("show");
    overlay.addEventListener("click", function handler(e) {
      if (e.target === overlay) {
        overlay.classList.remove("show");
        overlay.removeEventListener("click", handler);
      }
    });
  }

  function attachLiveValidation() {
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

    const topicInput = $("inp-topic");
    if (topicInput) {
      topicInput.addEventListener("change", () => {
        if (topicInput.value) clearError("field-topic", "err-topic");
      });
    }

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

  function validateAll() {
    let valid = true;

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

    const org = $("inp-org") ? $("inp-org").value.trim() : "";
    if (org && !ALPHA_RE.test(org)) {
      setError("field-org", "err-org", "Only letters and spaces are allowed.");
      valid = false;
    } else {
      clearError("field-org", "err-org");
    }

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

    const topic = $("inp-topic") ? $("inp-topic").value : "";
    if (!topic) {
      setError("field-topic", "err-topic", "Please select a topic.");
      valid = false;
    } else {
      clearError("field-topic", "err-topic");
    }

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

  document.addEventListener("DOMContentLoaded", () => {
    attachLiveValidation();

    const closeBtn = $("successPopupClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        $("successPopupOverlay").classList.remove("show");
      });
    }

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

      const templateParams = {
        from_name: $("inp-name").value.trim(),
        from_email: $("inp-email").value.trim(),
        organization: $("inp-org").value.trim(),
        role: $("inp-role").value.trim(),
        topic: $("inp-topic").value,
        message: $("inp-message").value.trim(),
      };

      emailjs.send("service_yhnzrws", "template_0i1g3z6", templateParams).then(
        function () {
          console.log("Email sent successfully");
          showSuccessPopup();
          form.reset();
        },
        function (error) {
          console.error("Email failed:", error);
          alert("Failed to send message");
        },
      );
    });
  });
})();
