# ALBERT BRAND BLUEPRINT — Main Personal Website (`website/`)

**Status:** Phase 1.5 — Approved & Locked Blueprint (Siap Handoff ke Antigravity IDE setelah Input Konten Factual)  
**Owner & Brand Name:** **Albert Saputra** (Person-First, Public Website Language: **English**)  
**Target Files (Phase 2):** `website/index.html`, `website/bio-link.html`, `website/styles.css`, `website/app.js`, root `index.html`  
**Approved Art Direction:** **D — Hybrid Editorial — Option A ("Monochrome Architectural Feather")** (~70% Light Editorial / ~30% Dark Editorial), berjangkar pada referensi visual pilihan Albert (`media_1795411216405_80cafa09.jpg`) dan portrait hero final yang telah disetujui (`reference/albert-hero-portrait.jpg`).

---

## 1. Positioning & Identitas Brand

### Core Positioning
> **Albert Saputra — Human-First Independent Digital Creator & Web Builder**  
> Seorang kreator digital independen yang merancang dan membangun website modern, konsep pengalaman web editorial, serta website templates yang siap pakai — dengan pendekatan yang tenang, jujur, dan mengutamakan kualitas karya.

### Hierarki Identitas (Wajib Dijaga)
1. **Albert Saputra sebagai Individu (Utama):** Pengunjung langsung melihat ada manusia nyata di balik karya — bukan studio anonim atau perusahaan SaaS.
2. **Karya & Craft (Bukti Utama):** Proyek nyata dan studi konsep (seperti Serena Flow dan Marcus Vale) tampil awal sebagai bukti kualitas rasa desain & eksekusi kode.
3. **Website Templates & Digital Creations (Lapisan Komersial — Soft Selling):** Mudah ditemukan dan menarik dengan **harga transparan** serta **inquiry langsung via email / WhatsApp**, hadir sebagai kurasi karya — bukan toko diskon agresif.
4. **Eksperimen, Catatan & Kontak (Koneksi Manusia):** Menunjukkan rasa ingin tahu teknis Albert dan jalur komunikasi yang langsung serta jujur.

### Brand Personality
- **Yang Harus Terasa:** Human, thoughtful, independent, creative, modern, approachable, confident without being loud, technically curious, professional without corporate stiffness, personal without amateur clutter.
- **Yang Harus Dihindari:** Agensi marketing generik, landing page SaaS penuh badge, entrepreneur agresif, affiliate marketer, founder fiktif, atau copy bergaya AI hype (*"skyrocket"*, *"unlock hidden engagement"*, *"Founding Spots"*).

### Target Visitors
1. **Kreator Independen, Coach & Studio Kecil** yang mencari inspirasi atau ingin membeli website template siap pakai dengan kualitas desain editorial.
2. **Calon Klien Freelance / Custom Project** yang menilai selera desain dan kerapian teknis Albert sebelum menghubungi.
3. **Rekan & Pengikut Komunitas** yang tertarik pada eksperimen web, AI workflow, dan catatan kreatif Albert.

---

## 2. Inventaris Konten Lama: Retain / Rewrite / Remove (Terkunci Phase 1.5)

| Elemen Eksisting (`website/`) | Keputusan Terkunci | Alasan |
| :--- | :--- | :--- |
| Link proyek Serena Flow & Marcus Vale (`index.html:529-601`) | **RETAIN & REWRITE** | Pertahankan link live (HTTP 200), ganti wireframe CSS `.mini-browser` dengan preview visual berkualitas, perjelas peran Albert, perbaiki typo `serenah.site` (`:329`), dan selaraskan deskripsi Marcus pasca-repositioning. |
| Fondasi static vanilla & pola JS aksesibel (focus trap drawer, XSS-safe DOM, copy email, reduced-motion) | **RETAIN (Refactor)** | Fondasi teknis sudah bersih; tetap 100% static HTML/CSS/JS tanpa framework. |
| Root redirect (`index.html`) | **RETAIN & REWRITE** | Pertahankan redirect, perbarui `<title>` (`Albert Saputra`) & fallback style ke identitas baru. |
| `website/bio-link.html` | **REWRITE** | Hapus 4 link promo `$3/$5/$7`; jadikan Personal Hub ringkas untuk `Albert Saputra` (Selected Work, Templates, Contact Email/WhatsApp, akun sosial terverifikasi). |
| Booking Calendar lokal tanpa backend (`#book`, `index.html:670-897`) | **REMOVE & REPLACE** | Diganti dengan seksi **Contact langsung yang jujur** (Email dengan Copy + `mailto:` & link **WhatsApp** langsung) agar setiap pesan benar-benar sampai ke Albert. |
| Hero *"Turn Your Social Presence Into Income"* + 4-tab shell | **REMOVE & REPLACE** | Murni pitch SaaS/agensi; diganti dengan Split Hybrid Editorial Hero memakai portrait hero final. |
| `#income-systems` Bento Grid, `#packages` (`$3/$5/$7` + `"First 10 Founding Spots"` + `"Zero Recycled Templates"`), `#transformations` (`@alex.creates`), `#faq` harga | **REMOVE (RESMI DIPENSIUNKAN)** | Paket `$3/$5/$7` Grand Opening resmi dipensiunkan; diganti **Templates & Digital Creations** dengan harga transparan + inquiry email/WhatsApp. |

