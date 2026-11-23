# REDESIGN AUDIT — Multi-Website Portfolio Ecosystem (Phase 1)

**Status:** Phase 1 — Read-Only Audit & Discovery (Verified)  
**Owner:** Albert  
**Repository:** `https://github.com/zhar-beep/TestingSite` (Local HEAD: `c554b0c`, branch `main`)  
**Live Deployment:** `https://zhar-beep.github.io/TestingSite/`  
**Audit Date:** 2026-11-23  

---

## 0. Metodologi, Ruang Lingkup & Batas Pengukuran (Transparansi Penuh)

### Yang Benar-Benar Diperiksa & Diverifikasi
- **Inspeksi Source Code Lokal:** Seluruh **26 file** dalam repository (**9 HTML, 4 CSS, 4 JS, 6 JPG**, `.gitignore`, `.nojekyll`, `read.md`), ditambah `git status`, `git remote`, dan `git log`.
- **Verifikasi Parity Live vs. Lokal:** Seluruh **23 file web publik** (9 HTML, 4 CSS, 4 JS, 6 JPG) di `https://zhar-beep.github.io/TestingSite/` diambil langsung dan dibandingkan dengan source lokal. **Hasil: 100% identik** (perbedaan byte pada file teks hanya Windows CRLF lokal vs. Unix LF di GitHub Pages; seluruh 6 JPG identik secara SHA-256).
- **Inspeksi Browser Live (Playwright CLI / Headless Chromium):** Seluruh halaman aktif diuji pada 4 viewport target (`1440×900`, `1280×800`, `390×844`, `360×800`) + emulasi `prefers-reduced-motion: reduce`, pengukuran bounding-box/overflow, ukuran touch target, console/network error, serta pengujian alur interaktif (tabs, mobile drawer, modal, filter, validasi form, XSS escaping, dan download `.ics`).
- **Audit Matematis & Statis:** Rasio kontras WCAG 2.1 dihitung secara matematis pada 32 pasangan warna aktif; integritas relative path & `#anchor` dicek di seluruh 9 file HTML (**0 broken internal links, 0 missing `#anchor` IDs**); dimensi & ukuran byte gambar diukur langsung dari header file.

### Yang TIDAK Diukur / Tidak Dapat Diverifikasi (Tidak Boleh Diasumsikan)
- **Telemetri Performa Nyata:** Real-device FPS, physical iOS/Android touch-scroll latency, Core Web Vitals (`LCP`, `INP`, `CLS` di jaringan mobile throttled), dan skor Lighthouse **tidak diukur**.
- **Output Screen Reader Nyata:** Output suara NVDA, JAWS, dan VoiceOver **tidak diuji secara langsung** (audit aksesibilitas berbasis semantik DOM/ARIA, fokus keyboard, dan perhitungan kontras).
- **Kepemilikan Domain, Bisnis & Identitas Eksternal:** Belum terverifikasi apakah `hello@albertstudio.site`, `albertstudio.site`, `serenaflow.studio`, `valeclarity.com`, atau `marcus@valeclarity.com` benar-benar terdaftar/aktif, serta detail produk/harga/sosmed nyata yang ingin digunakan Albert.

---

## 1. Ringkasan Arsitektur Repository & Isu Lintas-Situs

