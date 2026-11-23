/* ==========================================================================
   Serena Flow — Upgrade Test Variant Interactions (Vanilla JS)
   Features: Accessible Mobile Drawer, Interactive Booking Calendar + RFC 5545
   .ics Invite Download, Offering CTA Sync, My Essentials Category Filter,
   Accessible Partner Link Modal, and Honest Clipboard Copy.
   Classification: Standalone Frontend Demonstration / Static HTML Prototype
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
  initBookingCalendar();
  initEssentialsFilter();
  initPartnerModal();
  initClipboardCopy();
});

/* ---------- 1. Accessible Mobile Navigation Drawer ---------- */
function initMobileDrawer() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (!menuToggle || !mobileDrawer) return;

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
    if (e.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
      closeDrawer(true);
    }
  });
}

/* ---------- 2. Interactive Class & 1:1 Booking Calendar Widget ---------- */
function initBookingCalendar() {
  const bookingShell = document.getElementById("booking-widget");
  if (!bookingShell) return;

  const OFFERINGS = {
    "Morning Mobility Flow (Small-Group)": {
      label: "Morning Mobility Flow (Small-Group)",
      meta: "$28 · 45 min · Small-Group Online",
      durationMinutes: 45
    },
    "1:1 Private Mat Pilates": {
      label: "1:1 Private Mat Pilates",
      meta: "$85 · 50 min · Private Online",
      durationMinutes: 50
    },
    "4-Week Beginner Foundation": {
      label: "4-Week Beginner Foundation",
      meta: "$160 · 4 Sessions · Beginner Track",
      durationMinutes: 45
    }
  };

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const DAY_NAMES = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  // Pure local-date helpers (local year/month/day arithmetic, no UTC-shift bugs)
  const pad2 = (n) => String(n).padStart(2, "0");
  const makeLocalKey = (year, monthIndex, day) =>
    `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
  const parseLocalKey = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const isBookableDate = (dateObj, minDateObj) => {
    const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1..6 = Mon..Sat
    return dateObj.getTime() >= minDateObj.getTime() && dayOfWeek >= 1 && dayOfWeek <= 6;
  };
  const formatLongDate = (dateObj) =>
    `${DAY_NAMES[dateObj.getDay()]}, ${MONTH_NAMES[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

  // Determine first bookable date (starts tomorrow, Mon–Sat)
  const now = new Date();
  const minBookable = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const firstBookable = new Date(minBookable.getFullYear(), minBookable.getMonth(), minBookable.getDate());
  while (firstBookable.getDay() === 0) {
    firstBookable.setDate(firstBookable.getDate() + 1);
  }

  const minMonthYear = firstBookable.getFullYear();
  const minMonthIndex = firstBookable.getMonth();
  const maxMonthOffset = 3; // Next up to +3 months

  const state = {
    offering: "1:1 Private Mat Pilates",
    monthOffset: 0,
    selectedDateKey: makeLocalKey(
      firstBookable.getFullYear(),
      firstBookable.getMonth(),
      firstBookable.getDate()
    ),
    selectedTime: "09:00",
    timezone: "EST / Local Time",
    confirmedData: null
  };

  // Optional URL ?offering= pre-selection (safe allowlist check)
  try {
    const params = new URLSearchParams(window.location.search);
    const paramOffering = params.get("offering");
    if (paramOffering && Object.prototype.hasOwnProperty.call(OFFERINGS, paramOffering)) {
      state.offering = paramOffering;
    }
  } catch {
    // Ignore malformed query string
  }

  // DOM References
  const formatButtons = Array.from(bookingShell.querySelectorAll("[data-booking-offering]"));
  const monthLabelEl = document.getElementById("cal-month-label");
  const calDaysEl = document.getElementById("cal-days");
  const prevBtn = document.getElementById("cal-prev");
  const nextBtn = document.getElementById("cal-next");
  const timeButtons = Array.from(bookingShell.querySelectorAll("[data-time-slot]"));
  const summaryOfferingEl = document.getElementById("summary-offering");
  const summarySlotEl = document.getElementById("summary-slot");

  const formWrapper = document.getElementById("booking-form-wrapper");
  const formEl = document.getElementById("booking-form");
  const nameInput = document.getElementById("booking-name");
  const emailInput = document.getElementById("booking-email");
  const notesInput = document.getElementById("booking-notes");
  const nameError = document.getElementById("booking-name-error");
  const emailError = document.getElementById("booking-email-error");

  const confirmCard = document.getElementById("booking-confirmation");
  const confirmOfferingEl = document.getElementById("confirm-offering");
  const confirmDateEl = document.getElementById("confirm-date");
  const confirmTimeEl = document.getElementById("confirm-time");
  const confirmNameEl = document.getElementById("confirm-name");
  const confirmEmailEl = document.getElementById("confirm-email");
  const confirmNotesRow = document.getElementById("confirm-notes-row");
  const confirmNotesEl = document.getElementById("confirm-notes");
  const downloadIcsBtn = document.getElementById("download-ics-btn");
  const modifyBookingBtn = document.getElementById("modify-booking-btn");

  const syncFormatUI = () => {
    formatButtons.forEach((btn) => {
      const val = btn.getAttribute("data-booking-offering");
      btn.setAttribute("aria-pressed", String(val === state.offering));
    });
    updateSummary();
  };

  const syncTimeUI = () => {
    timeButtons.forEach((btn) => {
      const val = btn.getAttribute("data-time-slot");
      btn.setAttribute("aria-pressed", String(val === state.selectedTime));
    });
    updateSummary();
  };

  const updateSummary = () => {
    const selectedDateObj = parseLocalKey(state.selectedDateKey);
    const meta = OFFERINGS[state.offering] || OFFERINGS["1:1 Private Mat Pilates"];
    if (summaryOfferingEl) summaryOfferingEl.textContent = meta.label;
    if (summarySlotEl) {
      summarySlotEl.textContent = `${formatLongDate(selectedDateObj)} · ${state.selectedTime} (${state.timezone})`;
    }
  };

  const renderCalendar = () => {
    const viewDate = new Date(minMonthYear, minMonthIndex + state.monthOffset, 1);
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    if (monthLabelEl) {
      monthLabelEl.textContent = `${MONTH_NAMES[month]} ${year}`;
    }
    if (prevBtn) prevBtn.disabled = state.monthOffset <= 0;
    if (nextBtn) nextBtn.disabled = state.monthOffset >= maxMonthOffset;

    if (!calDaysEl) return;
    calDaysEl.innerHTML = "";

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstWeekday; i += 1) {
      const spacer = document.createElement("span");
      spacer.className = "cal-spacer";
      spacer.setAttribute("aria-hidden", "true");
      calDaysEl.appendChild(spacer);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const cellDate = new Date(year, month, day);
      const dateKey = makeLocalKey(year, month, day);
      const bookable = isBookableDate(cellDate, minBookable);
      const isSelected = dateKey === state.selectedDateKey;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-day";
      btn.textContent = String(day);
      btn.setAttribute("data-date", dateKey);
      btn.setAttribute("aria-label", formatLongDate(cellDate));
      btn.setAttribute("aria-pressed", String(isSelected));

      if (!bookable) {
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          state.selectedDateKey = dateKey;
          renderCalendar();
          updateSummary();
        });
      }

      calDaysEl.appendChild(btn);
    }
  };

  // Format selector clicks
  formatButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-booking-offering");
      if (val && Object.prototype.hasOwnProperty.call(OFFERINGS, val)) {
        state.offering = val;
        syncFormatUI();
      }
    });
  });

  // Offering CTA sync buttons across the page
  document.querySelectorAll("[data-select-offering]").forEach((cta) => {
    cta.addEventListener("click", () => {
      const val = cta.getAttribute("data-select-offering");
      if (val && Object.prototype.hasOwnProperty.call(OFFERINGS, val)) {
        state.offering = val;
        if (confirmCard && formWrapper) {
          confirmCard.classList.remove("is-visible");
          formWrapper.classList.remove("is-hidden");
        }
        syncFormatUI();
      }
    });
  });

  // Month nav buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (state.monthOffset > 0) {
        state.monthOffset -= 1;
        renderCalendar();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (state.monthOffset < maxMonthOffset) {
        state.monthOffset += 1;
        renderCalendar();
      }
    });
  }

  // Time slot buttons
  timeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const slot = btn.getAttribute("data-time-slot");
      if (slot) {
        state.selectedTime = slot;
        syncTimeUI();
      }
    });
  });

  // Form validation & confirmation transition
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (formEl) {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = (nameInput?.value || "").trim();
      const emailVal = (emailInput?.value || "").trim();
      const notesVal = (notesInput?.value || "").trim();

      const nameValid = nameVal.length > 0;
      const emailValid = emailRegex.test(emailVal);

      if (nameInput) nameInput.setAttribute("aria-invalid", String(!nameValid));
      if (emailInput) emailInput.setAttribute("aria-invalid", String(!emailValid));
      if (nameError) nameError.textContent = nameValid ? "" : "Please enter your name.";
      if (emailError) {
        emailError.textContent = emailValid
          ? ""
          : "Please enter a valid email address (for example, maya@example.com).";
      }

      if (!nameValid) {
        nameInput?.focus();
        return;
      }
      if (!emailValid) {
        emailInput?.focus();
        return;
      }

      const selectedDateObj = parseLocalKey(state.selectedDateKey);
      const offeringMeta = OFFERINGS[state.offering] || OFFERINGS["1:1 Private Mat Pilates"];

      state.confirmedData = {
        offering: offeringMeta.label,
        durationMinutes: offeringMeta.durationMinutes,
        dateKey: state.selectedDateKey,
        formattedDate: formatLongDate(selectedDateObj),
        time: state.selectedTime,
        timezone: state.timezone,
        name: nameVal,
        email: emailVal,
        notes: notesVal
      };

      // Render safely via textContent (zero XSS)
      if (confirmOfferingEl) confirmOfferingEl.textContent = state.confirmedData.offering;
      if (confirmDateEl) confirmDateEl.textContent = state.confirmedData.formattedDate;
      if (confirmTimeEl) {
        confirmTimeEl.textContent = `${state.confirmedData.time} (${state.confirmedData.timezone})`;
      }
      if (confirmNameEl) confirmNameEl.textContent = state.confirmedData.name;
      if (confirmEmailEl) confirmEmailEl.textContent = state.confirmedData.email;

      if (confirmNotesRow && confirmNotesEl) {
        if (state.confirmedData.notes) {
          confirmNotesEl.textContent = state.confirmedData.notes;
          confirmNotesRow.hidden = false;
        } else {
          confirmNotesEl.textContent = "";
          confirmNotesRow.hidden = true;
        }
      }

      formWrapper?.classList.add("is-hidden");
      confirmCard?.classList.add("is-visible");
      downloadIcsBtn?.focus();
    });
  }

  // RFC 5545 .ics Calendar Invite Download
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener("click", () => {
      if (!state.confirmedData) return;
      const d = state.confirmedData;
      const [year, month, day] = d.dateKey.split("-").map(Number);
      const [hour, minute] = d.time.split(":").map(Number);

      const startLocal = new Date(year, month - 1, day, hour, minute, 0);
      const endLocal = new Date(startLocal.getTime() + d.durationMinutes * 60000);
      const stampNow = new Date();

      const formatIcsLocal = (dt) =>
        `${dt.getFullYear()}${pad2(dt.getMonth() + 1)}${pad2(dt.getDate())}T${pad2(dt.getHours())}${pad2(dt.getMinutes())}00`;

      const formatIcsUtc = (dt) =>
        `${dt.getUTCFullYear()}${pad2(dt.getUTCMonth() + 1)}${pad2(dt.getUTCDate())}T${pad2(dt.getUTCHours())}${pad2(dt.getUTCMinutes())}${pad2(dt.getUTCSeconds())}Z`;

      const summaryText = `Serena Flow — ${d.offering}`;
      const descriptionLines = [
        `Session: ${d.offering}`,
        `Guest: ${d.name} (${d.email})`,
        `Time: ${d.time} (${d.timezone})`
      ];
      if (d.notes) {
        descriptionLines.push(`Notes: ${d.notes}`);
      }
      const uid = `serena-flow-${d.dateKey.replaceAll("-", "")}-${pad2(hour)}${pad2(minute)}@serenaflow.studio`;

      const icsLines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Serena Flow//Studio Booking Calendar//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${formatIcsUtc(stampNow)}`,
        `DTSTART:${formatIcsLocal(startLocal)}`,
        `DTEND:${formatIcsLocal(endLocal)}`,
        `SUMMARY:${escapeIcsText(summaryText)}`,
        `DESCRIPTION:${escapeIcsText(descriptionLines.join("\n"))}`,
        `LOCATION:${escapeIcsText("Online Live Session — Link sent prior to class")}`,
        "END:VEVENT",
        "END:VCALENDAR",
        ""
      ];

      const blob = new Blob([icsLines.join("\r\n")], {
        type: "text/calendar;charset=utf-8"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `serena-flow-${d.dateKey}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }

  // Modify Time (preserves all user inputs & selections)
  if (modifyBookingBtn) {
    modifyBookingBtn.addEventListener("click", () => {
      confirmCard?.classList.remove("is-visible");
      formWrapper?.classList.remove("is-hidden");
      const activeDay = calDaysEl?.querySelector('.cal-day[aria-pressed="true"]');
      if (activeDay) activeDay.focus();
      else nameInput?.focus();
    });
  }

  // Initial render
  syncFormatUI();
  syncTimeUI();
  renderCalendar();
}

/* ---------- 3. My Essentials Category Filter (serena-bio-test.html) ---------- */
function initEssentialsFilter() {
  const filterButtons = document.querySelectorAll(".filter-pill[data-filter]");
  const itemCards = document.querySelectorAll(".essential-card[data-category]");
  const countEl = document.getElementById("essentials-count");

  if (!filterButtons.length || !itemCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      let visibleCount = 0;
      itemCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        const show = selected === "all" || cat === selected;
        card.classList.toggle("is-hidden", !show);
        if (show) visibleCount += 1;
      });

      if (countEl) {
        countEl.textContent = `${visibleCount} ${visibleCount === 1 ? "essential" : "essentials"}`;
      }
    });
  });
}

/* ---------- 4. Accessible Partner Link Preview Modal (serena-bio-test.html) ---------- */
function initPartnerModal() {
  const modal = document.getElementById("partner-modal");
  const modalTitle = document.getElementById("modal-item-title");
  const modalPartner = document.getElementById("modal-item-partner");
  const modalUrl = document.getElementById("modal-item-url");
  const modalClose = document.getElementById("modal-close");

  if (!modal || !modalClose) return;

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

  document.querySelectorAll("[data-partner-preview]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      lastFocusedTrigger = trigger;
      const name = trigger.getAttribute("data-item-name") || "Daily Practice Essential";
      const partner = trigger.getAttribute("data-item-partner") || "Partner Store";
      const sampleUrl =
        trigger.getAttribute("data-sample-url") ||
        "https://partner-store.example/essential?ref=serenaflow";

      if (modalTitle) modalTitle.textContent = name;
      if (modalPartner) modalPartner.textContent = partner;
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

/* ---------- 5. Honest Studio Email Clipboard Copy (serena-bio-test.html) ---------- */
function initClipboardCopy() {
  const copyBtn = document.getElementById("copy-email-btn");
  const copyFeedback = document.getElementById("copy-feedback");
  if (!copyBtn || !copyFeedback) return;

  copyBtn.addEventListener("click", async () => {
    const studioEmail = "hello@serenaflow.studio";
    let copied = false;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(studioEmail);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const temp = document.createElement("textarea");
        temp.value = studioEmail;
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
      ? `Studio email copied: ${studioEmail}`
      : `Clipboard unavailable in this browser — studio email: ${studioEmail}`;
  });
}

/* ---------- Safe Escaping Helpers ---------- */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeIcsText(str) {
  return String(str)
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\r\n", "\\n")
    .replaceAll("\n", "\\n");
}