---

## 3. Struktur Homepage & Strategi Soft-Selling (Terkunci Phase 1.5)

Mengurangi panjang halaman dari `7,087px` (7 blok gelap padat) menjadi **5–6 bab editorial terfokus (~4,200–5,000px desktop)** dalam bahasa publik **English**, dengan ritme **~70% Light / ~30% Dark**:

### Top Navigation — Keputusan Terkunci (Solusi Photo-Agnostic Kontras `Contact`)
- **Keputusan Terkunci:** **Full-Width Light Editorial Topbar (`72px`) di atas Split Hero**, dan **ikon bulan sabit (dark-mode toggle) DIHILANGKAN di v1**.
- **Spesifikasi:**
  - Header solid terang setinggi `72px` (`#F4F5F6`, `border-bottom: 1px solid rgba(17,18,20,0.08)`).
  - Kiri: Wordmark typographic bersih **`Albert Saputra`** (sans-serif bold `700`, tinta `#111214`, kontras **`17.17:1`**, tanpa kotak monogram neon).
  - Kanan: Tautan bersih **`Work · Templates · About · Contact`** *(+ `Journal` hanya bila 2–3 entri nyata sudah siap untuk v1)*.
  - Split Hero dimulai rapi pada `y = 72px` — **mengeliminasi 100% risiko tabrakan kontras link `Contact`** terhadap batas pilar gelap (`center-top`) dan dinding terang (`top-right ~15–18%`) pada `reference/albert-hero-portrait.jpg`.
  - Nol ikon bulan sabit dekoratif; situs tetap konsisten sebagai **Hybrid Editorial (~70% light / ~30% dark)** tanpa beban QA dual-theme.

### Struktur Seksi Homepage

| Seksi | Tone Permukaan | Tujuan & Komposisi | Strategi CTA |
| :--- | :--- | :--- | :--- |
| **1. Hero (Split Light–Dark Architectural Editorial)** | **LIGHT + Approved Portrait Panel** | Eyebrow uppercase bersih (`INDEPENDENT DIGITAL CREATOR`), headline serif editorial singkat, subheadline 2 baris human-first dalam English, **Approved Hero Portrait** (`website/assets/albert-hero-portrait.webp` / `.jpg`) di panel kanan dengan transisi tonal halus yang dievaluasi secara responsif, serta scroll cue minimal (`Scroll to explore`). **Nol badge SaaS, nol harga di hero.** | Primary pill hitam solid (`Explore My Work →` ke `#work`) + Secondary link editorial (`— Learn More —` ke `#about`). |
| **2. Selected Work** | **LIGHT** | Naik dari seksi ke-5 menjadi **seksi ke-2** agar kualitas karya berbicara duluan. Menampilkan proyek terbaik (**Serena Flow**, **Marcus Vale**) dengan preview visual nyata (`16:10`), tujuan proyek, peran nyata Albert (*Design & Frontend*), detail craft, dan label jujur (`Concept Study`). | Link teks bersih `Explore Live →` per karya (tanpa tombol jualan). |
| **3. Templates & Digital Creations** | **DARK EDITORIAL (~18–20% tinggi halaman)** | **Lapisan Komersial Utama (Soft Selling).** Kanvas gelap obsidian `#141518` membuat preview template tampil menonjol layaknya galeri pameran. Menampilkan template pilihan Albert dengan preview jernih, cocok untuk siapa, isi paket teknis, dan **harga transparan** *(angka asli menunggu input Albert — nol harga karangan)*. **Nol countdown palsu, nol harga coret, nol matematika `"$0.23/day"`.** | 2 aksi tenang per template: `Live Preview` + `Inquire via Email / WhatsApp`. |
| **4. About Albert Saputra** | **LIGHT** | **Portrait About berstatus PENDING (DILARANG mengulang foto Hero atau men-generate foto baru).** Dirancang secara intensional agar tampak lengkap, seimbang, dan bermakna **tanpa gambar**: komposisi editorial 2 kolom tipografis (`max-width: 65ch` narasi personal jujur di kiri + kolom terstruktur *Current Focus, Capabilities & Approach* dengan hairline rules di kanan). Nol cerita founder fiktif. | Tidak butuh CTA jualan; cukup alur baca alami. |
| **5. Journal & Experiments *(Kondisional v1 / v1.1)*** | **LIGHT (Subtle Cool Mist Band)** | **Aturan Terkunci:** Diluncurkan di v1 sebagai strip ringkas *"Experiments / Notes"* **hanya jika 2–3 entri nyata sudah siap**. Jika belum siap saat launch v1, seksi ini **ditunda rapi ke v1.1** agar website tidak tampak kosong atau terbengkalai. | Link baca minimalis per entri (bila aktif). |
| **6. Contact & Footer** | **DARK EDITORIAL (~12–13% tinggi halaman)** | Penyeimbang rasio ~70% Light / ~30% Dark (`Seksi 3 + Seksi 6 ≈ 30–33%`). Ajakan kolaborasi/pertanyaan template yang manusiawi, jalur kontak langsung yang nyata: **Email (Copy + `mailto:`)** dan **WhatsApp link langsung**, tautan `Personal Hub` (`bio-link.html`), serta ikon sosial terverifikasi. | Primary action: Email (`mailto:` + Copy) & WhatsApp direct link. |