Seluruh ekosistem saat ini dibangun dengan **100% Vanilla Static HTML5 + CSS + JavaScript** — tanpa framework, tanpa `package.json`, tanpa bundler, tanpa backend, tanpa database/Supabase, dan tanpa library JS eksternal. Satu-satunya request eksternal hanyalah Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`).

| Area / Situs | File Aktif (Ukuran / Baris) | File Legacy / Paralel | Aset Gambar |
| :--- | :--- | :--- | :--- |
| **Root** | `index.html` (898 B / 32L), `.nojekyll` (0 B), `.gitignore` (185 B) | — | 0 |
| **1. Albert (`website/`)** | `index.html` (44.05 KB / 928L), `bio-link.html` (6.93 KB / 146L), `styles.css` (44.57 KB / 2,268L), `app.js` (28.72 KB / 813L) | — | **0 gambar** |
| **2. Serena (`projects/serena-flow-yoga-concept/`)** | `serena-test.html` (24.69 KB / 534L), `serena-bio-test.html` (13.42 KB / 301L), `styles-test.css` (33.17 KB / 1,693L), `app-test.js` (21.47 KB / 606L) | `index.html` (417L), `bio-link.html` (288L), `styles.css` (1,184L), `app.js` (245L) — *masih live di root folder Serena!* | **3 JPG = 2.32 MiB** (`2.44 MB` / `2,436,481 B`) |
| **3. Marcus (`projects/marcus-vale-mentor-concept/`)** | `index.html` (51.19 KB / 1,016L), `bio-link.html` (18.81 KB / 404L), `styles.css` (60.06 KB / 2,955L), `app.js` (41.62 KB / 1,124L) | — | **3 JPG = 636 KB** (`651,157 B`) |

### Temuan Teknis Kritis Lintas-Situs
1. **Perangkap `.gitignore:3` (`website/assets/`):** Baris ke-3 `.gitignore` mengabaikan folder `website/assets/`. Jika Albert nanti menambahkan foto portrait asli atau screenshot template ke `website/assets/`, Git akan diam-diam mengabaikannya dan live GitHub Pages akan mengalami 404. **Wajib diperbaiki sebelum implementasi Phase 2.**
2. **Console Error 404 (`/favicon.ico`):** Terjadi di seluruh halaman Albert (`index.html`, `website/index.html`, `website/bio-link.html`) dan Marcus (`index.html`, `bio-link.html`) karena tidak ada deklarasi `<link rel="icon">`. Hanya Serena yang memiliki inline SVG favicon.
3. **Duplikasi Logika Booking & Ambiguitas Timezone `.ics`:** Sistem kalender + generator `.ics` ditulis ulang 3 kali secara terpisah (`website/app.js`, `serena/app-test.js`, `marcus/app.js`). Albert mengonversi WIB (`UTC+7`) ke UTC (`...Z`), sedangkan Serena & Marcus menampilkan label `"EST / Local Time"` namun menulis timestamp floating local (`DTSTART:YYYYMMDDTHHMMSS` tanpa `TZID`/`Z`) sehingga membingungkan lintas zona waktu.
4. **Ketidakkonsistenan Script & Meta SEO:** Semua 9 file HTML tidak memiliki tag Open Graph (`og:title`, `og:description`, `og:image`) dan `<link rel="canonical">`. Tag `<script>` pada Albert (`website/index.html:926`) dan Serena (`serena-test.html:532`) belum memakai `defer` (hanya Marcus yang memakai `defer`).
5. **Keamanan & XSS (Baik):** Nol `fetch()`/`XHR`, nol inline event handler (`onclick=`), nol `target="_blank"` (belum ada risiko tabnabbing; nanti saat link eksternal asli ditambahkan wajib gunakan `rel="noopener noreferrer"`), dan seluruh rendering dinamis di file aktif memakai `textContent` (teruji aman terhadap payload `<img src=x onerror=alert(1)>` dan `<script>alert(1)</script>`).

---

## 2. Audit Website 1 — Albert Personal Website (`website/`)

**URL Live:** `https://zhar-beep.github.io/TestingSite/website/index.html` (+ `bio-link.html`, redirect dari root `index.html`)  
**Prioritas:** Tertinggi (Redesign Utama ke arah **D. Hybrid Editorial**)

### Current State
Diposisikan sebagai agensi mikro dark-mode: *"Albert — Social-to-Income Digital Studio"* (`website/index.html:6`), penuh jargon konversi SaaS (*"Turn Your Social Presence Into Income"*, *"Grand Opening · First 10 Founding Spots"*, *"~$0.23/day · 30 days!"*). Total panjang halaman `7,087px` di desktop (`1440×900`) dan `12,890px` di mobile (`360×800`), berisi **1,138 kata**, **50 elemen pill/chip/badge**, **16 tombol `.btn`**, dan **0 tag `<img>`**.

