# IMPLEMENTATION ROADMAP — Multi-Website Redesign (Phase 1 → Phase 2)

**Status:** Phase 1 Complete — **STOP BEFORE IMPLEMENTATION**  
**Prinsip Transisi:** Implementasi kode di **Antigravity IDE** **BELUM BOLEH dimulai** sampai Albert meninjau dan menyetujui blueprint serta melengkapi informasi nyata yang masih kosong.

---

## 1. Pembagian Peran: Antigravity Standalone vs. Antigravity IDE

| Lingkungan | Peran & Tanggung Jawab | Ruang Lingkup Tugas |
| :--- | :--- | :--- |
| **Antigravity Standalone** *(Saat Ini — Phase 1)* | Creative Director, Brand Strategist, Researcher, Technical Reviewer, Planning Lead | Audit read-only seluruh repo & live site, menyusun 6 dokumen blueprint (`docs/redesign-audit/`), mengumpulkan keputusan & informasi nyata dari Albert, merevisi blueprint jika Albert meminta penyesuaian. **Nol edit file produksi.** |
| **GERBANG TRANSISI (SWITCH GATE)** | **Persetujuan Eksplisit Albert** | Albert menyetujui: (1) Arah Option A `Monochrome Architectural Feather` + gaya navbar + keputusan moon toggle; (2) Konten/status produk & kontak nyata Albert; (3) Keputusan konsolidasi file Serena; (4) Status persona & arah Marcus Vale. |
| **Antigravity IDE** *(Nanti — Phase 2)* | Implementation Team, Frontend Developer, UI/Interaction Engineer, QA Engineer | Memperbaiki `.gitignore`, memodifikasi HTML/CSS/JS ketiga situs, mengonversi & mengoptimalkan aset gambar (WebP/JPEG), memasang animasi CSS/`IntersectionObserver` + `prefers-reduced-motion`, menjalankan QA Playwright 4-viewport + keyboard/a11y, lalu commit & push ke GitHub Pages setelah diizinkan Albert. |

### Kapan Albert Harus Pindah ke Antigravity IDE?
**Tepat setelah** Albert membalas daftar keputusan di Bagian 4 dokumen ini dan menyatakan **"Approve Blueprint — lanjut ke implementasi"**. Saat itu, bawa seluruh folder `docs/redesign-audit/` sebagai panduan resmi di Antigravity IDE agar implementasi berjalan terstruktur per wave tanpa tebak-tebakan.

---

## 2. Urutan Implementasi yang Direkomendasikan (Di Antigravity IDE)

Tetap pertahankan arsitektur **Vanilla Static HTML / CSS / JS** (jangan migrasi ke framework atau memasang Lenis/Motion tanpa kebutuhan mendesak).

### Wave 0 — Repo Hygiene & Standar Dasar Bersama *(Prasyarat Wajib)*
- **Hapus/persempit `.gitignore:3` (`website/assets/`)** agar foto portrait Albert & preview template bisa di-commit dan tampil di GitHub Pages.
- Siapkan standar SVG inline favicon untuk semua halaman (menghilangkan 404 `/favicon.ico`), meta Open Graph + canonical, serta helper CSS/JS standar (`prefers-reduced-motion`, `IntersectionObserver` reveal ~35 baris, dan utilitas timezone browser untuk `.ics`).
- *Dependensi:* Tidak ada (langsung aman dikerjakan pertama saat Phase 2 dibuka).

### Wave 1 — Website 1: Albert Personal Website (`website/` + root `index.html`) *(Prioritas Tertinggi)*
- Bangun ulang `website/index.html`, `website/styles.css`, `website/app.js`, dan `website/bio-link.html` berdasarkan `ALBERT_BRAND_BLUEPRINT.md` (Option A — *Monochrome Architectural Feather*).
- Implementasikan solusi kontras navbar (Opsi Nav 1 Topbar Terang atau Opsi Nav 2 Frosted Capsule) dan reflow ikon sosial vertikal → baris horizontal mobile.
- Pasang portrait placeholder arsitektural jujur (`1600×2000px`, nol wajah AI) yang siap di-drop-in begitu foto asli Albert masuk ke `website/assets/`.
- Ganti wireframe `.mini-browser` dengan screenshot/preview berkualitas tinggi dari Serena & Marcus; perbaiki duplicate `role="banner"`, typo `serenah.site`, dan `defer` script.
- Perbarui root `index.html` (title & fallback surface) dan `website/bio-link.html` (hapus funnel `$3–$7`).
- *Dependensi:* Persetujuan Albert pada keputusan di Bagian 4 (foto asli Albert **tidak memblokir** Wave 1 karena placeholder terukur sudah siap).

