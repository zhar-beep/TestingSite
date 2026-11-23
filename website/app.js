/* ==========================================================================
   Albert — Social-to-Income Digital Studio (V2 Vanilla JS)
   Features: Accessible Mobile Drawer (Focus Trap), Hero Stream Switcher,
             Interactive Booking Calendar (Package Sync, Strict URL/Email,
             XSS-Safe Confirmation, RFC 5545 .ics), Honest Clipboard Copy
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Accessible Mobile Drawer (Focus Trap, Escape, Backdrop, Scroll Lock)
     ------------------------------------------------------------------------ */
  function initMobileDrawer() {
    var toggleBtn = document.getElementById('menu-toggle');
    var drawer = document.getElementById('mobile-drawer');
    var backdrop = document.getElementById('drawer-backdrop');
    var closeBtn = document.getElementById('drawer-close');

    if (!toggleBtn || !drawer || !backdrop || !closeBtn) return;

    function getFocusableElements() {
      return Array.prototype.slice.call(
        drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
    }

    function openDrawer() {
      drawer.hidden = false;
      backdrop.hidden = false;
      requestAnimationFrame(function () {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
      });
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
      closeBtn.focus();
    }

    function closeDrawer(returnFocus) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
      setTimeout(function () {
        if (!drawer.classList.contains('is-open')) {
          drawer.hidden = true;
          backdrop.hidden = true;
        }
      }, 220);
      if (returnFocus) {
        toggleBtn.focus();
      }
    }

    toggleBtn.addEventListener('click', function () {
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeDrawer(true);
      } else {
        openDrawer();
      }
    });

    closeBtn.addEventListener('click', function () {
      closeDrawer(true);
    });

    backdrop.addEventListener('click', function () {
      closeDrawer(true);
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (!drawer.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer(true);
        return;
      }

      if (event.key === 'Tab') {
        var focusables = getFocusableElements();
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Interactive Hero Monetization Path Preview Strip
     ------------------------------------------------------------------------ */
  var STREAMS = {
    affiliate: {
      pillClass: 'pill pill--emerald',
      pillText: 'Revenue Stream 01 · Product Hub',
      route: 'yourname.site/shop',
      heading: 'Curated Affiliate Product Hubs',
      copy: 'Replace messy link lists with filterable, mobile-first product shelves designed to turn daily recommendations into recurring revenue.',
      cards: [
        { tag: 'CATEGORY FILTER', value: 'All · Gear · Books · Desk' },
        { tag: 'MOBILE UX', value: '1-Tap Clean Preview Cards' },
        { tag: 'OWNERSHIP', value: 'Branded .site URL' }
      ]
    },
    ebooks: {
      pillClass: 'pill pill--amber',
      pillText: 'Revenue Stream 02 · Digital Guides',
      route: 'yourname.site/ebook',
      heading: 'Flagship E-Books & Digital Guides',
      copy: 'Give your guide a dedicated spotlight with chapter previews, instant clarity on what readers unlock, and a friction-free purchase path.',
      cards: [
        { tag: 'FORMAT', value: 'PDF + EPUB + Templates' },
        { tag: 'CONVERSION', value: 'Interactive Chapter Preview' },
        { tag: 'PRICING', value: 'Single Guide + Bundle Tier' }
      ]
    },
    courses: {
      pillClass: 'pill pill--violet',
      pillText: 'Revenue Stream 03 · Education',
      route: 'yourname.site/courses',
      heading: 'E-Courses & Live Workshops',
      copy: 'Present your curriculum, module milestones, and cohort enrollment cleanly so followers immediately understand the transformation.',
      cards: [
        { tag: 'STRUCTURE', value: 'Scannable Module Syllabus' },
        { tag: 'LAUNCH', value: 'Waitlist & Cohort Dates' },
        { tag: 'MOBILE READY', value: 'Fast Static Page Load' }
      ]
    },
    bookings: {
      pillClass: 'pill pill--coral',
      pillText: 'Revenue Stream 04 · 1:1 Services',
      route: 'yourname.site/book',
      heading: '1:1 Paid Bookings & Consultations',
      copy: 'Eliminate back-and-forth DMs with a built-in package selector, live date/time picker, and instant downloadable calendar invites.',
      cards: [
        { tag: 'SCHEDULING', value: 'Date + Timezone Slot Picker' },
        { tag: 'CONFIRMATION', value: 'RFC 5545 .ics Invite File' },
        { tag: 'HOSTING', value: '$0/mo Static Delivery' }
      ]
    }
  };

  function initHeroStreamPreview() {
    var tabButtons = Array.prototype.slice.call(document.querySelectorAll('[data-stream-tab]'));
    var panel = document.getElementById('stream-panel');
    var stagePill = document.getElementById('stage-pill');
    var stageRoute = document.getElementById('stage-route');
    var stageHeading = document.getElementById('stage-heading');
    var stageCopy = document.getElementById('stage-copy');
    var stageCards = document.getElementById('stage-cards');

    if (!tabButtons.length || !panel || !stagePill || !stageRoute || !stageHeading || !stageCopy || !stageCards) {
      return;
    }

    function activateStream(key) {
      var data = STREAMS[key];
      if (!data) return;

      tabButtons.forEach(function (btn) {
        var isMatch = btn.getAttribute('data-stream-tab') === key;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        if (isMatch && btn.id) {
          panel.setAttribute('aria-labelledby', btn.id);
        }
      });

      stagePill.className = data.pillClass;
      stagePill.textContent = data.pillText;
      stageRoute.textContent = data.route;
      stageHeading.textContent = data.heading;
      stageCopy.textContent = data.copy;

      stageCards.textContent = '';
      data.cards.forEach(function (cardData) {
        var card = document.createElement('div');
        card.className = 'stage-mini-card';

        var tag = document.createElement('span');
        tag.className = 'mono stage-mini-tag';
        tag.textContent = cardData.tag;

        var val = document.createElement('strong');
        val.textContent = cardData.value;

        card.appendChild(tag);
        card.appendChild(val);
        stageCards.appendChild(card);
      });
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateStream(btn.getAttribute('data-stream-tab'));
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Honest Clipboard Copy (bio-link.html)
     ------------------------------------------------------------------------ */
  function initCopyEmail() {
    var copyBtn = document.getElementById('copy-email');
    var feedback = document.getElementById('copy-feedback');
    if (!copyBtn || !feedback) return;

    function showFeedback(message, isManual) {
      feedback.textContent = message;
      feedback.classList.toggle('copy-feedback--manual', Boolean(isManual));
      feedback.hidden = false;
    }

    function fallbackExecCopy(text) {
      try {
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.top = '-9999px';
        area.style.left = '-9999px';
        document.body.appendChild(area);
        area.select();
        var ok = document.execCommand && document.execCommand('copy');
        document.body.removeChild(area);
        return Boolean(ok);
      } catch (_err) {
        return false;
      }
    }

    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-copy-email') || 'hello@albertstudio.site';

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function' && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () {
            showFeedback('Copied studio email: ' + email, false);
          },
          function () {
            if (fallbackExecCopy(email)) {
              showFeedback('Copied studio email: ' + email, false);
            } else {
              showFeedback('Copy manually: ' + email, true);
            }
          }
        );
      } else if (fallbackExecCopy(email)) {
        showFeedback('Copied studio email: ' + email, false);
      } else {
        showFeedback('Copy manually: ' + email, true);
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Dark Obsidian Interactive Booking Calendar Widget (#book)
     ------------------------------------------------------------------------ */
  var PACKAGES = {
    'site-launch': {
      label: 'Personal Site Launch ($3)',
      price: '$3'
    },
    'social-strategy': {
      label: 'Social Persona & Income Strategy ($5)',
      price: '$5'
    },
    'complete-suite': {
      label: 'Complete All-in-One Suite ($7)',
      price: '$7'
    }
  };

  var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  var WEEKDAY_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function pad2(num) {
    return num < 10 ? '0' + num : String(num);
  }

  function makeLocalKey(year, monthIndex, day) {
    return year + '-' + pad2(monthIndex + 1) + '-' + pad2(day);
  }

  function formatDisplayDate(year, monthIndex, day) {
    var d = new Date(year, monthIndex, day);
    return WEEKDAY_NAMES[d.getDay()] + ', ' + MONTH_NAMES[monthIndex] + ' ' + day + ', ' + year;
  }

  function isBookableLocalDate(year, monthIndex, day, minDateObj) {
    var candidate = new Date(year, monthIndex, day);
    var minStart = new Date(minDateObj.getFullYear(), minDateObj.getMonth(), minDateObj.getDate());
    if (candidate.getTime() < minStart.getTime()) return false;
    /* Monday (1) through Saturday (6) are bookable; Sunday (0) is closed */
    return candidate.getDay() !== 0;
  }

  function findFirstBookableDate(fromDate) {
    var cursor = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1);
    while (cursor.getDay() === 0) {
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1);
    }
    return cursor;
  }

  function validateReferenceUrl(raw) {
    var trimmed = raw.trim();
    if (!trimmed) {
      return { valid: true, value: '' };
    }

    /* Strictly require http:// or https:// and reject javascript:, data:, vbscript:, file:, etc. */
    var compactLower = trimmed.toLowerCase().replace(/[\u0000-\u0020]+/g, '');
    if (
      compactLower.indexOf('javascript:') === 0 ||
      compactLower.indexOf('data:') === 0 ||
      compactLower.indexOf('vbscript:') === 0 ||
      compactLower.indexOf('file:') === 0
    ) {
      return {
        valid: false,
        message: 'Only standard http:// or https:// website URLs are allowed.'
      };
    }

    if (!/^https?:\/\//i.test(trimmed)) {
      return {
        valid: false,
        message: 'Reference URL must start with http:// or https:// (for example, https://example.com).'
      };
    }

    try {
      var parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return {
          valid: false,
          message: 'Reference URL must use http:// or https://.'
        };
      }
      if (!parsed.hostname || parsed.hostname.indexOf('.') === -1) {
        return {
          valid: false,
          message: 'Please enter a valid domain name (for example, https://example.com).'
        };
      }
      return { valid: true, value: parsed.href };
    } catch (_err) {
      return {
        valid: false,
        message: 'Please enter a valid http:// or https:// website URL.'
      };
    }
  }

  function escapeIcsText(text) {
    return String(text || '')
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r\n|\r|\n/g, '\\n');
  }

  function formatUtcTimestamp(dateObj) {
    return (
      dateObj.getUTCFullYear() +
      pad2(dateObj.getUTCMonth() + 1) +
      pad2(dateObj.getUTCDate()) +
      'T' +
      pad2(dateObj.getUTCHours()) +
      pad2(dateObj.getUTCMinutes()) +
      pad2(dateObj.getUTCSeconds()) +
      'Z'
    );
  }

  function buildIcsContent(booking) {
    var timeParts = booking.time.split(':');
    var hourWib = parseInt(timeParts[0], 10);
    var minuteWib = parseInt(timeParts[1], 10);

    var startUtc = new Date(
      Date.UTC(booking.year, booking.monthIndex, booking.day, hourWib - 7, minuteWib, 0)
    );
    var endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000);
    var stampUtc = new Date();

    var summaryText = 'Discovery Call — ' + booking.packageLabel + ' (Albert Studio)';
    var descLines = [
      'Package: ' + booking.packageLabel,
      'Client: ' + booking.name + ' (' + booking.email + ')',
      'Slot: ' + booking.time + ' WIB (UTC+7)'
    ];
    if (booking.referenceUrl) {
      descLines.push('Reference URL: ' + booking.referenceUrl);
    }
    if (booking.notes) {
      descLines.push('Notes: ' + booking.notes);
    }

    var uid =
      'albert-studio-' +
      makeLocalKey(booking.year, booking.monthIndex, booking.day).replace(/-/g, '') +
      '-' +
      booking.time.replace(':', '') +
      '@albertstudio.site';

    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Albert Digital Presence Studio//Booking Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + uid,
      'DTSTAMP:' + formatUtcTimestamp(stampUtc),
      'DTSTART:' + formatUtcTimestamp(startUtc),
      'DTEND:' + formatUtcTimestamp(endUtc),
      'SUMMARY:' + escapeIcsText(summaryText),
      'DESCRIPTION:' + escapeIcsText(descLines.join('\n')),
      'LOCATION:' + escapeIcsText('Online Video / Chat — Albert Studio (WIB / UTC+7)'),
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    return lines.join('\r\n') + '\r\n';
  }

  function initBookingWidget() {
    var calendarDaysEl = document.getElementById('calendar-days');
    var monthLabelEl = document.getElementById('calendar-month-label');
    var prevBtn = document.getElementById('cal-prev');
    var nextBtn = document.getElementById('cal-next');
    var bookingForm = document.getElementById('booking-form');
    var formWrap = document.getElementById('booking-form-wrap');
    var confirmCard = document.getElementById('booking-confirmation');

    if (!calendarDaysEl || !monthLabelEl || !prevBtn || !nextBtn || !bookingForm) return;

    var pkgOptionBtns = Array.prototype.slice.call(document.querySelectorAll('[data-package-option]'));
    var pkgCtaBtns = Array.prototype.slice.call(document.querySelectorAll('[data-select-package]'));
    var slotBtns = Array.prototype.slice.call(document.querySelectorAll('[data-time-slot]'));

    var summaryPkgEl = document.getElementById('summary-package');
    var summaryDateEl = document.getElementById('summary-date');
    var summaryTimeEl = document.getElementById('summary-time');

    var nameInput = document.getElementById('full-name');
    var emailInput = document.getElementById('email');
    var refInput = document.getElementById('reference-url');
    var notesInput = document.getElementById('project-notes');

    var errName = document.getElementById('error-name');
    var errEmail = document.getElementById('error-email');
    var errRef = document.getElementById('error-reference');

    var confirmPkg = document.getElementById('confirm-package');
    var confirmDate = document.getElementById('confirm-date');
    var confirmTime = document.getElementById('confirm-time');
    var confirmName = document.getElementById('confirm-name');
    var confirmEmail = document.getElementById('confirm-email');
    var confirmRefRow = document.getElementById('confirm-reference-row');
    var confirmRef = document.getElementById('confirm-reference');
    var confirmNotesRow = document.getElementById('confirm-notes-row');
    var confirmNotes = document.getElementById('confirm-notes');

    var downloadIcsBtn = document.getElementById('download-ics-btn');
    var modifyBtn = document.getElementById('modify-booking-btn');

    var now = new Date();
    var firstBookable = findFirstBookableDate(now);
    var minMonthYear = firstBookable.getFullYear();
    var minMonthIndex = firstBookable.getMonth();

    var maxMonthDate = new Date(minMonthYear, minMonthIndex + 3, 1);
    var maxMonthYear = maxMonthDate.getFullYear();
    var maxMonthIndex = maxMonthDate.getMonth();

    var state = {
      packageId: 'complete-suite',
      viewYear: minMonthYear,
      viewMonth: minMonthIndex,
      selectedYear: firstBookable.getFullYear(),
      selectedMonth: firstBookable.getMonth(),
      selectedDay: firstBookable.getDate(),
      selectedTime: '09:00',
      confirmedBooking: null
    };

    function syncPackageUI() {
      var pkg = PACKAGES[state.packageId] || PACKAGES['complete-suite'];
      pkgOptionBtns.forEach(function (btn) {
        var isSelected = btn.getAttribute('data-package-option') === state.packageId;
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      });
      if (summaryPkgEl) {
        summaryPkgEl.textContent = pkg.label;
      }
    }

    function syncSummaryDateAndTime() {
      if (summaryDateEl) {
        summaryDateEl.textContent = formatDisplayDate(
          state.selectedYear,
          state.selectedMonth,
          state.selectedDay
        );
      }
      if (summaryTimeEl) {
        summaryTimeEl.textContent = state.selectedTime + ' WIB (UTC+7)';
      }
    }

    function selectPackage(pkgId, shouldScroll) {
      if (!PACKAGES[pkgId]) return;
      state.packageId = pkgId;
      syncPackageUI();

      if (confirmCard && !confirmCard.hidden && formWrap) {
        confirmCard.hidden = true;
        formWrap.hidden = false;
      }

      if (shouldScroll) {
        var bookSection = document.getElementById('book');
        if (bookSection) {
          bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    function renderCalendar() {
      monthLabelEl.textContent = MONTH_NAMES[state.viewMonth] + ' ' + state.viewYear;

      var atMinMonth = state.viewYear === minMonthYear && state.viewMonth === minMonthIndex;
      var atMaxMonth = state.viewYear === maxMonthYear && state.viewMonth === maxMonthIndex;

      prevBtn.disabled = atMinMonth;
      prevBtn.setAttribute('aria-disabled', atMinMonth ? 'true' : 'false');
      nextBtn.disabled = atMaxMonth;
      nextBtn.setAttribute('aria-disabled', atMaxMonth ? 'true' : 'false');

      calendarDaysEl.textContent = '';

      var firstOfMonth = new Date(state.viewYear, state.viewMonth, 1);
      var startWeekday = firstOfMonth.getDay();
      var daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();

      for (var i = 0; i < startWeekday; i += 1) {
        var spacer = document.createElement('span');
        spacer.className = 'cal-spacer';
        spacer.setAttribute('aria-hidden', 'true');
        calendarDaysEl.appendChild(spacer);
      }

      var selectedKey = makeLocalKey(state.selectedYear, state.selectedMonth, state.selectedDay);

      for (var day = 1; day <= daysInMonth; day += 1) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal-day';
        btn.textContent = String(day);

        var dayKey = makeLocalKey(state.viewYear, state.viewMonth, day);
        var bookable = isBookableLocalDate(state.viewYear, state.viewMonth, day, firstBookable);
        var fullLabel = formatDisplayDate(state.viewYear, state.viewMonth, day);

        btn.setAttribute('aria-label', fullLabel);
        btn.setAttribute('data-date-key', dayKey);

        if (!bookable) {
          btn.disabled = true;
          btn.setAttribute('aria-pressed', 'false');
        } else {
          var isSelected = dayKey === selectedKey;
          btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
          (function (y, m, d) {
            btn.addEventListener('click', function () {
              state.selectedYear = y;
              state.selectedMonth = m;
              state.selectedDay = d;
              renderCalendar();
              syncSummaryDateAndTime();
            });
          })(state.viewYear, state.viewMonth, day);
        }

        calendarDaysEl.appendChild(btn);
      }
    }

    prevBtn.addEventListener('click', function () {
      if (prevBtn.disabled) return;
      var prevDate = new Date(state.viewYear, state.viewMonth - 1, 1);
      state.viewYear = prevDate.getFullYear();
      state.viewMonth = prevDate.getMonth();
      renderCalendar();
    });

    nextBtn.addEventListener('click', function () {
      if (nextBtn.disabled) return;
      var nextDate = new Date(state.viewYear, state.viewMonth + 1, 1);
      state.viewYear = nextDate.getFullYear();
      state.viewMonth = nextDate.getMonth();
      renderCalendar();
    });

    pkgOptionBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectPackage(btn.getAttribute('data-package-option'), false);
      });
    });

    pkgCtaBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectPackage(btn.getAttribute('data-select-package'), true);
      });
    });

    slotBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slot = btn.getAttribute('data-time-slot');
        if (!slot) return;
        state.selectedTime = slot;
        slotBtns.forEach(function (other) {
          other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
        });
        syncSummaryDateAndTime();
      });
    });

    function setFieldError(input, errorEl, message) {
      if (!input || !errorEl) return;
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
      } else {
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
      }
    }

    [nameInput, emailInput, refInput].forEach(function (fieldEl) {
      if (!fieldEl) return;
      fieldEl.addEventListener('input', function () {
        if (fieldEl === nameInput) setFieldError(nameInput, errName, '');
        if (fieldEl === emailInput) setFieldError(emailInput, errEmail, '');
        if (fieldEl === refInput) setFieldError(refInput, errRef, '');
      });
    });

    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var nameVal = nameInput ? nameInput.value.trim() : '';
      var emailVal = emailInput ? emailInput.value.trim() : '';
      var refRaw = refInput ? refInput.value.trim() : '';
      var notesVal = notesInput ? notesInput.value.trim() : '';

      var firstInvalid = null;

      if (!nameVal) {
        setFieldError(nameInput, errName, 'Please enter your full name.');
        firstInvalid = firstInvalid || nameInput;
      } else {
        setFieldError(nameInput, errName, '');
      }

      if (!emailVal || !EMAIL_REGEX.test(emailVal)) {
        setFieldError(emailInput, errEmail, 'Please enter a valid email address (for example, name@domain.com).');
        firstInvalid = firstInvalid || emailInput;
      } else {
        setFieldError(emailInput, errEmail, '');
      }

      var refCheck = validateReferenceUrl(refRaw);
      if (!refCheck.valid) {
        setFieldError(refInput, errRef, refCheck.message);
        firstInvalid = firstInvalid || refInput;
      } else {
        setFieldError(refInput, errRef, '');
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var pkg = PACKAGES[state.packageId] || PACKAGES['complete-suite'];
      var displayDate = formatDisplayDate(state.selectedYear, state.selectedMonth, state.selectedDay);

      state.confirmedBooking = {
        packageId: state.packageId,
        packageLabel: pkg.label,
        year: state.selectedYear,
        monthIndex: state.selectedMonth,
        day: state.selectedDay,
        displayDate: displayDate,
        time: state.selectedTime,
        name: nameVal,
        email: emailVal,
        referenceUrl: refCheck.value,
        notes: notesVal
      };

      /* Strictly XSS-safe rendering using textContent */
      if (confirmPkg) confirmPkg.textContent = state.confirmedBooking.packageLabel;
      if (confirmDate) confirmDate.textContent = state.confirmedBooking.displayDate;
      if (confirmTime) confirmTime.textContent = state.confirmedBooking.time + ' WIB (UTC+7)';
      if (confirmName) confirmName.textContent = state.confirmedBooking.name;
      if (confirmEmail) confirmEmail.textContent = state.confirmedBooking.email;

      if (confirmRefRow && confirmRef) {
        if (state.confirmedBooking.referenceUrl) {
          confirmRef.textContent = state.confirmedBooking.referenceUrl;
          confirmRefRow.hidden = false;
        } else {
          confirmRef.textContent = '';
          confirmRefRow.hidden = true;
        }
      }

      if (confirmNotesRow && confirmNotes) {
        if (state.confirmedBooking.notes) {
          confirmNotes.textContent = state.confirmedBooking.notes;
          confirmNotesRow.hidden = false;
        } else {
          confirmNotes.textContent = '';
          confirmNotesRow.hidden = true;
        }
      }

      if (formWrap && confirmCard) {
        formWrap.hidden = true;
        confirmCard.hidden = false;
        confirmCard.focus();
      }
    });

    if (downloadIcsBtn) {
      downloadIcsBtn.addEventListener('click', function () {
        if (!state.confirmedBooking) return;
        var icsBody = buildIcsContent(state.confirmedBooking);
        var blob = new Blob([icsBody], { type: 'text/calendar;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'albert-studio-booking.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 1000);
      });
    }

    if (modifyBtn) {
      modifyBtn.addEventListener('click', function () {
        if (confirmCard && formWrap) {
          confirmCard.hidden = true;
          formWrap.hidden = false;
          if (nameInput) nameInput.focus();
        }
      });
    }

    try {
      var params = new URLSearchParams(window.location.search);
      var requestedPkg = params.get('package');
      if (requestedPkg && PACKAGES[requestedPkg]) {
        state.packageId = requestedPkg;
      }
    } catch (_err) {
      /* Ignore malformed query params gracefully */
    }

    syncPackageUI();
    renderCalendar();
    syncSummaryDateAndTime();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileDrawer();
    initHeroStreamPreview();
    initCopyEmail();
    initBookingWidget();
  });
})();