### Strengths
- Fondasi engineering static vanilla yang bersih, cepat, dan aman dari XSS (`textContent`, validasi ketat `http://`/`https://` menolak `javascript:`/`data:` di `app.js:330-378`).
- Kontras warna WCAG 2.1 AA/AAA sangat kuat pada seluruh teks aktif (`#F4F4F5` pada `#111214` = `17.05:1`, `#111214` pada `#F59E0B` = `8.73:1`).
- Mobile drawer sudah mendukung `Tab` focus trap, `Escape`, backdrop close, dan focus restoration (`app.js:14-103`); `prefers-reduced-motion: reduce` sudah diimplementasikan (`styles.css:78-89`).
- Nol horizontal overflow (`0px`) di keempat viewport.

### Weaknesses & Visual / UX Issues
- **Nol Kehadiran Manusia:** Tidak ada foto portrait, tidak ada bagian "About Albert", tidak ada eksperimen kreatif atau catatan personal.
- **Kontradiksi Tujuan Bisnis:** Tujuan bisnis utama Albert adalah memamerkan dan menjual website templates (`read.md:86`), tetapi website saat ini justru mempromosikan *"Zero Recycled Templates"* (`website/index.html:308, 523`) dan **tidak menampilkan satu pun template untuk dijual**.
- **Karya Asli Terkubur Jauh di Bawah Pitch Sales:** Seksi `#live-work` baru muncul di urutan ke-5 (`y = 4,076px` desktop; `y = 7,190px` mobile!) setelah ribuan piksel penawaran `$3/$5/$7` dan studi kasus fiktif `@alex.creates`. Selain itu, preview karya hanya berupa wireframe CSS `.mini-browser`, bukan tampilan visual asli, dan terdapat typo domain `www.serenah.site` (`:329`) vs `serenaflow.site` (`:534`).
- **Kepadatan Elemen SaaS Berlebih:** 4 warna aksen bertarung bersamaan (`#F59E0B`, `#10B981`, `#FB7185`, `#A78BFA`), 50 pills/chips, 8 dari 16 tombol mendorong ke funnel `#book`, dan 4 dari 5 tautan teratas di `bio-link.html` menjual paket `$3–$7`.
- **Dead-End UX pada Form Booking:** Tombol `"Confirm Booking Request"` (`index.html:836`) hanya membuat konfirmasi lokal + unduhan `.ics` tanpa mengirim pesan ke Albert, berisiko membuat calon klien mengira pesannya terkirim.

### Technical, Accessibility & Mobile Issues
- **Duplicate `banner` landmark (`website/index.html:17-18`):** `<header class="floating-nav-wrap">` membungkus `<div class="floating-pill" role="banner">`.
- **WAI-ARIA Tabs tidak lengkap (`app.js:159-214`):** `#tab-ebooks` dkk. tidak merespons tombol panah keyboard (`ArrowDown`/`ArrowRight`); `role="tabpanel"` memakai `aria-live="polite"` (`:205`) yang terlalu berisik bagi screen reader.
- **Touch target `360×800`:** 30 tombol `.cal-day` menyusut menjadi `41×44px` (di bawah standar lebar `44px`).
- **Orphan separator di mobile:** `.hero-meta-strip` menyisakan garis miring `/` menggantung di ujung baris pertama pada `390×844` dan `360×800`.
- **Unused font weights:** `Space Grotesk:600` dan `JetBrains Mono:500` dimuat namun tidak digunakan di DOM.
- **Desktop nav gap:** Tautan `Personal Hub` (`bio-link.html`) ada di mobile drawer & footer, tetapi absen di desktop nav.

