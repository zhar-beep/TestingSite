# IMPLEMENTATION ROADMAP — Multi-Website Redesign (Phase 1.5 → Phase 2 IDE Handoff)

**Status:** Phase 1.5 Decisions Locked — **STOP BEFORE IMPLEMENTATION (Menunggu Persetujuan Akhir untuk Pindah ke Antigravity IDE)**  
**Prinsip Transisi:** Implementasi kode di **Antigravity IDE** dimulai **hanya setelah** Albert memberikan persetujuan akhir terhadap paket blueprint yang telah diperbarui ini.

---

## 1. Ringkasan Seluruh Keputusan Terkunci (Phase 1.5)

Seluruh keputusan arsitektur, visual, dan struktur lintas-situs sudah disepakati bersama Albert:
1. **Albert — Arah Visual, Nama & Bahasa:** **D — Hybrid Editorial — Option A ("Monochrome Architectural Feather")**, nama brand lengkap **`Albert Saputra`** (person-first), bahasa publik **English**.
2. **Albert — Approved Hero Portrait:** `reference/albert-hero-portrait.jpg` (`1856 × 2282 px`, `246,472 bytes`, JPEG 8-bit RGB, rasio `0.8133`) disetujui sebagai portrait hero utama — **hanya untuk Hero homepage**, dilarang dipakai ulang di About.
3. **Albert — About Portrait:** Berstatus **Pending** (tugas masa depan). Seksi About dirancang secara intensional agar tampak lengkap dan seimbang tanpa gambar.
4. **Albert — Navbar & Theme Toggle:** **Full-width light topbar (`72px`)** di atas split hero + **tanpa ikon bulan** (tetap Hybrid Editorial ~70/30, nol risiko kontras link `Contact`).
5. **Albert — Templates & Paket Lama:** Paket `$3/$5/$7` Grand Opening **resmi dipensiunkan**; Section 3 menampilkan Templates dengan **harga transparan** (angka nyata menunggu input Albert) + **inquiry langsung via email / WhatsApp**.
6. **Albert — Contact & Journal:** Contact memakai **Email (Copy + `mailto:`) & WhatsApp langsung** (menggantikan kalender lokal tanpa backend); **Journal / Experiments** hanya tampil di v1 jika 2–3 entri nyata sudah siap (jika belum, ditunda rapi ke v1.1).
7. **Kebijakan Aset & `.gitignore`:** Buka `website/assets/` di `.gitignore:3`, simpan aset produksi teroptimasi di **`website/assets/albert-hero-portrait.webp`** (+ **`website/assets/albert-hero-portrait.jpg`** fallback), dan tambahkan **`reference/`** ke `.gitignore` agar file master mentah tetap lokal dan tidak ikut ter-publish ke GitHub Pages.
8. **Serena Flow Yoga:** Pertahankan identitas visual & fitur kerja; di Phase 2 promosikan `serena-test.html` → `index.html` dan `serena-bio-test.html` → `bio-link.html`, sambil menyimpan redirect stub ringan di file `-test` agar bookmark lama tidak 404.
9. **Marcus Vale:** Tetap sebagai studi kasus konsep portofolio (`CONCEPT PROJECT`), bebas afiliasi & klaim fiktif, masthead disederhanakan menjadi **`MARCUS VALE`** (person-first), dan seksi Contact disederhanakan menjadi form/kontak editorial tenang + copy email (tanpa kalender booking).

---

## 2. Pembagian Peran: Antigravity Standalone vs. Antigravity IDE

| Lingkungan | Peran & Tanggung Jawab | Ruang Lingkup Tugas |
| :--- | :--- | :--- |
| **Antigravity Standalone** *(Saat Ini — Phase 1.5 Selesai)* | Creative Director, Brand Strategist, Researcher, Technical Reviewer, Planning Lead | Audit read-only, wawancara keputusan Phase 1.5, pembaruan final 6 dokumen blueprint (`docs/redesign-audit/`), dan penyusunan paket handoff. **Nol modifikasi file produksi.** |
| **GERBANG TRANSISI (SWITCH GATE)** | **Persetujuan Akhir Albert** | Albert menyetujui hasil pembaruan 6 dokumen ini dan (opsional langsung atau di awal IDE) melengkapi data konten personal yang masih `[PENDING OWNER INPUT]`. |
| **Antigravity IDE** *(Phase 2 — Eksekusi)* | Implementation Team, Frontend Developer, UI/Interaction Engineer, QA Engineer | Mengubah `.gitignore`, mengoptimalkan & menempatkan aset publik, mengedit HTML/CSS/JS Wave 0–3, menjalankan QA Playwright 4-viewport + reduced-motion + visual QA portrait, lalu commit & push atas izin Albert. |