### Disiplin CTA & Penyesuaian Ikon Sosial (Desktop vs. Mobile)
- Total tombol utama turun dari **16** menjadi **~5–7 aksi bermakna**; pills/badges turun dari **50** menjadi **< 10 metadata tag halus**.
- **Ikon Sosial (Hanya Akun Nyata Milik Albert):**
  - **Desktop (`>= 1024px`):** Jika tetap dipasang sebagai vertical rail di tepi kanan hero, bungkus dalam kapsul vertikal kontras tinggi (`background: rgba(244,245,246,0.90); backdrop-filter: blur(8px); border: 1px solid rgba(17,18,20,0.08); border-radius: 999px;`, tap target `44×44px`) karena tepi kanan foto asli berlatar dinding terang — atau tempatkan rapi di Contact/Footer saja bila ingin hero super bersih.
  - **Tablet & Mobile (`< 1024px`):** **Nonaktifkan vertical rail tepi kanan (`display: none`).** Tampilkan ikon sosial yang sama sebagai **baris horizontal inline yang rapi** (`gap: 12px`, tap target `44×44px`) di bawah area hero/CTA serta di dalam mobile drawer dan footer. Nol tumpang tindih dengan foto maupun area jempol.

---

## 4. Tiga Interpretasi Visual Hybrid Editorial (~70% Light / ~30% Dark)

Ketiga opsi berikut seluruhnya lulus **WCAG 2.1 AA (≥ 4.5:1)** dan dirancang agar tetap memiliki identitas unik yang jelas berbeda dari Serena Flow (mineral stone + olive `#24342b` + terracotta `#964c34` + `Cormorant Garamond`) maupun Marcus Vale (sand `#DFD5C7` + espresso `#231914` + cognac `#C88A3B` + `Fraunces`).

### Option A — "Monochrome Architectural Feather" — **DISETUJUI & TERKUNCI**
- **Palet Warna (~70% Light / ~30% Dark):**
  - *Light Surfaces:* Crisp Alabaster `#F4F5F6` (canvas utama), Cool Mist `#EAECEF` (band sekunder), Pure Surface `#FFFFFF` (kartu/frame), Hairline `rgba(17,18,20,0.10)`.
  - *Light Ink:* Primary `#111214` (`17.17:1`), Body `#3D4148` (`9.39:1`), Muted `#595E67` (`5.97:1` di alabaster / `5.51:1` di mist).
  - *Dark Surfaces (Templates & Contact):* Deep Obsidian `#141518` (canvas gelap), Elevated Charcoal `#1E2025` (kartu), Hairline `rgba(255,255,255,0.12)`.
  - *Dark Ink:* Primary `#F4F5F6` (`16.73:1` di obsidian), Body `#C5C8CE` (`10.89:1` di obsidian), Muted `#9A9FA8` (`6.87:1` di obsidian `#141518` / `6.13:1` di charcoal `#1E2025`).
  - *CTA & Aksen Terkendali:* Primary pill monokrom `#111214` + `#FFFFFF` (`18.74:1`); aksen fokus/tautan sangat hemat **Architectural Ink Slate** `#2B4C7E` di terang (`7.89:1`) / `#8AB4E8` di gelap (`8.50:1`).