### Klasifikasi 5 Kategori (Albert)
| Kategori | Elemen Teridentifikasi |
| :--- | :--- |
| **Working Functionality** | Root redirect (`index.html`), mobile drawer + focus trap, hero 4-tab switcher, pricing-to-booking & `?package=` query sync, kalender +3 bulan (non-Minggu), validasi form & URL ketat, render konfirmasi aman XSS, ekspor `.ics` lokal, FAQ `<details>`, copy email di `bio-link.html`, 4 tautan live ke Serena & Marcus (semua HTTP 200). |
| **Visual Placeholders** | Wireframe CSS `.mini-browser` (`index.html:532-584`), monogram SVG `"A"`, domain contoh `www.yourname.site` & `www.serenah.site` (`:329`), placeholder input form (`Maya Lin`). |
| **Demonstration Content** | Mockup browser 4-tab hero (`index.html:122-230`), studi kasus Before/After `@alex.creates` (`:422-515`), konsep showcase Serena & Marcus, booking lokal `.ics`. |
| **Unsupported Claims** | `"Grand Opening · First 10 Founding Spots"` (`:97, 319, 334, 622`), `"$0/mo Hosting Forever"` & `"Year-1 .site Included"` (`:116-118, 334, 353, 399`), `"Zero Recycled Templates"` (`:308, 523`), klaim analytics/brand partnerships (`:286, 375-376`), SLA 30 hari revisi unlimited untuk `$7` (`:401, 648-654`), `"0% FEES · $0/MO"` (`:133`), kepemilikan `hello@albertstudio.site` belum terverifikasi. |
| **Broken / Incomplete** | Console 404 `/favicon.ico`; form booking tidak mengirim data ke Albert; tidak ada showcase/alur pembelian template nyata; duplicate `role="banner"`; missing keyboard arrow nav di tablist; `.cal-day` `41px` di `360×800`. |

---

## 3. Audit Website 2 — Serena Flow Yoga (`projects/serena-flow-yoga-concept/`)

**URL Live:** `https://zhar-beep.github.io/TestingSite/projects/serena-flow-yoga-concept/serena-test.html` (+ `serena-bio-test.html`)  
**Prioritas:** Kedua (Refinement — **BUKAN** penggantian identitas)

### Current State
Terdapat dua versi berdampingan dalam satu folder: **v1 legacy** (`index.html`, palet linen `#f7f3ec`, form statis, email `hello@serenaflow-concept.example`) yang masih diakses jika seseorang membuka root folder Serena, dan **v2 upgrade variant** (`serena-test.html`, palet mineral stone `#eeece7`/`#e4e1da`, kalender booking 4 langkah, email `hello@serenaflow.studio`). V2 inilah yang menjadi referensi atmosfer editorial tenang favorit Albert.

### Strengths
- **Harmoni Warna & Kontras Prima:** Sistem 60/30/10 wellness organik (`#eeece7`, `#e4e1da`, `#ffffff`, deep botanical olive `#24342b`, terracotta `#964c34`/`#86422c`) lulus WCAG AA pada seluruh pasangan warna, bahkan 14+ pasangan mencapai AAA (`#1d231f` pada `#eeece7` = `13.55:1`; `#f7f5f0` pada `#24342b` = `12.04:1`).
- **Tipografi & Fotografi Kohesif:** `Cormorant Garamond` + `Plus Jakarta Sans` ter-render elegan, ketiga foto menyatu dengan palet limestone/cork/olive, tanpa klaim testimoni palsu, tanpa fake checkout, tanpa angka klien fiktif.
- **Fungsionalitas Interaktif Kaya & Berjalan Baik:** Kalender lokal 4 langkah, sinkronisasi `?offering=`, ekspor `.ics`, "Modify Time", filter Essentials (`serena-bio-test.html`), modal Partner dengan focus trap + focus restoration, serta inline SVG favicon (nol console error).