### Wave 2 — Website 2: Serena Flow Yoga (`projects/serena-flow-yoga-concept/`)
- Pertahankan 100% identitas visual & fitur yang bekerja; terapkan seluruh perbaikan di `SERENA_REFINEMENT_BLUEPRINT.md`:
  - Tambahkan `@media (prefers-reduced-motion: reduce)`.
  - Perbaiki overflow kalender `+16px` inner / `+3px` outer di `360×800` dan tombol kalender putih tak terlihat di `<= 480px`.
  - Selaraskan jadwal `#schedule` dengan `#booking` (format-aware) + timezone browser dinamis + hapus copy bocor Cal.com (`:451`) + perbaiki kejujuran status preview.
  - Kompres 3 JPG (`2.32 MiB`) ke WebP + JPEG fallback + avatar `256×256` untuk bio-link + `fetchpriority="high"` & `loading="lazy"`.
  - Terapkan subtle breath-like CSS/`IntersectionObserver` reveals, transisi halus drawer/modal/konfirmasi, roving `tabindex` kalender, `aria-describedby`, hapus 7 inline `style=""` & dead code `escapeHtml()`.
  - Konsolidasikan `serena-test.html` → `index.html` (jika Albert menyetujui) dengan redirect stub aman.
- *Dependensi:* Keputusan Albert mengenai konsolidasi URL `serena-test.html` vs `index.html`.

### Wave 3 — Website 3: Marcus Vale (`projects/marcus-vale-mentor-concept/`)
- Terapkan restrukturisasi penuh dari `MARCUS_REPOSITIONING_BLUEPRINT.md`:
  - Hapus total Section 05 `My Reading & Setup`, `#my-stack` di `bio-link.html`, `.hero-book-card`, `.book-3d`, dan funnel `$19/$39` + klaim fiktif.
  - Bangun struktur baru: Hero (portrait bersih tanpa tabrakan caption), Core Philosophy, Ideas/Essays & Business Perspectives, About (slot jujur), Conversations & Contact, dan `bio-link.html` ringkas.
  - Perbaiki overflow `+3px` `#calendar-days` & wrapping `.tz-badge` di `360×800`, tambahkan `Tab` focus trap pada `#mobile-drawer`, hapus copy bocor Cal.com (`:713`), tambahkan favicon SVG & OG meta, optimalkan 3 JPG (`636 KB`) ke WebP/JPEG.
- *Dependensi:* Konfirmasi Albert mengenai status persona Marcus, nama masthead, dan bentuk Contact.

### Wave 4 — Cross-Site QA, Screenshot Refresh & Deployment Verification
- Ambil ulang screenshot bersih Serena (refined) & Marcus (repositioned) untuk dimasukkan sebagai preview karya nyata di Section 2 website Albert (`website/assets/`).
- Jalankan suite QA Playwright lengkap (lihat Bagian 5), verifikasi zero console/404 errors, commit rapi per wave, dan cek parity live GitHub Pages setelah push disetujui Albert.

---

## 3. Potensi Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| :--- | :--- | :--- |
| **`.gitignore:3` (`website/assets/`) terlupa** | Foto Albert & screenshot karya tidak ter-commit → 404 di GitHub Pages | Jadikan tugas pertama di Wave 0 sebelum aset apa pun ditambahkan. |
| **Kontras teks navbar rusak saat foto asli Albert dimasukkan** | Link `Contact` tidak terbaca (kembali ke bug mockup) | Terapkan Opsi Nav 1 (light topbar) atau Opsi Nav 2 (frosted capsule) yang 100% photo-agnostic. |
| **Bookmark/link lama ke `serena-test.html` rusak saat konsolidasi** | Pengunjung lama mendapat 404 | Simpan stub redirect ringan di `serena-test.html` → `./index.html` (dan `serena-bio-test.html` → `./bio-link.html`). |
| **Form kontak statis disalahpahami sebagai terkirim** | Calon klien menunggu balasan yang tidak pernah diterima Albert | Pakai jalur kontak jujur (email + copy, atau sambungkan ke Formspree/Web3Forms/Cal.com) atau beri label preview lokal yang jelas. |
| **Over-animation merusak rasa tenang atau a11y** | Pengalaman mobile terasa lambat / mengganggu pengguna sensitif gerak | Batasi hanya GPU-composited CSS + `IntersectionObserver`, nol Lenis, uji wajib dengan `reducedMotion: 'reduce'`. |
| **Scope creep (mis. tambah dark-mode toggle atau CMS dadakan)** | Phase 2 molor dan kode makin rumit dirawat | Kunci v1 tetap static HTML/CSS/JS Hybrid Editorial tanpa fitur yang belum disetujui. |

---

## 4. Aset & Informasi yang Dibutuhkan dari Albert

### Aset yang Dibutuhkan (Menyusul — Tidak Memblokir Awal Phase 2)
- **Foto Portrait Asli Albert (1 foto utama):** Minimal `1600×2000px` (`4:5` portrait), subjek agak ke kanan dari tengah, pencahayaan alami, latar tenang (nanti boleh ditingkatkan kualitasnya dengan tetap menjaga wajah asli Albert — nol wajah AI).
- **Preview Template Website (opsional saat Wave 1 / Wave 4):** Screenshot nyata dari template yang akan Albert tawarkan di Section 3 (dapat di-capture langsung via Playwright saat Wave 4).

