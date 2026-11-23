/* ==========================================================================
   Serena Flow — Lightweight Vanilla JS Interactions
   Static Concept Demo: Mobile Menu, Equipment Filter, Affiliate Preview Modal,
   Copy Demo Email, Offering Pre-Selection, and Static Booking Inquiry Preview.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Mobile Navigation Drawer (index.html) */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");

  if (menuToggle && mobileDrawer) {
    const closeDrawer = (restoreFocus = false) => {
      const wasOpen = mobileDrawer.classList.contains("is-open");
      mobileDrawer.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      if (restoreFocus && wasOpen) menuToggle.focus();
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeDrawer(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer(true);
    });
  }

  /* 2. Bio-Link Curated Equipment Category Filter (bio-link.html) */
  const filterButtons = document.querySelectorAll(".filter-pill[data-filter]");
  const gearCards = document.querySelectorAll(".gear-card[data-category]");
  const gearCountEl = document.getElementById("gear-count");

  if (filterButtons.length && gearCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.getAttribute("data-filter");

        filterButtons.forEach((b) => {
          b.setAttribute("aria-pressed", String(b === btn));
        });

        let visibleCount = 0;
        gearCards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          const show = selected === "all" || cat === selected;
          card.classList.toggle("is-hidden", !show);
          if (show) visibleCount += 1;
        });

        if (gearCountEl) {
          gearCountEl.textContent = `${visibleCount} curated item${visibleCount === 1 ? "" : "s"}`;
        }
      });
    });
  }

  /* 3. Honest Affiliate External Link Preview Modal (bio-link.html) */
  const modal = document.getElementById("affiliate-modal");
  const modalTitle = document.getElementById("modal-item-title");
  const modalMerchant = document.getElementById("modal-item-merchant");
  const modalUrl = document.getElementById("modal-item-url");
  const modalClose = document.getElementById("modal-close");

  if (modal && modalClose) {
    let lastFocusedTrigger = null;

    const getFocusable = () =>
      Array.from(
        modal.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
        lastFocusedTrigger.focus();
      }
      lastFocusedTrigger = null;
    };

    document.querySelectorAll("[data-affiliate-preview]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        lastFocusedTrigger = trigger;
        const name = trigger.getAttribute("data-item-name") || "Curated Equipment";
        const merchant = trigger.getAttribute("data-item-merchant") || "External Merchant";
        const sampleUrl =
          trigger.getAttribute("data-sample-url") ||
          "https://merchant.example/product?ref=serenaflow-demo";

        if (modalTitle) modalTitle.textContent = name;
        if (modalMerchant) modalMerchant.textContent = merchant;
        if (modalUrl) modalUrl.textContent = sampleUrl;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        modalClose.focus();
      });
    });

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* 4. Copy Demo Inquiry Email (bio-link.html) — Honest Clipboard Detection */
  const copyBtn = document.getElementById("copy-email-btn");
  const copyFeedback = document.getElementById("copy-feedback");

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener("click", async () => {
      const demoEmail = "hello@serenaflow-concept.example";
      let copied = false;

      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        try {
          await navigator.clipboard.writeText(demoEmail);
          copied = true;
        } catch {
          copied = false;
        }
      }

      if (!copied) {
        try {
          const temp = document.createElement("textarea");
          temp.value = demoEmail;
          temp.setAttribute("readonly", "");
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          copied = Boolean(document.execCommand && document.execCommand("copy"));
          document.body.removeChild(temp);
        } catch {
          copied = false;
        }
      }

      copyFeedback.textContent = copied
        ? `Demo email copied: ${demoEmail} (fictional address for portfolio preview)`
        : `Clipboard unavailable in this browser context — demo email: ${demoEmail} (fictional address)`;
    });
  }

  /* 5. Offering CTA Pre-Selection (index.html) */
  const offeringSelect = document.getElementById("client-offering");
  if (offeringSelect) {
    document.querySelectorAll("[data-select-offering]").forEach((cta) => {
      cta.addEventListener("click", () => {
        const targetVal = cta.getAttribute("data-select-offering");
        if (!targetVal) return;
        const hasOption = Array.from(offeringSelect.options).some(
          (opt) => opt.value === targetVal
        );
        if (hasOption) {
          offeringSelect.value = targetVal;
        }
      });
    });
  }

  /* 6. Static Demo Booking Inquiry Form (index.html) */
  const inquiryForm = document.getElementById("inquiry-form");
  const demoResult = document.getElementById("demo-result");

  if (inquiryForm && demoResult) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("client-name");
      const emailInput = document.getElementById("client-email");
      const name = (nameInput?.value || "").trim();
      const email = (emailInput?.value || "").trim();
      const offering = (document.getElementById("client-offering")?.value || "").trim();
      const notes = (document.getElementById("client-notes")?.value || "").trim();

      const nameValid = name.length > 0;
      const emailValid = emailPattern.test(email);

      if (nameInput) nameInput.setAttribute("aria-invalid", String(!nameValid));
      if (emailInput) emailInput.setAttribute("aria-invalid", String(!emailValid));

      if (!nameValid || !emailValid) {
        demoResult.className = "demo-result is-visible is-error";
        demoResult.textContent = !nameValid
          ? "Please enter your name to preview the static inquiry summary."
          : "Please enter a valid email address (for example, maya@example.com) to preview the static inquiry summary.";
        if (!nameValid && nameInput) nameInput.focus();
        else if (!emailValid && emailInput) emailInput.focus();
        return;
      }

      demoResult.className = "demo-result is-visible";
      demoResult.innerHTML =
        `<strong>Static Demo Preview Only (Not Sent):</strong><br>` +
        `Inquiry captured locally for <strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) ` +
        `regarding <strong>${escapeHtml(offering)}</strong>.` +
        (notes ? `<br><em>Note:</em> "${escapeHtml(notes)}"` : "") +
        `<br><br>No backend or calendar is connected in this Concept Project. In a live client build, this form connects to the coach's verified email form or booking link.`;
    });
  }
});

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