### Weaknesses, UX, Responsive & Technical Issues
1. **[HIGH] Nol Dukungan `prefers-reduced-motion`:** Baik `styles-test.css` maupun `styles.css` tidak memiliki aturan `@media (prefers-reduced-motion: reduce)`. Terbukti di Playwright: `scroll-behavior: smooth` dan transisi `0.2s` tetap berjalan saat user meminta reduced motion.
2. **[HIGH] Bug Overflow Kalender di `360×800`:** Karena `.cal-day` memaksa `min-width: 44px` (`styles-test.css:1678-1680`) pada grid 7 kolom (`326px` total), `#cal-days` (ujung kanan `351px`) **meluap `+16px` keluar dari inner content box `.booking-shell` (`335px`) dan menembus `+3px` melewati border kanan luar `.booking-shell` (`348px`)**.
3. **[HIGH] Bug Visual Affordance Kalender di `<= 480px`:** Pada `styles-test.css:1667-1671`, `.booking-calendar-panel` diubah menjadi `background: transparent; border: none;` di atas `.booking-shell` putih (`#ffffff`), membuat tombol `.cal-day` putih (`border-color: transparent`) menyatu tak terlihat pada background putih di `390×844` dan `360×800`.
4. **[HIGH] Kontradiksi Jadwal (`#schedule`) vs. Booking (`#booking`):** `#schedule` (`serena-test.html:222-253`) mencantumkan *Morning Mobility Flow* Senin `07:30`, Rabu `18:00`, Jumat `19:00`, namun `#booking` (`:358-416`) hanya menyediakan slot Mon–Sat `09:00 / 11:00 / 14:30 / 17:00` (`07:30` tidak tersedia sama sekali, kelas Rabu/Jumat tidak bisa dipilih).
5. **[MEDIUM] Aset Gambar Berat Tanpa Lazy Load (`2.32 MiB` / `2.44 MB`):** `hero-studio.jpg` (`752.3 KB`, `1200×896` vs atribut `1200×900`), `coach-portrait.jpg` (`765.4 KB`, `1024×1024` — juga diunduh utuh untuk avatar `112×112` di `serena-bio-test.html`!), dan `curated-gear.jpg` (`861.6 KB`, `1376×768` vs `1200×675`). Semua dimuat eager tanpa `loading="lazy"` maupun `fetchpriority="high"`.
6. **[MEDIUM] Interaksi Kaku & Aksesibilitas Drawer/Form/Modal:**
   - Panel interaktif (`#mobile-drawer`, FAQ `<details>`, `#booking-confirmation`, filter Essentials, `#partner-modal`) berpindah mendadak (`display: none/block`).
   - `#mobile-drawer` (`serena-test.html:57`) tidak punya `role="dialog"`, backdrop click-outside, focus trap, scroll lock, maupun auto-close saat resize `> 760px`.
   - `#booking-name` & `#booking-email` belum terhubung via `aria-describedby` ke elemen error, dan error tidak hilang otomatis saat mengetik.
   - `#cal-days` belum memakai roving `tabindex` + navigasi panah (user keyboard harus Tab melewati hingga 26 hari).
   - `.nav-links a` hanya setinggi `29px` (sempit untuk tablet sentuh `761–1024px`); `Personal Hub` hilang dari desktop nav; `#essentials-count` di `serena-bio-test.html:91` belum memakai `aria-live="polite"`; `<main>` belum `inert` saat modal terbuka.
7. **[LOW] Hygiene & Copy Bocor:** Terdapat **7 inline `style=""`** (`serena-test.html:263, 422, 449, 462, 465`; `serena-bio-test.html:279, 295`), fungsi tak terpakai `escapeHtml()` (`app-test.js:590-597`), `transition: all` (`styles-test.css:1059, 1461`), orphan word pada heading (`text-wrap: balance` belum dipakai), label `"EST / Local Time"` kontradiktif dengan `.ics` floating local, serta **copy template bocor** di `serena-test.html:451` (*"connects seamlessly to Cal.com, Calendly, or your inbox upon launch."*).