- **Tipografi:** `Newsreader` (400/500 editorial serif dengan optical sizing tajam di 56px maupun 28px — atau `Playfair Display` jika ingin kontras stroke lebih dramatis) + `Plus Jakarta Sans` atau `Inter` (400/500/600 body/UI, `Albert Saputra` wordmark 700) + `JetBrains Mono` (hemat untuk tanggal/spesifikasi).
- **Keselarasan dengan Portrait Hero Final:** Palet alabaster + obsidian monokrom selaras langsung dengan crewneck hitam matte, kacamata hitam, dan arsitektur beton dingin pada `reference/albert-hero-portrait.jpg` tanpa benturan warna sedikit pun.

### Option B — "Warm Paper & Graphite Monograph" *(Alternatif yang Dievaluasi)*
- Warm Archival Paper `#F8F6F2` + Soft Stone `#EFECE6` + Deep Graphite `#151618` + Editorial Ink Blue `#1E4B7A` (`8.30:1`) / `#8AB8E6` (`8.69:1`), `Newsreader` + `Plus Jakarta Sans`, portrait berbingkai klasik tanpa split feather. *(Tidak dipilih; Option A lebih selaras dengan referensi `D. Hybrid` dan tone dingin arsitektural foto hero.)*

### Option C — "Swiss Grid & Obsidian Precision" *(Alternatif yang Dievaluasi)*
- Gallery `#FAFAFA` + Mist `#F1F2F5` + True Obsidian `#0F1115` + Precision Pine Teal `#0E6650` (`6.63:1`) / `#52D6A8` (`10.39:1`), sans-only `Archivo`/`Space Grotesk` + `Inter`. *(Tidak dipilih karena meniadakan kehangatan serif editorial.)*

---

## 5. Approved Homepage Hero Portrait & Image Implementation Notes

### A. Status & Karakteristik Aktual Aset (Hasil Inspeksi Langsung — Nol Asumsi)
- **Status:** **FINAL APPROVED HOMEPAGE HERO PORTRAIT** (hanya digunakan di **Section 1 — Hero Homepage**; **DILARANG** dipakai ulang di seksi About).
- **Path Referensi Saat Ini (Master Lokal):** `reference/albert-hero-portrait.jpg` *(catatan penting: nama folder aktual di repo adalah `reference/`, bukan `_reference/`)*.
- **Spesifikasi File Terukur:**
  - Format: **JPEG (JFIF, 8-bit, 3-channel RGB)**
  - Dimensi piksel aktual: **`1856 × 2282 px`**
  - Aspek rasio aktual: **`0.8133`** (~`4:5` vertical portrait)
  - Ukuran file mentah: **`246,472 bytes`** (`240.70 KiB` / `246.47 KB`)

### B. Peran Visual & Pengaruh Terhadap Arah Desain (`D — Hybrid Editorial`)
1. **Crewneck Hitam Matte & Kacamata Hitam Klasik:** Memberikan jangkar tonal gelap (`#141518`–`#222428`) langsung di dalam seksi Hero yang dominan terang — menciptakan jembatan visual alami menuju band gelap **Templates** (`#141518`) dan **Contact/Footer** tanpa perlu kotak gelap buatan.
2. **Latar Arsitektural & Distribusi Terang–Gelap:** Sisi kiri gambar (~18–20% lebar frame) berupa latar arsitektural terang-lembut yang memungkinkan transisi ke kanvas `#F4F5F6` terasa organik; tengah-atas berupa pilar vertikal gelap yang membingkai rambut/kepala dengan tegas; sisi kanan (~15–18%) berupa dinding terang yang menjaga rasa lapang modern (sekaligus mengonfirmasi mengapa **Full-Width Light Topbar `72px`** adalah keputusan paling tepat agar navbar tidak pernah bertabrakan dengan transisi gelap–terang foto).
3. **Pencahayaan Daylight & Ekspresi Komposisional:** Cahaya alami lembut dari kiri atas membentuk rim light halus di rambut dan bahu serta warna kulit natural tanpa kesan studio kaku/AI neon. Tatapan tiga perempat yang tenang ke kanan memancarkan karakter *confident without being loud* dan *independent digital creator*.

