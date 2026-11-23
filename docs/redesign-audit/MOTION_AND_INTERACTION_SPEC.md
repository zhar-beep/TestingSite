# MOTION & INTERACTION SPECIFICATION (Cross-Site)

**Status:** Phase 1 — Engineering & Experience Spec  
**Scope:** Albert Personal Website, Serena Flow Yoga, Marcus Vale  
**Prinsip Inti (`read.md` Section 10):** Animasi harus melayani pemahaman konten, ritme editorial, dan responsivitas UI — bukan pameran efek, bukan scroll hijacking, dan tidak boleh mengorbankan performa mobile maupun aksesibilitas.

---

## 1. Prinsip Motion Lintas-Situs

1. **Content-First, Zero LCP Delay:** Elemen Hero (headline, intro, CTA utama, serta portrait hero final Albert Saputra `website/assets/albert-hero-portrait.webp/.jpg` maupun hero image Serena/Marcus) tampil segera pada initial paint (`opacity: 1` tanpa reveal delay, `loading="eager"`, `fetchpriority="high"`, dimensi eksplisit agar nol CLS) — **jangan pernah** menyembunyikan hero di balik `opacity: 0` atau preloader. Hindari efek zoom/parallax berlebihan pada portrait manusia di Hero agar kesan editorial tetap tenang dan berwibawa.
2. **GPU-Composited Only:** Animasi hanya mengubah properti ramah kompositor (`transform`, `opacity`, `clip-path`, warna/border). Dilarang menganimasi `top`, `left`, `width`, `height`, `margin`, atau `transition: all`.
3. **Restraint & Rhythm:** Gerakan singkat (`160–260ms` untuk kontrol UI, `420–550ms` untuk editorial reveal), jarak kecil (`10–16px`), easing dekelerasi alami (`cubic-bezier(0.22, 1, 0.36, 1)`), dan dipicu **satu kali** saat masuk viewport (tidak berkedip ulang setiap scroll naik-turun). Seksi About Albert Saputra (tanpa foto karena About portrait berstatus Pending) cukup memakai reveal tipografi ringan yang tenang tanpa animasi dekoratif buatan untuk mengisi kekosongan gambar.
4. **Identitas Gerak Berbeda per Situs:**
   - **Albert (Hybrid Editorial):** Presisi arsitektural — transisi bersih, crisp hover, transisi halus antar band terang dan gelap.
   - **Serena Flow Yoga (Calm Editorial):** Napas tenang — settle lembut, hover gambar sangat halus (`scale(1.02)`), zero jitter.
   - **Marcus Vale (Authoritative Monograph):** Tegas dan minimal — penekanan pada keterbacaan esai, minim gerak dekoratif.
5. **Honest Reduced-Motion First:** Setiap situs wajib memiliki aturan `@media (prefers-reduced-motion: reduce)` yang diverifikasi lewat Playwright.

---

## 2. Evaluasi Teknis: **Motion** Library vs. Native CSS + `IntersectionObserver`

### Fakta Arsitektur Aktual
Ketiga situs di repository ini adalah **100% static Vanilla HTML / CSS / JS tanpa `package.json`, tanpa bundler (Vite/Webpack), dan tanpa framework React/Vue**, di-deploy langsung lewat GitHub Pages (`.nojekyll`) dan dikelola oleh Albert yang masih dalam proses belajar web development (`read.md:771`).

### Analisis Trade-Off
| Kriteria | Native CSS + `IntersectionObserver` (~35 baris JS) | Library `motion` (Vanilla JS / npm) |
| :--- | :--- | :--- |
| **Bundle & Network Cost** | **0 KB dependensi eksternal** | ~15–20 KB+ gzipped JS (+ extra RTT jika via CDN ESM, atau butuh bundler) |
| **Build Pipeline Impact** | **Nol** (tetap edit & push langsung ke GitHub Pages) | Butuh Node + Vite + GitHub Actions deploy, atau bergantung pada external CDN |
| **Kemampuan Editorial Reveals, Hover, Drawer/Modal, Stagger** | **100% memadai** (sejalan dengan panduan `motion` skill `best-practices/css-or-motion.md`) | Overkill untuk efek editorial dasar |
| **Spring Interruptible / FLIP `layoutId` / Scrubbed Timeline** | Terbatas | **Unggul** — alasan sah untuk memakai Motion |
| **Maintainability bagi Albert** | **Sangat tinggi** (mudah dibaca, didebug, nol breakage dependensi) | Menambah kompleksitas tooling & versi |