### Klasifikasi 5 Kategori (Serena)
| Kategori | Elemen Teridentifikasi |
| :--- | :--- |
| **Working Functionality** | Sticky header + `scroll-margin-top: 88px`, mobile drawer toggle/`Escape`, offering CTA & `?offering=` sync, kalender booking +3 bulan (Mon–Sat), validasi form + konfirmasi aman XSS, ekspor `.ics`, "Modify Time", FAQ `<details>`, filter Essentials, Partner modal (focus trap + restore), copy email. |
| **Visual Placeholders** | URL contoh `partner-store.example/...?ref=serenaflow` (`serena-bio-test.html:136-266`), email/handle konsep `hello@serenaflow.studio` & `@serenaflow.studio`, 3 foto konsep studio/coach/props. |
| **Demonstration Content** | Persona fiktif "Serena Hart", harga contoh `$28 / $85 / $160`, jadwal kelas mingguan, 6 produk kurasi brand fiktif (`Earthline Wellness`, `Form & Studio Supply`, `Stillwater Goods`), banner `CONCEPT PROJECT · UPGRADE TEST VARIANT`. |
| **Unsupported Claims / Transparency Risks** | Konfirmasi booking mengklaim `"Request Confirmed"` / `"Your session slot is reserved"` (`serena-test.html:461-462`) dan `"Link sent prior to class"` di `.ics` (`app-test.js:404`) padahal statis lokal; copy bocor Cal.com/Calendly (`:451`); `#partner-modal` di `serena-bio-test.html:284-297` menghilangkan catatan demo preview yang sebelumnya ada di v1. |
| **Broken / Incomplete** | Overflow `+16px` inner / `+3px` outer di `360×800`; tombol tanggal putih tak terlihat di `<= 480px`; kontradiksi jadwal `#schedule` vs `#booking`; nol `prefers-reduced-motion`; dual-track file v1 (`index.html`) vs v2 (`serena-test.html`) belum dikonsolidasi. |

---

## 4. Audit Website 3 — Marcus Vale (`projects/marcus-vale-mentor-concept/`)

**URL Live:** `https://zhar-beep.github.io/TestingSite/projects/marcus-vale-mentor-concept/index.html` (+ `bio-link.html`)  
**Prioritas:** Ketiga (Repositioning Menyeluruh — Menghapus Funnel Sales & Afiliasi)

### Current State
Diposisikan sebagai *"Marcus Vale — Vale Clarity"* dengan palet *"Warm Woody Editorial V2"* (Sand `#DFD5C7`, Espresso `#231914`, Cognac `#C88A3B`, Claret `#6E242E`). Panjang halaman desktop mencapai **`8,106px`**, didominasi funnel info-product `$19` E-Book, upsell `$39` Bundle, simulasi video pendek YouTube/TikTok/IG, coaching tiers, serta etalase afiliasi `My Reading & Setup` / `bio-link.html#my-stack`.

### Strengths
- **Identitas Warna & Kontras Kuat dan Unik:** Espresso + warm sand + cognac brass terasa serius dan jelas berbeda dari Albert maupun Serena. Seluruh pasangan teks aktif lulus WCAG AA (`5.02:1` hingga `15.05:1`).
- **Engineering Interaktif Solid:** Modal E-Book (switch edisi & bab), filter video + `aria-live`, query param `?offering=`, kalender weekday-only + `.ics`, `prefers-reduced-motion: reduce` aktif (`styles.css:82-92`), `defer` pada `<script>`, nol XSS sink (`textContent`), serta ukuran 3 gambar jauh lebih hemat (`636 KB` total dengan `fetchpriority="high"` di hero & `loading="lazy"` di bawah fold).

### Weaknesses, Brand / Visual / UX Issues
1. **Funnel Jualan Mengalahkan Kredibilitas Personal:** Di atas fold (`index.html:22-159`), sebelum satu pun filosofi atau gagasan muncul, pengunjung langsung disodori **4 titik jualan E-Book `$19`** (nav link `E-Book`, tombol claret `Get the E-Book`, primary CTA `Buy the E-Book — $19`, dan `.hero-book-card` mengambang). **Tidak ada seksi About, Filosofi, maupun Esai/Gagasan.**
2. **Arsitektur Affiliate Marketer Sangat Kental:** Navbar menempatkan `My Setup` (`index.html:37`) sebagai link utama; Section 05 (`:760-816`) melabeli 3 item dengan `PARTNER LINK`; dan lebih dari separuh `bio-link.html` (`:105-267`) berupa 6 kartu afiliasi buku/mikrofon/timer dengan modal partner tak aktif.
3. **Bug Tabrakan Visual Hero (HIGH):** Pada `1440×900` dan `1280×800`, `.hero-book-card` (`styles.css:741-757`) menimpa `.hero-portrait__caption` tepat sebesar **`284×34px`** (menutupi 100% tinggi caption dan memotong nama `"Marcus"` menjadi `"cus Vale — Vale Clarity"`), serta terpotong `43px` di bawah fold `1280×800` (`y = 843px`).
4. **Kelelahan Visual & Aset Berulang:** `8,106px` penuh kotak-dalam-kotak gelap, 4 palet pill pastel + `IBM Plex Mono` berlebihan, mockup 3D CSS buku (`.book-3d`, `styles.css:786-927`) yang berkesan click-funnel, serta 3 foto diulang di 7 slot `<img>` (termasuk menyamar sebagai 4 thumbnail video).
5. **Copy Template Bocor:** `index.html:713` berbunyi *"Interactive scheduling preview — connects seamlessly to Cal.com, Calendly, or your studio inbox upon launch."*