---

## 3. Urutan Implementasi di Antigravity IDE (Tetap Vanilla Static HTML/CSS/JS)

Jangan migrasi ke framework, jangan pasang Lenis, dan gunakan **Native CSS + `IntersectionObserver` ringan (~30–35 baris)** sebagai standar motion di ketiga situs.

### Wave 0 — Repo Hygiene, `.gitignore` & Standar Bersama *(Prasyarat Wajib)*
- **Perbaiki `.gitignore:3`:** Hapus baris `website/assets/` agar aset publik website Albert ter-track oleh Git & tampil di GitHub Pages, lalu **tambahkan `reference/`** ke `.gitignore` agar master mentah `reference/albert-hero-portrait.jpg` tetap utuh secara lokal tanpa ikut ter-publish.
- Siapkan standar SVG inline favicon untuk semua halaman (menghilangkan console 404 `/favicon.ico`), meta Open Graph + canonical, serta helper CSS/JS standar (`prefers-reduced-motion` dan `IntersectionObserver` reveal).

### Wave 1 — Website 1: Albert Saputra (`website/` + root `index.html`) *(Prioritas Tertinggi)*
- Bangun ulang `website/index.html`, `website/styles.css`, `website/app.js`, dan `website/bio-link.html` berdasarkan `ALBERT_BRAND_BLUEPRINT.md` (Option A — *Monochrome Architectural Feather*, wordmark `Albert Saputra`, bahasa **English**, full-width light topbar `72px`, tanpa ikon bulan, tanpa paket `$3/$5/$7`).
- **Checklist Implementasi Approved Hero Portrait (WAJIB):**
  - [ ] **Optimasi Aset Tanpa Mengubah Master:** Dari master lokal `reference/albert-hero-portrait.jpg` (`1856×2282 px`, `246.47 KB`), hasilkan **`website/assets/albert-hero-portrait.webp`** (utama) dan **`website/assets/albert-hero-portrait.jpg`** (fallback terkompresi) dengan target ukuran ringan namun tajam pada layar Retina. Pertahankan `reference/albert-hero-portrait.jpg` tanpa modifikasi.
  - [ ] **Markup Responsif & Anti-CLS:** Gunakan `<picture>` dengan `<source type="image/webp">` dan `<img>` fallback yang menyertakan atribut eksplisit `width` & `height` (rasio natural `1856 × 2282` atau varian terpotong proporsional), `loading="eager"`, `decoding="async"`, dan `fetchpriority="high"` agar **nol Cumulative Layout Shift (CLS)** dan nol LCP delay.
  - [ ] **Evaluasi Komposisi Responsif (`object-fit` / `object-position`):** Jangan kunci lebar piksel mati sebelum evaluasi visual; gunakan `object-fit: cover` dan uji langsung `object-position` (titik awal ~`50% 20%`–`54% 22%`) serta lebar gradient feather kiri (~`12–18%`) di `1440×900`, `1280×800`, `390×844`, dan `360×800` agar kepala, kacamata, dan bahu tidak terpotong atau tercuci feather.
  - [ ] **Descriptive Alt Text:** Sertakan `alt` deskriptif, akurat, dan natural (contoh: `alt="Portrait of Albert Saputra wearing a black crewneck and dark sunglasses against a neutral architectural backdrop"`).
  - [ ] **Hero-Only Guardrail:** Pastikan gambar ini **tidak muncul** di seksi About.
  - [ ] **Visual QA Khusus Hero:** Cek kontras topbar `72px`, kerapian transisi feather kiri, posisi portrait di mobile (headline + primary CTA tetap above the fold), serta reflow ikon sosial menjadi baris horizontal `44×44px` di `< 1024px`.