### Keputusan Rekomendasi (Konsensus Penuh Seluruh Auditor & Verifier)
- **Default untuk Ketiga Situs (Albert, Serena, Marcus):** Gunakan **Native CSS Transitions/Animations + helper `IntersectionObserver` ringan (~30–35 baris vanilla JS)** dengan fallback aman bila JS gagal dimuat.
- **Pengecualian Kondisional (Opsional Phase 2):** Hanya pertimbangkan menambahkan `motion` (via modul lokal ter-pin atau Vite jika Albert nanti memang memilih memakai build step) **apabila** Albert secara spesifik menginginkan fitur kompleks seperti *shared-element spring indicator* atau *continuous scroll-linked storytelling* di website utama Albert.

---

## 3. Evaluasi Teknis: **Lenis** Smooth Scrolling vs. Native Browser Scrolling

### Analisis Berdasarkan `lenis` Skill & Audit Ketiga Situs
- **Verdict: JANGAN pasang Lenis** di Albert, Serena, maupun Marcus.
- **5 Alasan Rekayasa:**
  1. **Tidak Ada Scroll-Scrubbed WebGL / Canvas Storytelling:** Ketiga situs adalah editorial portfolio, halaman bacaan, dan halaman interaktif (modal, drawer, accordion, kalender booking multi-langkah). Panduan resmi skill `lenis` sendiri secara eksplisit menempatkan halaman bacaan & form interaktif pada kategori **"Keep Native Browser Scrolling"**.
  2. **Overhead Tanpa Manfaat di Mobile:** Pada perangkat sentuh (`syncTouch: false`), Lenis menonaktifkan smoothing demi menjaga native iOS/Android momentum scroll — artinya pengguna mobile menanggung biaya download/parse JS tanpa mendapatkan manfaat apa pun.
  3. **Risiko Gangguan UX & Fokus:** Lenis menjalankan loop `requestAnimationFrame` terus-menerus, menuntut atribut `data-lenis-prevent` di setiap modal/drawer agar scroll tidak macet, serta rawan gesekan dengan anchor jump + sticky header.
  4. **Ketergantungan Baru pada Stack 0-Dependensi:** Menambah JS + CSS eksternal pada situs statis yang saat ini nol dependensi.
  5. **Alternatif Native Lebih Bersih & Andal:** Gunakan scrolling asli browser dengan:
     ```css
     @media (prefers-reduced-motion: no-preference) {
       html { scroll-behavior: smooth; }
     }
     @media (prefers-reduced-motion: reduce) {
       html { scroll-behavior: auto; }
     }
     ```
     dipadu `scroll-margin-top` yang tepat untuk setiap sticky header.

---

## 4. Katalog Pola Interaksi & Animasi yang Direkomendasikan

