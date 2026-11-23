# SERENA REFINEMENT BLUEPRINT — Serena Flow Yoga (`projects/serena-flow-yoga-concept/`)

**Status:** Phase 1 — Refinement Blueprint (Menunggu Sign-Off Albert)  
**Target Aktif:** `serena-test.html`, `serena-bio-test.html`, `styles-test.css`, `app-test.js`  
**Prinsip Utama (`read.md` Section 6):** **REFINEMENT, BUKAN penggantian identitas.** Pertahankan atmosfer editorial yang tenang, hangat, dan elegan; perbaiki bug responsif/aksesibilitas/logika booking serta tambahkan interaksi mikro yang halus dan bermakna.

---

## 1. Elemen yang WAJIB Dipertahankan (Non-Negotiable Core)

1. **Sistem Warna & Disiplin Kontras WCAG AA/AAA (`styles-test.css:8-38`):**
   - Permukaan mineral stone `#eeece7`, band `#e4e1da`, kartu putih bersih `#ffffff`, aksen utama deep botanical olive `#24342b` (termasuk dark featured card), aksen hangat terracotta `#964c34` / `#86422c`, serta semantic pills lembut (`sage`, `clay`, `mist`). Seluruh pasangan warna sudah terbukti lolos AA hingga AAA (`13.55:1`, `12.04:1`, `6.21:1`).
2. **Pasangan Tipografi & Skala Editorial:**
   - `Cormorant Garamond` (500/600) untuk heading editorial + `Plus Jakarta Sans` (400–700) untuk body & UI (`16px / 1.65`, lead `52ch`, fluid `clamp()`).
3. **Art Direction & Kohesi Fotografi:**
   - Nuansa cahaya alami limestone/cork/olive dari 3 aset foto lokal (`hero-studio.jpg`, `coach-portrait.jpg`, `curated-gear.jpg`) dan bingkai halus `--radius-lg: 22px` + `--shadow-soft`.
4. **Struktur & Ritme 7 Seksi + Personal Hub (`serena-bio-test.html`):**
   - Alternasi canvas/band yang lapang (`4.75rem` desktop, `3.25rem` mobile), kartu featured olive, dan pemisahan halaman utama dengan Personal Hub.
5. **Seluruh Fungsionalitas Client-Side yang Sudah Bekerja Baik:**
   - Sinkronisasi CTA offering & query param `?offering=`, mesin kalender lokal (Mon–Sat, +3 bulan), validasi form & XSS-safe `textContent`, ekspor `.ics` RFC 5545, alur `"Modify Time"`, FAQ `<details>`, filter kategori Essentials, modal Partner dengan focus trap/focus restore, dan tombol Copy email dengan fallback jujur.
6. **Kejujuran & Tanpa Bloat:**
   - Nol testimoni palsu, nol angka klien fiktif, nol checkout palsu, dan arsitektur vanilla static HTML/CSS/JS tanpa framework.

---

## 2. Daftar Perbaikan Wajib (Berdasarkan Temuan Audit Terverifikasi)

### Prioritas 1 — Bug Kritis UX, Responsif & Aksesibilitas
1. **Perbaiki Overflow Kalender `360×800` (`styles-test.css:1657-1683`):**
   - *Masalah terukur:* `.cal-day { min-width: 44px }` membuat grid 7 kolom `#cal-days` (`326px`) meluap **`+16px` dari inner box `.booking-shell` (`335px`) dan menembus `+3px` melewati border kanan luar kartu (`348px`)**.
   - *Solusi:* Pada breakpoint `<= 480px`, ganti `.cal-day { min-width: 44px }` menjadi `min-width: 0; width: 100%; min-height: 44px;` (atau rapatkan padding horizontal `.booking-shell` menjadi `8px` dan `.container` menjadi `8px` di `<= 380px` agar seluruh 7 kolom muat rapi dengan celah bersih dan `0px` overflow terhadap parent card).
2. **Perbaiki Tombol Kalender "Menghilang" di `<= 480px` (`styles-test.css:1667-1671`):**
   - *Masalah terukur:* `.booking-calendar-panel { background: transparent; border: none; }` di atas `.booking-shell` putih membuat tombol `.cal-day` putih (`border-color: transparent`) menyatu total dengan background.
   - *Solusi:* Berikan permukaan pembeda yang tenang pada `.cal-day:not(:disabled)` di mobile (mis. `background: var(--bg-canvas); border: 1px solid var(--border-hairline);`) sehingga setiap tanggal aktif terlihat jelas sebagai tombol yang dapat ditekan.