- Bangun **Section 4 — About Albert Saputra** sebagai layout editorial tipografis 2 kolom yang utuh dan disengaja **tanpa foto** (menggunakan slot konten jujur untuk bio Albert).
- Bangun **Section 3 — Templates & Digital Creations** (dark band `#141518`, harga transparan + inquiry email/WhatsApp) dan **Section 6 — Contact & Footer** (Email Copy/`mailto:` + WhatsApp langsung, tanpa kalender lokal).
- Perbaiki duplicate `role="banner"`, typo `serenah.site`, tambahkan `defer` pada script, dan perbarui root `index.html` + `website/bio-link.html`.
- **Backlog Masa Depan (Di Luar Scope v1):** Penambahan **About Section Portrait** setelah Albert menyediakan foto terpisah untuk seksi About.

### Wave 2 — Website 2: Serena Flow Yoga (`projects/serena-flow-yoga-concept/`)
- Terapkan seluruh refinement di `SERENA_REFINEMENT_BLUEPRINT.md` tanpa mengubah identitas visual:
  - Tambahkan `@media (prefers-reduced-motion: reduce)`.
  - Perbaiki overflow kalender `+16px` inner / `+3px` outer di `360×800` dan tombol kalender putih tak terlihat di `<= 480px`.
  - Selaraskan jadwal `#schedule` dengan `#booking` (format-aware) + deteksi timezone browser dinamis + hapus copy bocor Cal.com (`:451`) + perbaiki kejujuran status preview.
  - Kompres 3 JPG (`2.32 MiB` / `2.44 MB`) ke WebP + JPEG fallback + avatar `256×256` untuk bio-link + `fetchpriority="high"` & `loading="lazy"`.
  - Terapkan subtle breath-like CSS/`IntersectionObserver` reveals, transisi halus drawer/modal/konfirmasi, roving `tabindex` kalender, `aria-describedby`, hapus 7 inline `style=""` & dead code `escapeHtml()`.
  - **Konsolidasi URL Kanonis (Terkunci):** Promosikan versi refined menjadi `index.html` & `bio-link.html` kanonis dan simpan redirect stub ringan di `serena-test.html` & `serena-bio-test.html` agar tautan lama tidak 404.

### Wave 3 — Website 3: Marcus Vale (`projects/marcus-vale-mentor-concept/`)
- Terapkan restrukturisasi bebas-afiliasi dari `MARCUS_REPOSITIONING_BLUEPRINT.md`:
  - Hapus total Section 05 `My Reading & Setup`, `#my-stack` di `bio-link.html`, `.hero-book-card`, `.book-3d`, funnel `$19/$39`, copy bocor Cal.com (`:713`), serta 7 kategori klaim fiktif.
  - Pertahankan penanda `CONCEPT PROJECT`, gunakan masthead person-first **`MARCUS VALE`**, bangun struktur *Hero (portrait bersih tanpa tabrakan caption) → Core Philosophy → Ideas, Essays & Business Perspectives → About (slot jujur) → Contact Editorial Tenang + Copy Email (tanpa kalender booking)*, dan rampingkan `bio-link.html`.
  - Tambahkan `Tab` focus trap pada `#mobile-drawer`, favicon SVG + OG meta, dan optimalkan 3 JPG (`636 KB`) ke WebP/JPEG fallback.

### Wave 4 — Cross-Site QA, Screenshot Refresh & Deployment Verification
- Ambil screenshot nyata Serena (refined) & Marcus (repositioned) untuk mengisi preview Section 2 (*Selected Work*) pada website Albert (`website/assets/`).
- Jalankan matriks QA Playwright (Bagian 5), pastikan 0 console/404 errors, lalu commit & push ke GitHub Pages hanya setelah disetujui Albert.

---