### Technical, Accessibility & Mobile Issues
- **Overflow Kalender `360×800` (Verified Live):** `.day-btn` (`min-width: 44px`, `styles.css:2931-2935`) menyebabkan `#calendar-days` meluap **`+3px`** (`clientW: 304`, `scrollW: 307`, `maxBtnR: 335 > gridRight: 332`) dengan tombol hari saling menempel tanpa celah; kedua `.tz-badge` terpecah 2 baris (`height: 45px`, `"Mon- / Fri"`).
- **Mobile Drawer Tanpa `Tab` Focus Trap (`app.js:283-340`):** Meski `#mobile-drawer` memakai `role="dialog" aria-modal="true"` (`index.html:59`), fokus keyboard bisa bocor keluar saat menekan `Tab`.
- **Console 404 `/favicon.ico`** pada `index.html` dan `bio-link.html`.
- **Paradoks `aria-disabled="true"`** pada tombol modal yang tetap bisa diklik (`index.html:1000-1008`, `bio-link.html:320-328`); ambiguitas `"EST / Local Time"` vs `.ics` floating local; duplikasi markup `#ebook-modal` antara `index.html` dan `bio-link.html`; `Fraunces` italic `500` diimpor namun belum dipakai.

### Klasifikasi 5 Kategori (Marcus)
| Kategori | Elemen Teridentifikasi |
| :--- | :--- |
| **Working Functionality** | Sticky masthead, mobile drawer toggle/`Escape`/backdrop, `#ebook-modal` (edisi/bab + Tab trap), filter video + `#video-modal`, `?offering=` sync, kalender Mon–Fri + validasi + konfirmasi + `.ics` download + "Modify Time", FAQ `<details>`, copy email & filter `#my-stack` + `#partner-modal` di `bio-link.html`. |
| **Visual Placeholders** | Bar konsep `CONCEPT PROJECT · PORTFOLIO SHOWCASE`, 3 foto konsep (termasuk 4 thumbnail video palsu dari still photo), 3D CSS hardcover book, `marcus@valeclarity.com`, input placeholder `Jordan Alvarez`. |
| **Demonstration Content** | 3 cuplikan bab fiktif (`app.js:59-72`), 4 ringkasan video simulasi (`app.js:74-135`), checkout non-transaksional, kalender booking statis, 6 kartu buku/alat meja di `bio-link.html`. |
| **Unsupported Claims (7 Kategori Itemized)** | 1) Gelar `"Author · Keynote Speaker · Executive Mentor"` (`index.html:86`). 2) Buku fiktif *"Speak With Calm Authority"* 2nd Edition, 142 hal, 18 skrip, `$19` (`:104-256`). 3) Bundle `$39` + audio studio 90 menit + 12 template + lifetime updates (`:260-279, 842`). 4) Kanal YouTube/TikTok/IG aktif & 4 video durasi spesifik `"Recorded live in the timber workshop auditorium"` (`app.js:81`). 5) Basis klien global (`North America, Europe, Asia-Pacific`, `:863`), `"limited monthly roster"` (`:472`), `"most readers begin with..."` (`:170`). 6) Endorsement setup harian palsu (`"Everything here is part of my real daily setup"`, `:786`). 7) Identitas studio `Vale Clarity` & domain `valeclarity.com` belum terverifikasi. |
| **Broken / Incomplete** | Tabrakan visual `284×34px` `.hero-book-card` menimpa caption hero; overflow `+3px` `#calendar-days` & wrapping `.tz-badge` di `360×800`; mobile drawer tanpa `Tab` focus trap; console 404 `/favicon.ico`; destinasi checkout/video/partner non-aktif; ambiguitas timezone `"EST / Local Time"`. |