3. **Selaraskan Jadwal (`#schedule`) dengan Widget Booking (`#booking`) & Perbaiki Timezone:**
   - *Masalah terukur:* `#schedule` (`serena-test.html:222-253`) menampilkan Senin `07:30`, Rabu `18:00`, Jumat `19:00`, sedangkan `#booking` (`:358-416`) hanya menawarkan Mon–Sat `09:00 / 11:00 / 14:30 / 17:00` untuk semua format.
   - *Solusi:* Buat Step 2 (hari tersedia) dan Step 3 (slot waktu) di `app-test.js` bersifat **format-aware**:
     - *1:1 Private Mat Pilates:* Mon–Sat (`09:00`, `11:00`, `14:30`, `17:00`, 50 mnt).
     - *Morning Mobility Flow (Small-Group):* Tampilkan hari dan jam yang cocok dengan `#schedule` (Senin `07:30`, atau tambahkan pilihan kelas Rabu `18:00` / Jumat `19:00`).
     - *4-Week Beginner Foundation:* Ubah label Step 2 menjadi *"Choose Cohort Start Date"* (mis. hari Senin) dan jelaskan seri 4 minggu pada ringkasan & deskripsi `.ics`.
   - *Perbaikan Timezone:* Ganti label keras `"EST / Local Time"` (`serena-test.html:409`, `app-test.js:113`) dengan zona waktu browser yang terdeteksi via `Intl.DateTimeFormat().resolvedOptions().timeZone` (fallback `"Local Time"`) agar sinkron 100% dengan timestamp `.ics`.
4. **Perbaiki Transparansi Demo & Hapus Copy Template Bocor:**
   - Hapus/tulis ulang copy bocor di `serena-test.html:451` (*"connects seamlessly to Cal.com, Calendly, or your inbox upon launch."*).
   - Sesuaikan status konfirmasi (`serena-test.html:461-462`) agar jujur bahwa ini adalah preview lokal (*"Booking Preview Created — Static concept preview; download .ics to test calendar export"*) dan tambahkan 1 baris catatan singkat di `#partner-modal` (`serena-bio-test.html:284-297`) bahwa URL `partner-store.example` adalah preview konsep.
5. **Tambahkan `@media (prefers-reduced-motion: reduce)` (`styles-test.css`):**
   - Saat ini 100% absen. Wajib tambahkan blok reduced-motion untuk mematikan `scroll-behavior: smooth`, meniadakan pergeseran `translateY`, dan menonaktifkan reveal JS bila user memilih `reduce`.

### Prioritas 2 — Polish Visual, Navigasi & Optimasi Aset
1. **Optimasi 3 Gambar Berat (`2.32 MiB` / `2.44 MB` -> target `< 450 KB` total):**
   - Konversi `hero-studio.jpg` (`752.3 KB`), `coach-portrait.jpg` (`765.4 KB`), dan `curated-gear.jpg` (`861.6 KB`) ke **`WebP` + fallback `JPEG` terkompresi**, serta buat versi avatar kecil (`256×256px`, `< 25 KB`) khusus untuk `serena-bio-test.html` (tidak lagi mengunduh `765 KB` untuk tampilan `112×112`).
   - Tambahkan `fetchpriority="high"` pada `hero-studio.jpg`, `loading="lazy" decoding="async"` pada `coach-portrait.jpg` & `curated-gear.jpg`, serta samakan atribut `width`/`height` dengan rasio natural gambar.
2. **Tipografi & Framing Hero Mobile:**
   - Tambahkan `text-wrap: balance;` pada `h1, h2, h3` untuk menghilangkan orphan word (`"together"`, `"on"`, `"Pack)"`).
   - Rampingkan `.hero-meta` (`serena-test.html:86-90`) agar tidak menumpuk 3 baris di mobile (`390×844`), sehingga foto studio hero langsung terlihat lebih tinggi di layar mobile.
3. **Navigasi & Touch Target:**
   - Tambahkan link halus `Personal Hub` (`serena-bio-test.html`) di desktop header agar setara dengan mobile drawer.
   - Naikkan tinggi area klik `.nav-links a` dari `29px` menjadi `min-height: 44px; display: inline-flex; align-items: center;` untuk kenyamanan tablet sentuh (`761–1024px`).

---

## 3. Arah Interaksi & Animasi Halus (Calm Breath-Like Motion)

**Prinsip:** Serena harus terasa *hidup dan tenang seperti tarikan napas*, **BUKAN** pameran animasi.

