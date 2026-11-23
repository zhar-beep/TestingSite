/*
 * Project: Vale Clarity — Marcus Vale (Warm Woody Editorial V2)
 * Interactions: Mobile Drawer, E-Book Preview Modal, Video Preview Modal (Non-Live),
 * Booking Calendar + RFC 5545 .ics, Stack Category Filters, Safe Partner Preview Modal, Copy Email
 */

(function () {
  "use strict";

  const OFFERINGS = {
    "career-clarity": {
      id: "career-clarity",
      title: "1:1 Career Clarity",
      durationMinutes: 60,
      meta: "60 min · Private Session",
    },
    "keynote-workshops": {
      id: "keynote-workshops",
      title: "Keynote & Workshops",
      durationMinutes: 30,
      meta: "30 min · Discovery Call",
    },
    "speaking-sprint": {
      id: "speaking-sprint",
      title: "4-Week Executive Speaking Sprint",
      durationMinutes: 30,
      meta: "30 min · Sprint Intake",
    },
  };

  const EBOOK_EDITIONS = {
    flagship: {
      badge: "Flagship E-Book",
      title: "Speak With Calm Authority",
      price: "$19",
      subtitle: "142 Pages · PDF & EPUB · 18 Boardroom Scripts",
      ctaLabel: "Preview Checkout Status ($19)",
      includes: [
        "142-page executive field guide in crisp PDF & EPUB editions",
        "18 verbatim boardroom opening, transition, and Q&A scripts",
        "One-page 90-Day Decision Memo & pre-meeting edit checklist",
      ],
    },
    bundle: {
      badge: "Complete Clarity Bundle",
      title: "The Complete Clarity Bundle",
      price: "$39",
      subtitle: "E-Book + 90-Min Audio Companion + 12 Slide & Memo Templates",
      ctaLabel: "Preview Bundle Status ($39)",
      includes: [
        "Everything in Speak With Calm Authority (PDF & EPUB)",
        "90-minute studio-recorded vocal pacing & pause walkthrough",
        "12 editable executive memo, board update, and keynote templates",
        "Lifetime digital updates whenever new scripts are added",
      ],
    },
  };

  const CHAPTER_EXCERPTS = {
    ch1: {
      heading: "Chapter 01 · The 30-Second Executive Open",
      text: "Most leaders lose the room in the first forty seconds by walking chronologically through how they worked on the problem. Start instead with the decision you recommend, the primary trade-off behind it, and the exact question you want the table to weigh. Context only earns attention after the conclusion is clear.",
    },
    ch2: {
      heading: "Chapter 02 · Editing Out Defensive Filler",
      text: "Phrases like 'I kind of think maybe we could explore' signal hesitation before anyone has challenged your logic. Read your opening three sentences aloud before entering the room and cut every qualifier that does not add factual precision. Calm authority sounds shorter, slower, and noticeably easier to trust.",
    },
    ch3: {
      heading: "Chapter 03 · Composure in Hostile Q&A",
      text: "When a sharp question lands unexpectedly, resist the reflex to speak faster. Hold a quiet two-second pause, restate the core constraint behind the question, give a direct one-sentence answer, and bridge back to the strategic objective. Composure is an editing habit, not a personality trait.",
    },
  };

  const VIDEOS = {
    "vid-qa": {
      platform: "YouTube",
      pillClass: "pill--claret",
      duration: "14:20",
      title: "How Senior Leaders Defuse Hostile Q&A in 30 Seconds",
      summary:
        "Recorded live in the timber workshop auditorium, this session breaks down the Pause-Clarify-Bridge cadence so you stay steady when executives challenge your numbers or timeline.",
      takeaways: [
        "Why answering immediately triggers defensive phrasing under pressure",
        "How to separate the tone of a tough question from its real operational constraint",
        "Exact bridging sentences that return the room to the primary decision",
      ],
      notice: "CONCEPT PREVIEW ONLY · EXTERNAL YOUTUBE CHANNEL NOT LIVE",
      buttonLabel: "Demo Preview — YouTube Destination Not Live",
    },
    "vid-pitch": {
      platform: "YouTube",
      pillClass: "pill--claret",
      duration: "18:05",
      title: "Structuring a 3-Minute Boardroom Pitch Without Slides",
      summary:
        "A step-by-step walkthrough from Marcus's walnut study desk showing how to distill a 20-slide status deck into one crisp notebook page that executives remember.",
      takeaways: [
        "The 3-line answer-first spine that replaces rambling background slides",
        "How to rehearse aloud using a 60-minute visual desk timer",
        "Leaving deliberate white space for stakeholder questions",
      ],
      notice: "CONCEPT PREVIEW ONLY · EXTERNAL YOUTUBE CHANNEL NOT LIVE",
      buttonLabel: "Demo Preview — YouTube Destination Not Live",
    },
    "vid-pause": {
      platform: "TikTok",
      pillClass: "pill--cognac",
      duration: "01:12",
      title: "The 2-Second Pause That Doubles Executive Presence",
      summary:
        "A tight 72-second vocal presence drill demonstrating how a measured beat before speaking changes perceived authority on camera and across the table.",
      takeaways: [
        "Where to breathe so your final word lands cleanly instead of trailing upward",
        "How silence signals preparation rather than uncertainty",
        "A 60-second pre-call vocal cadence check you can run anywhere",
      ],
      notice: "CONCEPT PREVIEW ONLY · EXTERNAL TIKTOK CHANNEL NOT LIVE",
      buttonLabel: "Demo Preview — TikTok Destination Not Live",
    },
    "vid-phrases": {
      platform: "Instagram Reel",
      pillClass: "pill--forest",
      duration: "00:58",
      title: "3 Phrases to Replace 'I Think Maybe' in Meetings",
      summary:
        "Three direct verbal edits drawn from Chapter 2 of Speak With Calm Authority to replace hedging filler with clear, collaborative leadership language.",
      takeaways: [
        "Swap 'I think maybe we should' for 'My recommendation is'",
        "Swap 'Sorry to jump in, just a quick thought' for 'One risk to flag here'",
        "Swap 'Does that make sense?' for 'What questions should we test first?'",
      ],
      notice: "CONCEPT PREVIEW ONLY · EXTERNAL INSTAGRAM CHANNEL NOT LIVE",
      buttonLabel: "Demo Preview — Instagram Destination Not Live",
    },
  };

  const TIME_SLOTS = ["09:00", "11:00", "14:30", "17:00"];
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const WEEKDAY_LONG = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function escapeIcsText(value) {
    return String(value)
      .replace(/\\/g, "\\\\")
      .replace(/\r\n|\r|\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function pad2(num) {
    return String(num).padStart(2, "0");
  }

  function dateKey(year, monthIndex, day) {
    return year + "-" + pad2(monthIndex + 1) + "-" + pad2(day);
  }

  function formatReadableDate(dateObj) {
    return (
      WEEKDAY_LONG[dateObj.getDay()] +
      ", " +
      MONTH_NAMES[dateObj.getMonth()] +
      " " +
      dateObj.getDate() +
      ", " +
      dateObj.getFullYear()
    );
  }

  function isWeekday(dateObj) {
    const dow = dateObj.getDay();
    return dow >= 1 && dow <= 5;
  }

  function getFirstBookableDate() {
    const now = new Date();
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    while (!isWeekday(candidate)) {
      candidate.setDate(candidate.getDate() + 1);
    }
    return candidate;
  }

  function compareMonth(yearA, monthA, yearB, monthB) {
    return (yearA - yearB) * 12 + (monthA - monthB);
  }

  /* ===================================================
     SHARED ACCESSIBLE MODAL CONTROLLER (FOCUS TRAP + SCROLL LOCK)
     =================================================== */
  function createModalController(backdropId) {
    const backdrop = document.getElementById(backdropId);
    if (!backdrop) return null;
    const dialog = backdrop.querySelector(".modal-dialog");
    if (!dialog) return null;

    const closeButtons = Array.from(backdrop.querySelectorAll("[data-modal-close]"));
    let lastFocused = null;

    function getFocusableElements() {
      return Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (el) {
        return !el.hidden && el.offsetParent !== null;
      });
    }

    function open(triggerEl) {
      lastFocused = triggerEl || document.activeElement;
      backdrop.hidden = false;
      document.body.classList.add("modal-open");
      const focusables = getFocusableElements();
      if (focusables.length) {
        focusables[0].focus();
      } else {
        dialog.focus();
      }
    }

    function close() {
      if (backdrop.hidden) return;
      backdrop.hidden = true;
      const anyOpen = document.querySelector(".modal-backdrop:not([hidden])");
      if (!anyOpen) {
        document.body.classList.remove("modal-open");
      }
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
      lastFocused = null;
    }

    closeButtons.forEach(function (btn) {
      btn.addEventListener("click", close);
    });

    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (backdrop.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "Tab") {
        const focusables = getFocusableElements();
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first || !dialog.contains(document.activeElement)) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last || !dialog.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    return { backdrop: backdrop, dialog: dialog, open: open, close: close };
  }

  /* ===================================================
     ACCESSIBLE MOBILE DRAWER
     =================================================== */
  function initMobileDrawer() {
    const toggleBtn = document.querySelector("[data-drawer-toggle]");
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    const closeBtn = document.querySelector("[data-drawer-close]");

    if (!toggleBtn || !drawer || !backdrop) return null;

    function openDrawer() {
      drawer.hidden = false;
      backdrop.hidden = false;
      document.body.classList.add("drawer-open");
      toggleBtn.setAttribute("aria-expanded", "true");
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer(restoreFocus) {
      if (drawer.hidden) return;
      drawer.hidden = true;
      backdrop.hidden = true;
      document.body.classList.remove("drawer-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      if (restoreFocus) toggleBtn.focus();
    }

    toggleBtn.addEventListener("click", function () {
      if (toggleBtn.getAttribute("aria-expanded") === "true") {
        closeDrawer(true);
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeDrawer(true);
      });
    }

    backdrop.addEventListener("click", function () {
      closeDrawer(true);
    });

    drawer.querySelectorAll("a, [data-drawer-trigger-close]").forEach(function (item) {
      item.addEventListener("click", function () {
        closeDrawer(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !drawer.hidden) {
        event.preventDefault();
        closeDrawer(true);
      }
    });

    return { close: closeDrawer };
  }

  /* ===================================================
     INTERACTIVE E-BOOK PREVIEW MODAL
     =================================================== */
  function initEbookModal() {
    const controller = createModalController("ebook-modal");
    const triggers = Array.from(document.querySelectorAll("[data-ebook-trigger]"));
    if (!controller || !triggers.length) return;

    const badgeEl = document.getElementById("ebook-modal-badge");
    const titleEl = document.getElementById("ebook-modal-title");
    const priceEl = document.getElementById("ebook-modal-price");
    const subtitleEl = document.getElementById("ebook-modal-subtitle");
    const includesEl = document.getElementById("ebook-modal-includes");
    const actionBtn = document.getElementById("ebook-preview-action");
    const statusEl = document.getElementById("ebook-preview-status");

    const editionTabs = Array.from(controller.dialog.querySelectorAll("[data-ebook-edition]"));
    const chapterTabs = Array.from(controller.dialog.querySelectorAll("[data-chapter-tab]"));
    const chapterTitleEl = document.getElementById("ebook-chapter-title");
    const chapterExcerptEl = document.getElementById("ebook-chapter-excerpt");

    let activeEdition = "flagship";
    let activeChapter = "ch1";

    function renderEdition(editionKey) {
      activeEdition = Object.prototype.hasOwnProperty.call(EBOOK_EDITIONS, editionKey)
        ? editionKey
        : "flagship";
      const data = EBOOK_EDITIONS[activeEdition];

      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (priceEl) priceEl.textContent = data.price;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;
      if (actionBtn) actionBtn.textContent = data.ctaLabel;

      if (includesEl) {
        includesEl.textContent = "";
        data.includes.forEach(function (item) {
          const li = document.createElement("li");
          li.textContent = item;
          includesEl.appendChild(li);
        });
      }

      editionTabs.forEach(function (tab) {
        tab.setAttribute("aria-pressed", tab.getAttribute("data-ebook-edition") === activeEdition ? "true" : "false");
      });

      if (statusEl) {
        statusEl.textContent = "";
        statusEl.hidden = true;
      }
    }

    function renderChapter(chapterKey) {
      activeChapter = Object.prototype.hasOwnProperty.call(CHAPTER_EXCERPTS, chapterKey)
        ? chapterKey
        : "ch1";
      const excerpt = CHAPTER_EXCERPTS[activeChapter];

      if (chapterTitleEl) chapterTitleEl.textContent = excerpt.heading;
      if (chapterExcerptEl) chapterExcerptEl.textContent = excerpt.text;

      chapterTabs.forEach(function (tab) {
        tab.setAttribute("aria-pressed", tab.getAttribute("data-chapter-tab") === activeChapter ? "true" : "false");
      });
    }

    editionTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        renderEdition(tab.getAttribute("data-ebook-edition"));
      });
    });

    chapterTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        renderChapter(tab.getAttribute("data-chapter-tab"));
      });
    });

    if (actionBtn && statusEl) {
      actionBtn.addEventListener("click", function () {
        const data = EBOOK_EDITIONS[activeEdition];
        statusEl.textContent =
          "Concept preview mode: " +
          data.title +
          " (" +
          data.price +
          ") is a non-transactional portfolio demonstration — no payment is collected.";
        statusEl.hidden = false;
      });
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const requestedEdition = trigger.getAttribute("data-ebook-trigger") || "flagship";
        renderEdition(requestedEdition);
        renderChapter("ch1");
        controller.open(trigger);
      });
    });

    renderEdition("flagship");
    renderChapter("ch1");
  }

  /* ===================================================
     WATCH MY VIDEOS: PLATFORM FILTERS + SAFE PREVIEW MODAL
     =================================================== */
  function initVideoSection() {
    const filterButtons = Array.from(document.querySelectorAll("[data-video-filter]"));
    const videoCards = Array.from(document.querySelectorAll("[data-video-platform]"));
    const countEl = document.getElementById("video-count");

    if (filterButtons.length && videoCards.length) {
      function applyVideoFilter(platform) {
        let visible = 0;
        videoCards.forEach(function (card) {
          const match = platform === "all" || card.getAttribute("data-video-platform") === platform;
          card.hidden = !match;
          if (match) visible += 1;
        });

        filterButtons.forEach(function (btn) {
          btn.setAttribute("aria-pressed", btn.getAttribute("data-video-filter") === platform ? "true" : "false");
        });

        if (countEl) {
          countEl.textContent = "Showing " + visible + " of " + videoCards.length + " featured sessions";
        }
      }

      filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          applyVideoFilter(btn.getAttribute("data-video-filter") || "all");
        });
      });

      applyVideoFilter("all");
    }

    const controller = createModalController("video-modal");
    const triggers = Array.from(document.querySelectorAll("[data-video-trigger]"));
    if (!controller || !triggers.length) return;

    const platformEl = document.getElementById("video-modal-platform");
    const durationEl = document.getElementById("video-modal-duration");
    const titleEl = document.getElementById("video-modal-title");
    const summaryEl = document.getElementById("video-modal-summary");
    const takeawaysEl = document.getElementById("video-modal-takeaways");
    const noticeEl = document.getElementById("video-modal-notice");
    const placeholderBtn = document.getElementById("video-modal-placeholder-btn");
    const feedbackEl = document.getElementById("video-modal-placeholder-feedback");

    let currentVideo = VIDEOS["vid-qa"];

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const videoId = trigger.getAttribute("data-video-trigger");
        currentVideo = Object.prototype.hasOwnProperty.call(VIDEOS, videoId)
          ? VIDEOS[videoId]
          : VIDEOS["vid-qa"];

        if (platformEl) {
          platformEl.textContent = currentVideo.platform;
          platformEl.className = "pill " + currentVideo.pillClass;
        }
        if (durationEl) durationEl.textContent = currentVideo.duration;
        if (titleEl) titleEl.textContent = currentVideo.title;
        if (summaryEl) summaryEl.textContent = currentVideo.summary;
        if (noticeEl) noticeEl.textContent = currentVideo.notice;
        if (placeholderBtn) placeholderBtn.textContent = currentVideo.buttonLabel;

        if (takeawaysEl) {
          takeawaysEl.textContent = "";
          currentVideo.takeaways.forEach(function (point) {
            const li = document.createElement("li");
            li.textContent = point;
            takeawaysEl.appendChild(li);
          });
        }

        if (feedbackEl) {
          feedbackEl.textContent = "";
          feedbackEl.hidden = true;
        }

        controller.open(trigger);
      });
    });

    if (placeholderBtn && feedbackEl) {
      placeholderBtn.addEventListener("click", function () {
        feedbackEl.textContent =
          "Concept preview only: no external " +
          currentVideo.platform +
          " channel is connected in this portfolio showcase.";
        feedbackEl.hidden = false;
      });
    }
  }

  /* ===================================================
     INTERACTIVE MENTORING BOOKING CALENDAR WIDGET
     =================================================== */
  function initBookingCalendar() {
    const root = document.getElementById("booking-widget");
    if (!root) return;

    const offeringButtons = Array.from(root.querySelectorAll("[data-offering-option]"));
    const externalOfferingTriggers = Array.from(document.querySelectorAll("[data-select-offering]"));
    const monthTitleEl = document.getElementById("calendar-month-label");
    const prevMonthBtn = document.getElementById("calendar-prev");
    const nextMonthBtn = document.getElementById("calendar-next");
    const daysGridEl = document.getElementById("calendar-days");
    const slotButtons = Array.from(root.querySelectorAll("[data-time-slot]"));

    const summaryOfferingEl = document.getElementById("summary-offering");
    const summarySlotEl = document.getElementById("summary-slot");

    const formEl = document.getElementById("booking-form");
    const nameInput = document.getElementById("booking-name");
    const emailInput = document.getElementById("booking-email");
    const notesInput = document.getElementById("booking-notes");
    const nameErrorEl = document.getElementById("booking-name-error");
    const emailErrorEl = document.getElementById("booking-email-error");

    const confirmationEl = document.getElementById("booking-confirmation");
    const confirmationHeading = document.getElementById("confirmation-heading");
    const confOfferingEl = document.getElementById("conf-offering");
    const confDateEl = document.getElementById("conf-date");
    const confTimeEl = document.getElementById("conf-time");
    const confNameEl = document.getElementById("conf-name");
    const confEmailEl = document.getElementById("conf-email");
    const confNotesRow = document.getElementById("conf-notes-row");
    const confNotesEl = document.getElementById("conf-notes");
    const downloadIcsBtn = document.getElementById("download-ics-btn");
    const modifyTimeBtn = document.getElementById("modify-time-btn");

    const firstBookable = getFirstBookableDate();
    const minYear = firstBookable.getFullYear();
    const minMonth = firstBookable.getMonth();

    const maxMonthDate = new Date(minYear, minMonth + 3, 1);
    const maxYear = maxMonthDate.getFullYear();
    const maxMonth = maxMonthDate.getMonth();

    const state = {
      offeringId: "career-clarity",
      viewYear: minYear,
      viewMonth: minMonth,
      selectedDate: new Date(firstBookable.getFullYear(), firstBookable.getMonth(), firstBookable.getDate()),
      selectedTime: TIME_SLOTS[1],
      submittedPayload: null,
    };

    try {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("offering");
      if (requested && Object.prototype.hasOwnProperty.call(OFFERINGS, requested)) {
        state.offeringId = requested;
      }
    } catch (_err) {
      // Ignore malformed query string
    }

    function syncOfferingUI() {
      offeringButtons.forEach(function (btn) {
        const isSelected = btn.getAttribute("data-offering-option") === state.offeringId;
        btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });
      updateSummary();
    }

    function syncTimeSlotsUI() {
      slotButtons.forEach(function (btn) {
        const isSelected = btn.getAttribute("data-time-slot") === state.selectedTime;
        btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });
      updateSummary();
    }

    function updateSummary() {
      const offering = OFFERINGS[state.offeringId] || OFFERINGS["career-clarity"];
      if (summaryOfferingEl) {
        summaryOfferingEl.textContent = offering.title + " (" + offering.meta + ")";
      }
      if (summarySlotEl) {
        summarySlotEl.textContent =
          formatReadableDate(state.selectedDate) + " · " + state.selectedTime + " EST / Local Time";
      }
    }

    function isDateBookable(year, monthIndex, day) {
      const candidate = new Date(year, monthIndex, day);
      if (!isWeekday(candidate)) return false;
      const candidateFloor = new Date(year, monthIndex, day).getTime();
      const firstFloor = new Date(
        firstBookable.getFullYear(),
        firstBookable.getMonth(),
        firstBookable.getDate()
      ).getTime();
      return candidateFloor >= firstFloor;
    }

    function renderCalendar() {
      if (!daysGridEl || !monthTitleEl) return;

      monthTitleEl.textContent = MONTH_NAMES[state.viewMonth] + " " + state.viewYear;

      if (prevMonthBtn) {
        prevMonthBtn.disabled = compareMonth(state.viewYear, state.viewMonth, minYear, minMonth) <= 0;
      }
      if (nextMonthBtn) {
        nextMonthBtn.disabled = compareMonth(state.viewYear, state.viewMonth, maxYear, maxMonth) >= 0;
      }

      daysGridEl.textContent = "";

      const firstDayOfMonth = new Date(state.viewYear, state.viewMonth, 1).getDay();
      const daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
      const selectedKey = dateKey(
        state.selectedDate.getFullYear(),
        state.selectedDate.getMonth(),
        state.selectedDate.getDate()
      );

      for (let i = 0; i < firstDayOfMonth; i += 1) {
        const spacer = document.createElement("span");
        spacer.className = "calendar-spacer";
        spacer.setAttribute("aria-hidden", "true");
        daysGridEl.appendChild(spacer);
      }

      for (let day = 1; day <= daysInMonth; day += 1) {
        const cellDate = new Date(state.viewYear, state.viewMonth, day);
        const bookable = isDateBookable(state.viewYear, state.viewMonth, day);
        const key = dateKey(state.viewYear, state.viewMonth, day);
        const isSelected = key === selectedKey;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "day-btn";
        btn.textContent = String(day);
        btn.setAttribute("data-date-key", key);
        btn.setAttribute("aria-label", formatReadableDate(cellDate) + (bookable ? "" : " (unavailable)"));

        if (!bookable) {
          btn.disabled = true;
          btn.setAttribute("aria-pressed", "false");
        } else {
          btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
          btn.addEventListener("click", function () {
            state.selectedDate = new Date(state.viewYear, state.viewMonth, day);
            renderCalendar();
            updateSummary();
          });
        }

        daysGridEl.appendChild(btn);
      }
    }

    function clearErrors() {
      if (nameInput) nameInput.removeAttribute("aria-invalid");
      if (emailInput) emailInput.removeAttribute("aria-invalid");
      if (nameErrorEl) {
        nameErrorEl.textContent = "";
        nameErrorEl.hidden = true;
      }
      if (emailErrorEl) {
        emailErrorEl.textContent = "";
        emailErrorEl.hidden = true;
      }
    }

    function buildIcsContent(payload) {
      const offering = OFFERINGS[payload.offeringId] || OFFERINGS["career-clarity"];
      const parts = payload.time.split(":");
      const hours = parseInt(parts[0], 10) || 11;
      const minutes = parseInt(parts[1], 10) || 0;

      const startLocal = new Date(
        payload.date.getFullYear(),
        payload.date.getMonth(),
        payload.date.getDate(),
        hours,
        minutes,
        0
      );
      const endLocal = new Date(startLocal.getTime() + offering.durationMinutes * 60000);

      function toIcsLocalStamp(d) {
        return (
          d.getFullYear() +
          pad2(d.getMonth() + 1) +
          pad2(d.getDate()) +
          "T" +
          pad2(d.getHours()) +
          pad2(d.getMinutes()) +
          "00"
        );
      }

      const now = new Date();
      const dtStamp =
        now.getUTCFullYear() +
        pad2(now.getUTCMonth() + 1) +
        pad2(now.getUTCDate()) +
        "T" +
        pad2(now.getUTCHours()) +
        pad2(now.getUTCMinutes()) +
        pad2(now.getUTCSeconds()) +
        "Z";

      const uid =
        "vale-clarity-" +
        dateKey(payload.date.getFullYear(), payload.date.getMonth(), payload.date.getDate()) +
        "-" +
        pad2(hours) +
        pad2(minutes) +
        "@valeclarity.com";

      const summaryText = "Vale Clarity — " + offering.title + " with Marcus Vale";
      const descriptionLines = [
        "Session: " + offering.title + " (" + offering.meta + ")",
        "Attendee: " + payload.name + " <" + payload.email + ">",
      ];
      if (payload.notes) {
        descriptionLines.push("Notes: " + payload.notes);
      }
      descriptionLines.push("Scheduled via Vale Clarity scheduling preview (EST / Local Time).");

      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Vale Clarity//Marcus Vale Mentoring//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:" + uid,
        "DTSTAMP:" + dtStamp,
        "DTSTART:" + toIcsLocalStamp(startLocal),
        "DTEND:" + toIcsLocalStamp(endLocal),
        "SUMMARY:" + escapeIcsText(summaryText),
        "DESCRIPTION:" + escapeIcsText(descriptionLines.join("\n")),
        "LOCATION:" + escapeIcsText("Private Video Room (Link confirmed by email)"),
        "END:VEVENT",
        "END:VCALENDAR",
      ];

      return lines.join("\r\n") + "\r\n";
    }

    offeringButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const nextId = btn.getAttribute("data-offering-option");
        if (nextId && Object.prototype.hasOwnProperty.call(OFFERINGS, nextId)) {
          state.offeringId = nextId;
          syncOfferingUI();
          if (confirmationEl && !confirmationEl.hidden) {
            confirmationEl.hidden = true;
            if (formEl) formEl.hidden = false;
          }
        }
      });
    });

    externalOfferingTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        const nextId = trigger.getAttribute("data-select-offering");
        if (nextId && Object.prototype.hasOwnProperty.call(OFFERINGS, nextId)) {
          state.offeringId = nextId;
          syncOfferingUI();
          if (confirmationEl && !confirmationEl.hidden) {
            confirmationEl.hidden = true;
            if (formEl) formEl.hidden = false;
          }
        }
        const availabilitySection = document.getElementById("availability");
        if (availabilitySection) {
          event.preventDefault();
          availabilitySection.scrollIntoView({ behavior: "smooth", block: "start" });
          const selectedBtn = root.querySelector('[data-offering-option="' + state.offeringId + '"]');
          if (selectedBtn) {
            setTimeout(function () {
              selectedBtn.focus({ preventScroll: true });
            }, 300);
          }
        }
      });
    });

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener("click", function () {
        if (compareMonth(state.viewYear, state.viewMonth, minYear, minMonth) <= 0) return;
        const d = new Date(state.viewYear, state.viewMonth - 1, 1);
        state.viewYear = d.getFullYear();
        state.viewMonth = d.getMonth();
        renderCalendar();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener("click", function () {
        if (compareMonth(state.viewYear, state.viewMonth, maxYear, maxMonth) >= 0) return;
        const d = new Date(state.viewYear, state.viewMonth + 1, 1);
        state.viewYear = d.getFullYear();
        state.viewMonth = d.getMonth();
        renderCalendar();
      });
    }

    slotButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const slot = btn.getAttribute("data-time-slot");
        if (slot) {
          state.selectedTime = slot;
          syncTimeSlotsUI();
        }
      });
    });

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        if (nameInput.getAttribute("aria-invalid") === "true" && nameInput.value.trim().length > 0) {
          nameInput.removeAttribute("aria-invalid");
          if (nameErrorEl) {
            nameErrorEl.textContent = "";
            nameErrorEl.hidden = true;
          }
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener("input", function () {
        if (emailInput.getAttribute("aria-invalid") === "true" && EMAIL_REGEX.test(emailInput.value.trim())) {
          emailInput.removeAttribute("aria-invalid");
          if (emailErrorEl) {
            emailErrorEl.textContent = "";
            emailErrorEl.hidden = true;
          }
        }
      });
    }

    if (formEl) {
      formEl.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        const rawName = nameInput ? nameInput.value.trim() : "";
        const rawEmail = emailInput ? emailInput.value.trim() : "";
        const rawNotes = notesInput ? notesInput.value.trim() : "";

        let firstInvalid = null;

        if (!rawName) {
          if (nameInput) nameInput.setAttribute("aria-invalid", "true");
          if (nameErrorEl) {
            nameErrorEl.textContent = "Please enter your full name.";
            nameErrorEl.hidden = false;
          }
          firstInvalid = firstInvalid || nameInput;
        }

        if (!EMAIL_REGEX.test(rawEmail)) {
          if (emailInput) emailInput.setAttribute("aria-invalid", "true");
          if (emailErrorEl) {
            emailErrorEl.textContent = "Please enter a valid email address (for example, name@company.com).";
            emailErrorEl.hidden = false;
          }
          firstInvalid = firstInvalid || emailInput;
        }

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        const offering = OFFERINGS[state.offeringId] || OFFERINGS["career-clarity"];
        state.submittedPayload = {
          offeringId: offering.id,
          date: new Date(
            state.selectedDate.getFullYear(),
            state.selectedDate.getMonth(),
            state.selectedDate.getDate()
          ),
          time: state.selectedTime,
          name: rawName,
          email: rawEmail,
          notes: rawNotes,
        };

        // Strictly XSS-safe DOM rendering via textContent only
        if (confOfferingEl) confOfferingEl.textContent = offering.title + " (" + offering.meta + ")";
        if (confDateEl) confDateEl.textContent = formatReadableDate(state.submittedPayload.date);
        if (confTimeEl) confTimeEl.textContent = state.submittedPayload.time + " EST / Local Time";
        if (confNameEl) confNameEl.textContent = state.submittedPayload.name;
        if (confEmailEl) confEmailEl.textContent = state.submittedPayload.email;

        if (confNotesRow && confNotesEl) {
          if (state.submittedPayload.notes) {
            confNotesEl.textContent = state.submittedPayload.notes;
            confNotesRow.hidden = false;
          } else {
            confNotesEl.textContent = "";
            confNotesRow.hidden = true;
          }
        }

        formEl.hidden = true;
        if (confirmationEl) {
          confirmationEl.hidden = false;
          if (confirmationHeading) confirmationHeading.focus();
        }
      });
    }

    if (downloadIcsBtn) {
      downloadIcsBtn.addEventListener("click", function () {
        if (!state.submittedPayload) return;
        const icsText = buildIcsContent(state.submittedPayload);
        const blob = new Blob([icsText], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const stamp = dateKey(
          state.submittedPayload.date.getFullYear(),
          state.submittedPayload.date.getMonth(),
          state.submittedPayload.date.getDate()
        );
        link.href = url;
        link.download = "vale-clarity-" + state.submittedPayload.offeringId + "-" + stamp + ".ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 1000);
      });
    }

    if (modifyTimeBtn) {
      modifyTimeBtn.addEventListener("click", function () {
        if (confirmationEl) confirmationEl.hidden = true;
        if (formEl) formEl.hidden = false;
        const activeDay = daysGridEl ? daysGridEl.querySelector('.day-btn[aria-pressed="true"]') : null;
        if (activeDay) {
          activeDay.focus();
        } else if (nameInput) {
          nameInput.focus();
        }
      });
    }

    syncOfferingUI();
    syncTimeSlotsUI();
    renderCalendar();
  }

  /* ===================================================
     PERSONAL HUB: COPY EMAIL, FILTERS & SAFE PARTNER MODAL
     =================================================== */
  function initCopyEmail() {
    const copyBtn = document.getElementById("copy-email-btn");
    const feedbackEl = document.getElementById("copy-email-feedback");
    if (!copyBtn || !feedbackEl) return;

    const emailAddress = copyBtn.getAttribute("data-copy-email") || "marcus@valeclarity.com";

    copyBtn.addEventListener("click", function () {
      feedbackEl.classList.remove("copy-feedback--warn");

      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function" && window.isSecureContext) {
        navigator.clipboard
          .writeText(emailAddress)
          .then(function () {
            feedbackEl.textContent = "Copied " + emailAddress + " to clipboard.";
          })
          .catch(function () {
            feedbackEl.classList.add("copy-feedback--warn");
            feedbackEl.textContent = "Clipboard access unavailable — email directly at " + emailAddress;
          });
      } else {
        feedbackEl.classList.add("copy-feedback--warn");
        feedbackEl.textContent = "Clipboard unavailable in this browser context — email " + emailAddress;
      }
    });
  }

  function initStackFilters() {
    const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
    const cards = Array.from(document.querySelectorAll("[data-stack-category]"));
    const countEl = document.getElementById("stack-count");

    if (!filterButtons.length || !cards.length) return;

    function applyFilter(category) {
      let visibleCount = 0;

      cards.forEach(function (card) {
        const cardCat = card.getAttribute("data-stack-category");
        const shouldShow = category === "all" || cardCat === category;
        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
      });

      filterButtons.forEach(function (btn) {
        const isActive = btn.getAttribute("data-filter") === category;
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      if (countEl) {
        countEl.textContent = "Showing " + visibleCount + " of " + cards.length + " items";
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-filter") || "all");
      });
    });

    applyFilter("all");
  }

  function initPartnerModal() {
    const controller = createModalController("partner-modal");
    const triggers = Array.from(document.querySelectorAll("[data-partner-trigger]"));
    if (!controller || !triggers.length) return;

    const titleEl = document.getElementById("partner-modal-title");
    const categoryEl = document.getElementById("partner-modal-category");
    const descEl = document.getElementById("partner-modal-desc");
    const refEl = document.getElementById("partner-modal-ref");
    const placeholderBtn = document.getElementById("partner-modal-placeholder-btn");
    const feedbackEl = document.getElementById("partner-modal-placeholder-feedback");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const title = trigger.getAttribute("data-item-title") || "Partner Recommendation";
        const category = trigger.getAttribute("data-item-category") || "Reading & Setup";
        const pillClass = trigger.getAttribute("data-item-pill") || "pill--cognac";
        const desc = trigger.getAttribute("data-item-desc") || "";
        const refText = trigger.getAttribute("data-item-ref") || "Concept Partner Listing";

        if (titleEl) titleEl.textContent = title;
        if (categoryEl) {
          categoryEl.textContent = category;
          categoryEl.className = "pill " + pillClass;
        }
        if (descEl) descEl.textContent = desc;
        if (refEl) refEl.textContent = "Reference: " + refText;
        if (feedbackEl) {
          feedbackEl.textContent = "";
          feedbackEl.hidden = true;
        }

        controller.open(trigger);
      });
    });

    if (placeholderBtn && feedbackEl) {
      placeholderBtn.addEventListener("click", function () {
        feedbackEl.textContent =
          "Concept preview only: external partner links are intentionally inactive in this portfolio showcase.";
        feedbackEl.hidden = false;
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileDrawer();
    initEbookModal();
    initVideoSection();
    initBookingCalendar();
    initCopyEmail();
    initStackFilters();
    initPartnerModal();
  });
})();