### C. Pedoman Komposisi Responsif (Fleksibel — Jangan Paksakan Fixed Width Sebelum Uji Responsif di IDE)
- **Evaluasi Komposisi Aktual Sebelum Mengunci Pixel:** Jangan memaksakan lebar piksel tetap (mis. `420px`) atau rasio kontainer kaku sebelum menguji tampilan aktual `1856 × 2282 px` di breakpoint desktop (`1440×900`, `1280×800`) dan mobile (`390×844`, `360×800`) di Antigravity IDE.
- **Kalibrasi Gradient Feather Sisi Kiri:** Karena subjek berada mendekati **tengah horizontal** (`~48–52%` sumbu X) dengan ruang terang kiri hanya `~18–20%`, transisi CSS gradient feather kiri harus dijaga **halus dan sempit (sekitar `12–18%` lebar panel media, dievaluasi visual di IDE)** — jangan terlalu lebar agar tidak memudarkan telinga kiri, rambut, atau bahu Albert.
- **Framing & Crop Safety:** Puncak kepala berada sekitar `12–13%` dari tepi atas dan kacamata/mata di `~34–38%` dari tepi atas. Gunakan `object-fit: cover` dengan titik fokus atas-tengah yang diuji secara visual (titik awal evaluasi: `object-position: 50% 20%` hingga `54% 22%`) agar dahi dan kacamata tidak pernah terpotong pada rasio layar mana pun.
- **Mobile Behavior (`< 1024px`):** Portrait menumpuk rapi di bawah blok headline + CTA utama (atau terbingkai proporsional sesuai hasil uji visual) sehingga headline + tombol `Explore My Work →` tetap langsung terbaca above the fold di `390×844` dan `360×800`.

### D. Aturan Aset Publik & `.gitignore` (Keputusan Terkunci)
- **Kondisi Repo Saat Ini:** `.gitignore:3` mengabaikan `website/assets/`, sedangkan Serena (`projects/serena-flow-yoga-concept/assets/`) dan Marcus (`projects/marcus-vale-mentor-concept/assets/`) sudah menggunakan subfolder `assets/` yang ter-track di GitHub Pages.
- **JANGAN** menaruh gambar produksi ke `website/assets/` sebelum `.gitignore:3` diperbaiki!
- **Jalur Aset Publik Final yang Direkomendasikan (Phase 2 — Wave 0 & Wave 1):**
  - **Primary (Optimized):** `website/assets/albert-hero-portrait.webp`
  - **Fallback (Optimized):** `website/assets/albert-hero-portrait.jpg`
  - **Master Preservation:** Pertahankan file asli `reference/albert-hero-portrait.jpg` tetap utuh dan **tambahkan `reference/` ke `.gitignore`** agar master mentah tetap aman di lokal dan tidak ikut ter-publish ke GitHub Pages.

### E. Status Seksi About Portrait (Pending — Desain Intensional Tanpa Foto)
- **Status:** **PENDING** (foto khusus untuk seksi About akan diberikan Albert di kemudian hari; **DILARANG** mengulang foto hero atau men-generate portrait tambahan).
- **Strategi Layout Intensional Tanpa Foto:** Rancang Section 4 (*About Albert Saputra*) sebagai **komposisi editorial tipografis 2 kolom** — kolom narasi utama (`max-width: 65ch`, 1–2 paragraf jujur + pull statement tipis) dipasangkan dengan kolom kanan terstruktur (*Focus Areas, Working Style & Tools*) memakai garis hairline tipis. Dengan cara ini, seksi About terlihat 100% selesai dan berkelas sejak v1 — dan tetap mudah menerima slot foto opsional saat foto About asli tersedia di masa depan.

---

## 6. Sisa Input Konten Factual dari Albert (Bukan Keputusan Desain)

Seluruh keputusan desain & arsitektur sudah **terkunci**. Hanya fakta personal/bisnis nyata berikut yang masih `[PENDING OWNER INPUT]` (tidak boleh dikarang oleh tim implementasi):
1. **Bio Jujur "About Albert Saputra" (2–4 kalimat dalam English):** Latar belakang singkat, minat pada web design/frontend/AI tools, dan apakah ingin mencantumkan lokasi (mis. Indonesia / WIB).
2. **Email Publik & WhatsApp Nyata:** Konfirmasi apakah `hello@albertstudio.site` aktif atau gunakan email lain, serta link/nomor WhatsApp publik untuk inquiry template & proyek.
3. **Daftar Akun Sosial Aktif:** URL nyata untuk ditampilkan di rail/baris ikon sosial (mis. GitHub, YouTube, LinkedIn, Instagram, X).
4. **Daftar Template & Harga Transparan:** Judul template pertama yang akan dipamerkan di Section 3, deskripsi singkat fitur, dan harga nyatanya.
5. **Opsional — 2–3 Entri Awal Journal/Experiments:** Hanya jika Albert ingin langsung menampilkan seksi Journal di v1 (jika belum ada, otomatis ditunda ke v1.1).