- **Stack Motion:** Gunakan **Native CSS transitions/animations + lightweight `IntersectionObserver` (~30 baris vanilla JS)**. **Jangan tambahkan Lenis** (scroll inertia justru merusak kecekatan widget kalender/form `#booking`) dan **jangan tambah bundle Motion npm** pada situs statis tanpa build-step ini.
- **Pola Interaksi yang Direkomendasikan:**
  1. **Gentle Section Reveals:** Settle vertikal lembut (`opacity: 0 → 1`, `translateY(14px → 0)`, durasi `500ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`), dipicu satu kali via `IntersectionObserver` (`threshold: 0.12`). Stagger ringan `60–80ms` hanya untuk 3 kartu offerings & 3 prinsip. **Konten Hero tampil instan (0ms delay, nol dampak LCP).**
  2. **Editorial Image Framing:** Hover zoom sangat halus (`transform: scale(1.02)`, `600ms ease-out`) di dalam frame `overflow: hidden` (`.editorial-frame`, `.portrait-frame`, `.essentials-photo`) khusus perangkat pointer halus (`@media (hover: hover)`).
  3. **Navigasi & Micro-Feedback:**
     - Garis bawah tipis `scaleX(0 → 1)` (`200ms`) pada desktop nav + indikator active-section scroll-spy halus via `IntersectionObserver`.
     - Hapus `transition: all` (`styles-test.css:1059, 1461`); ganti dengan properti eksplisit (`background-color, border-color, color, transform` `180ms`) + subtle `:active` press (`scale(0.985)`).
  4. **Transisi Panel UI (Menggantikan `display: none/block` Mendadak):**
     - Pergantian form booking ↔ konfirmasi: fade + geser `8px` (`260ms`).
     - Mobile drawer & Partner modal: transisi `opacity` + `transform` (`220ms`) disertai klik-backdrop untuk menutup dan auto-close saat resize `> 760px`.
     - FAQ `<details>`: rotasi halus ikon `+` → `−` (`200ms`) + progressive enhancement `interpolate-size: allow-keywords`.
     - Filter Essentials (`serena-bio-test.html`): fade-in lembut pada kartu yang tampil.
  5. **Wajib Reduced-Motion Guard:** Seluruh animasi dan `scroll-behavior: smooth` dinonaktifkan saat `prefers-reduced-motion: reduce`; elemen reveal langsung tampil `opacity: 1; transform: none`.

---

## 4. Pertimbangan Teknis & Aksesibilitas Khusus Serena

1. **Keyboard Calendar Grid (Roving `tabindex`):** Ubah `#cal-days` agar hanya 1 tanggal aktif/terpilih yang memiliki `tabindex="0"` (sisanya `-1`), ditambah dukungan `ArrowLeft/Right/Up/Down`, `Home/End`, `PageUp/PageDown`, serta penanda visual + `aria-current="date"` untuk hari ini (Today).
2. **Form & Modal Accessibility:**
   - Tambahkan `aria-describedby="booking-name-error"` dan `aria-describedby="booking-email-error"` pada input form, dan bersihkan pesan error secara langsung saat user mengetik input valid (`input`/`blur`).
   - Tambahkan `aria-live="polite"` pada `#essentials-count` (`serena-bio-test.html:91`).
   - Berikan `inert` pada `<main>` saat `#partner-modal` atau `#mobile-drawer` terbuka (atau gunakan native `<dialog>`).
3. **Code Hygiene:**
   - Hapus fungsi tak terpakai `escapeHtml()` (`app-test.js:590-597`) dan bungkus `app-test.js` dalam IIFE atau module scope agar tidak mencemari global `window`.
   - Ganti **7 atribut inline `style=""`** (`serena-test.html:263, 422, 449, 462, 465`; `serena-bio-test.html:279, 295`) dengan utility class CSS.
   - Tambahkan `defer` pada `<script src="app-test.js" defer>` serta tag Open Graph & canonical.
4. **Keputusan Konsolidasi File (Menunggu Persetujuan Albert):**
   - Saat ini `projects/serena-flow-yoga-concept/` menyimpan 2 set file lengkap (`index.html` v1 legacy vs `serena-test.html` v2 aktif).
   - **Rekomendasi:** Setelah refinement selesai di Phase 2, promosikan versi refined menjadi **`index.html` & `bio-link.html`** sebagai URL kanonis, lalu arsipkan/hapus file v1 lama — sambil menyisakan redirect stub ringan di `serena-test.html` agar link/bookmark lama tidak 404.