### Daftar Keputusan Singkat yang Perlu Konfirmasi Albert (Checklist Sign-Off)
**A. Website Utama Albert (`ALBERT_BRAND_BLUEPRINT.md`)**
1. Setuju menggunakan **Option A — "Monochrome Architectural Feather"** (berbasis referensi `D. Hybrid` yang Albert kirim)?
2. Untuk perbaikan kontras `Contact` di navbar, pilih **Opsi Nav 1 (Full-width light topbar di atas foto — paling aman)** atau **Opsi Nav 2 (Full-bleed `y=0` foto + frosted capsule di belakang menu)**?
3. Ikon bulan (theme toggle) di pojok kanan atas: **dihilangkan di v1** (tetap Hybrid Editorial ~70/30) atau ingin fitur switch dark-mode penuh?
4. Nama brand: cukup **`Albert.`** atau tetap ada sub-nama studio?
5. Bahasa publik website Albert: **English**, **Indonesia**, atau **bilingual**?
6. Bio singkat jujur Albert (2–4 kalimat) + daftar akun sosial aktif (GitHub, YouTube, LinkedIn, Instagram, X?) + email publik nyata (apakah `hello@albertstudio.site` aktif?) + metode kontak pilihan (email + copy, Formspree/Web3Forms, atau Cal.com?).
7. Produk template & paket lama: template apa saja yang akan ditampilkan pertama, bagaimana cara beli/inquiry-nya, dan apakah paket `$3 / $5 / $7` Grand Opening resmi dipensiunkan?
8. Seksi Journal/Experiments: siap dengan 2–3 catatan awal, atau ditunda sampai konten siap?

**B. Serena Flow Yoga (`SERENA_REFINEMENT_BLUEPRINT.md`)**
9. Setuju mempromosikan `serena-test.html` (versi refined) menjadi `index.html` utama folder Serena + redirect stub di `serena-test.html`?

**C. Marcus Vale (`MARCUS_REPOSITIONING_BLUEPRINT.md`)**
10. Konfirmasi status Marcus Vale (tetap **studi kasus konsep portofolio** atau figur nyata?), nama masthead (`MARCUS VALE` vs `Vale Clarity`), dan apakah kalender booking tetap dipertahankan (sebagai *Start a Conversation*) atau disederhanakan menjadi form kontak editorial?

---

## 5. Rencana Pengujian & QA (Untuk Antigravity IDE — Phase 2)

Setelah setiap wave diimplementasikan, jalankan verifikasi otomatis dan manual berikut sebelum commit/deploy:

1. **Matriks Multi-Viewport (`playwright-cli`):**
   - `1440×900` (Desktop), `1280×800` (Laptop), `390×844` (Mobile), `360×800` (Small Mobile).
   - Verifikasi `0px` document horizontal overflow **dan** `0px` parent-container overflow (khususnya grid kalender di `360×800`).
   - Verifikasi hero above-the-fold di `1440×900`, `1280×800`, dan `390×844` (nol tabrakan caption, nol teks navbar hilang kontras).
2. **Aksesibilitas & Reduced-Motion:**
   - Emulasi `prefers-reduced-motion: reduce` di ketiga situs: pastikan `scroll-behavior: auto`, durasi transisi/animasi `<= 0.01ms`, dan semua elemen reveal langsung terlihat (`opacity: 1`).
   - Uji navigasi keyboard murni (`Tab`, `Shift+Tab`, `Escape`, tombol panah pada kalender/tabs): pastikan focus trap bekerja di semua modal & mobile drawer, fokus kembali ke tombol pemicu saat ditutup, dan `:focus-visible` jelas.
   - Verifikasi kontras WCAG 2.1 AA (`>= 4.5:1` teks normal, `>= 3:1` UI) termasuk area navbar di atas foto.
   - Verifikasi seluruh tap target mobile `>= 44×44px` (termasuk tombol kalender dan baris ikon sosial mobile).
3. **Fungsionalitas & Kebersihan Network:**
   - **0 console errors, 0 failed network requests (termasuk 0 favicon 404).**
   - Uji seluruh alur interaktif (booking format-aware, `.ics` valid, validasi error live clear, filter, modal, copy email, XSS payload test).
   - Verifikasi total bobot gambar pasca-WebP dan atribut `width`/`height`/`loading`/`fetchpriority`.
4. **Live Parity Check Pasca-Deploy:**
   - Setelah push ke GitHub Pages (atas izin Albert), cek seluruh URL aktif (termasuk `website/assets/` dan redirect root) mengembalikan HTTP `200` dan cocok dengan source lokal.