| Pola Interaksi | Spesifikasi Teknis | Penerapan per Situs |
| :--- | :--- | :--- |
| **1. Subtle Section Reveals** | `opacity: 0 → 1`, `transform: translateY(14px → 0)`, `480–520ms cubic-bezier(0.22, 1, 0.36, 1)`, trigger sekali via `IntersectionObserver` (`threshold: 0.12`, `rootMargin: "0px 0px -40px 0px"`). Stagger `60–80ms` max 3–4 kartu per baris. | Albert (Work, Templates, About, Notes), Serena (Offerings, Principles, Schedule, Booking), Marcus (Philosophy, Essays). |
| **2. Image Frame Transitions** | Di dalam wrapper `overflow: hidden`: hover `transform: scale(1.02–1.03)` (`500–600ms ease-out`), dibatasi khusus `@media (hover: hover) and (pointer: fine)`. | Albert (Selected Work & Template previews), Serena (Studio, Portrait, Essentials), Marcus (Editorial imagery). |
| **3. Navigation Feedback** | Underline slide `scaleX(0 → 1)` (`180–200ms`) + active-section scroll-spy ringan via `IntersectionObserver` (`aria-current="true"` / class aktif). | Albert, Serena, Marcus. |
| **4. Button & Pill Micro-Interactions** | Properti eksplisit (`background-color, border-color, color, transform` `180ms`), subtle active press `transform: scale(0.985)`, arrow nudge `translateX(3px)` pada CTA bertanda `→` (`Explore My Work →`). | Albert (pill CTA & editorial link), Serena (offering CTA, calendar day, time pill), Marcus (editorial CTA). |
| **5. Drawer, Modal & State Transitions** | Ganti `display: none/block` mendadak dengan kombinasi `opacity` + `translateY(8px)` (`200–240ms`, memakai `hidden` + transisi atau native `<dialog>`). Form ↔ Konfirmasi booking fade halus `240ms`. | Serena (`#mobile-drawer`, `#partner-modal`, `#booking-confirmation`, filter Essentials), Albert (mobile drawer, template preview modal jika ada), Marcus (`#mobile-drawer`, essay reader modal). |
| **6. Accordion (`<details>`)** | Rotasi halus ikon `+` → `−` (`200ms`); progressive enhancement `interpolate-size: allow-keywords` untuk animasi buka-tutup tinggi konten dengan fallback bersih di browser lama. | Serena FAQ (dan Albert/Marcus jika FAQ dipertahankan). |
| **7. Interactive Template Preview (Albert)** | Switcher bersih desktop/mobile preview frame atau hover elevasi kartu di Dark Templates Showcase tanpa animasi berat/berkedip. | Khusus Albert (Section 3 — Templates). |

### Pola yang DILARANG
- Excessive parallax / multi-layer scroll jacking.
- Animasi looping terus-menerus (floating icons, pulsing dot terus-menerus, marquee berjalan).
- Custom cursor pengganti kursor sistem.
- Animasi yang menunda tampilnya teks/tombol atau memaksa user menunggu saat mengklik.

---

## 5. Perbedaan Desktop vs. Mobile & Aksesibilitas

### Desktop vs. Mobile
| Aspek | Desktop (`1440×900`, `1280×800`) | Mobile (`390×844`, `360×800`) |
| :--- | :--- | :--- |
| **Hover Effects** | Aktif hanya dalam `@media (hover: hover) and (pointer: fine)` | Tidak menempel ("sticky hover"); ganti dengan `:active` tactile feedback singkat |
| **Reveal Offset & Stagger** | `translateY(14px)`, stagger `60–80ms` | Lebih ringkas (`translateY(8–10px)`, stagger `0–40ms`) agar cepat terbaca saat swipe |
| **Scroll Behavior** | Native scroll + smooth anchor jump | 100% native touch momentum; nol JS scroll listener |
| **Focus & Touch Target** | `:focus-visible` ring kontras tinggi (`>= 3:1`) | Minimum `44×44px` tap target (termasuk tombol kalender & ikon sosial horizontal) |

### Standar Aksesibilitas & Reduced-Motion (Wajib di Semua 3 Situs)
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```
Dan pada JavaScript `IntersectionObserver`:
```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
}
```

### Catatan Kejujuran Pengukuran Performa
Saat Phase 1, FPS perangkat nyata dan Core Web Vitals (`LCP`, `INP`, `CLS`) di hardware fisik **belum diukur**. Verifikasi performa aktual (termasuk pengujian beban gambar pasca-konversi WebP dan verifikasi `reducedMotion: 'reduce'` via Playwright) wajib dilakukan di Antigravity IDE pada Phase 2 setelah implementasi selesai.