## 4. Potensi Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| :--- | :--- | :--- |
| **`.gitignore:3` (`website/assets/`) terlupa sebelum Wave 1** | `albert-hero-portrait.webp/.jpg` & screenshot karya 404 di GitHub Pages | Wajib jadi langkah pertama Wave 0 + verifikasi lewat `git status` sebelum commit. |
| **Master `reference/` ikut ter-publish ke GitHub Pages** | File referensi mentah terekspos di URL publik | Tambahkan `reference/` ke `.gitignore` di Wave 0; verifikasi tidak masuk staging Git. |
| **Gradient feather kiri terlalu lebar pada foto `1856×2282`** | Telinga kiri/rambut/bahu Albert ikut memudar | Kalibrasi lebar feather (~`12–18%`) & `object-position` lewat uji visual langsung di 4 viewport Playwright. |
| **Layout shift (CLS) saat gambar hero dimuat** | Halaman melonjak saat load | Wajib pasang `width`/`height` eksplisit, `aspect-ratio`, `loading="eager"`, dan `fetchpriority="high"`. |
| **Tautan lama ke `serena-test.html` patah setelah promosi URL** | Bookmark lama mendapat 404 | Simpan stub redirect ringan di `serena-test.html` → `./index.html` dan `serena-bio-test.html` → `./bio-link.html`. |

---

## 5. Rencana Pengujian & QA (Antigravity IDE — Phase 2)

1. **Matriks Multi-Viewport (`playwright-cli`):** `1440×900`, `1280×800`, `390×844`, `360×800` — wajib `0px` document overflow **dan** `0px` parent-container overflow (khususnya kalender Serena di `360×800`).
2. **Visual QA Khusus Hero Portrait Albert:** Cek langsung screenshot di 4 viewport untuk proporsi wajah/kacamata, kerapian feather kiri, kontras topbar `72px`, above-the-fold mobile, dan absennya portrait di seksi About.
3. **Aksesibilitas & Reduced-Motion:** Emulasi `prefers-reduced-motion: reduce` di ketiga situs (`scroll-behavior: auto`, durasi `<= 0.01ms`, elemen reveal langsung tampil `opacity: 1`); uji keyboard murni (`Tab`/`Shift+Tab`/`Escape`/Arrow keys) + fokus trap seluruh drawer/modal + tap target mobile `>= 44×44px` (termasuk baris ikon sosial horizontal).
4. **Network & Integritas Aset:** `0` console error, `0` failed requests (`0` favicon 404), seluruh gambar `<picture>`/WebP ter-load dengan rasio natural benar, dan `reference/` tidak ikut ter-commit.

---

## 6. Paket Handoff Final untuk Antigravity IDE

### Sisa Input Konten Personal yang Perlu Disiapkan Albert (Bukan Keputusan Desain)
Sebelum atau saat memulai Wave 1 di Antigravity IDE, siapkan data faktual berikut (tim implementasi **dilarang** mengarangnya):
1. **Bio jujur Albert Saputra** (2–4 kalimat dalam English) untuk Section 4 (*About*).
2. **Email publik nyata** (konfirmasi `hello@albertstudio.site` atau email lain) & **nomor/tautan WhatsApp** untuk inquiry template/proyek.
3. **Daftar akun sosial aktif** (URL nyata GitHub, YouTube, LinkedIn, Instagram, X, dll.).
4. **Daftar Template & Harga Transparan** untuk Section 3 (*Templates & Digital Creations*).
5. *(Opsional)* **2–3 catatan/eksperimen awal** jika ingin langsung mengaktifkan Section 5 (*Journal/Experiments*) di v1; bila belum ada, otomatis ditunda ke v1.1.
6. *(Masa depan — v1.1+)* **Foto terpisah untuk seksi About** (saat ini berstatus Pending).

### Urutan Baca Dokumen untuk Tim Implementasi di Antigravity IDE
1. Baca `docs/redesign-audit/IMPLEMENTATION_ROADMAP.md` (aturan Wave 0–4, checklist portrait hero, & batasan).
2. Baca `docs/redesign-audit/ALBERT_BRAND_BLUEPRINT.md` (spesifikasi penuh Wave 1).
3. Baca `docs/redesign-audit/SERENA_REFINEMENT_BLUEPRINT.md` (spesifikasi Wave 2).
4. Baca `docs/redesign-audit/MARCUS_REPOSITIONING_BLUEPRINT.md` (spesifikasi Wave 3).
5. Baca `docs/redesign-audit/MOTION_AND_INTERACTION_SPEC.md` (aturan animasi CSS + `IntersectionObserver`, nol Lenis, `prefers-reduced-motion`).
6. Rujuk `docs/redesign-audit/REDESIGN_AUDIT.md` untuk nomor baris bug lama & baseline historis.