---

## 5. Ketersediaan Global Toolkit (Terverifikasi Lokal)

| Tool / Skill | Status Lokal Terverifikasi | Relevansi & Rekomendasi |
| :--- | :--- | :--- |
| **Playwright CLI** | **Tersedia** (`0.1.25` + skill) | **Tinggi** — Wajib untuk QA multi-viewport & reduced-motion di Phase 2. |
| **UI/UX Pro Max** | **Tersedia** (`2.15.0` + skill + Python 3.13) | **Tinggi (Phase 1)** — Dipakai untuk verifikasi tipografi, palet, dan pola UX. |
| **SkillUI** | **Tersedia** (`1.3.4` + skill) | **Opsional** — Token CSS lokal sudah diaudit langsung; berguna bila membedah situs referensi eksternal. |
| **Motion** | **Parsial** (Skill + docs lokal; MCP terkonfigurasi; npm belum terpasang di repo) | **Selektif** — Gunakan best practices-nya; default Phase 2 cukup CSS + `IntersectionObserver` (lihat `MOTION_AND_INTERACTION_SPEC.md`). |
| **Lenis** | **Skill saja** (npm belum terpasang) | **Tidak Direkomendasikan** — Native scroll lebih tepat untuk ketiga situs ini. |
| **Context7** | **Tidak aktif di `mcp_config.json`** | **Rendah** — Stack vanilla tidak butuh API framework kompleks; alternatif: MDN / docs resmi. |
| **Supabase** | **Tidak tersedia** (CLI tidak di PATH; MCP non-aktif) | **Tidak Diperlukan** — Tidak ada kebutuhan database/backend pada situs statis ini. |
| **Strix** | **Tidak tersedia** (CLI tidak di PATH) | **Tidak Diperlukan** — Permukaan statis tanpa backend/auth sudah diaudit secara statis & XSS live. |

---

## 6. Rekomendasi Prioritas Lintas-Ekosistem

1. **P0 — Repo Hygiene Sebelum Implementasi:** Perbaiki `.gitignore:3` (`website/assets/`), tambahkan `<link rel="icon">` SVG di seluruh halaman Albert & Marcus, dan lengkapi meta Open Graph/canonical.
2. **P1 — Redesign Utama Website Albert (`website/`):** Rombak total dari dark SaaS funnel ke **Hybrid Editorial (`D. Hybrid` — Monochrome Architectural Feather)**, angkat Selected Work ke Section 2, hadirkan Templates Showcase secara soft-selling di band gelap, dan pasang portrait placeholder jujur tanpa wajah AI.
3. **P2 — Refinement Serena Flow (`projects/serena-flow-yoga-concept/`):** Pertahankan identitas visual sepenuhnya; perbaiki 4 bug kritis (`prefers-reduced-motion`, overflow `360px`, tombol kalender putih tak terlihat di `<=480px`, kontradiksi jadwal vs booking), kompres 3 JPG `2.32 MiB` ke WebP/JPEG, tambah animasi editorial halus, dan putuskan konsolidasi v1/v2.
4. **P3 — Repositioning Marcus Vale (`projects/marcus-vale-mentor-concept/`):** Hapus seluruh elemen afiliasi & funnel `$19/$39`, ubah ke personal brand editorial berbasis filosofi/esai/perspektif bisnis, perbaiki tabrakan caption hero + overflow `360px` + focus trap mobile drawer.
5. **P4 — Pertahankan Stack Vanilla Static:** Jangan migrasi ke framework atau memasang Lenis/Motion secara paksa tanpa kebutuhan nyata; jaga kemudahan perawatan dan performa GitHub Pages.
