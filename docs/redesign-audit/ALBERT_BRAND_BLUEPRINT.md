# ALBERT BRAND BLUEPRINT — Main Personal Website (`website/`)

**Status:** Phase 1 — Approved Direction Blueprint (Menunggu Sign-Off Final Albert)  
**Target:** `website/index.html`, `website/bio-link.html`, root `index.html`  
**Approved Art Direction:** **D — Hybrid Editorial** (~70% Light Editorial / ~30% Dark Editorial), berjangkar pada referensi visual pilihan Albert (`media_1795411216405_80cafa09.jpg`).

---

## 1. Positioning & Identitas Brand

### Core Positioning
> **Albert — Human-First Independent Digital Creator & Web Builder**  
> Seorang kreator digital independen yang merancang dan membangun website modern, konsep pengalaman web editorial, serta website templates yang siap pakai — dengan pendekatan yang tenang, jujur, dan mengutamakan kualitas karya.

### Hierarki Identitas (Wajib Dijaga)
1. **Albert sebagai Individu (Utama):** Pengunjung langsung melihat ada manusia nyata di balik karya — bukan studio anonim atau perusahaan SaaS.
2. **Karya & Craft (Bukti Utama):** Proyek nyata dan studi konsep (seperti Serena Flow dan Marcus Vale) tampil awal sebagai bukti kualitas rasa desain & eksekusi kode.
3. **Website Templates & Digital Creations (Lapisan Komersial — Soft Selling):** Mudah ditemukan dan menarik, tetapi hadir sebagai kurasi karya, bukan toko diskon yang memaksa.
4. **Eksperimen, Catatan & Kontak (Koneksi Manusia):** Menunjukkan rasa ingin tahu teknis Albert dan jalur komunikasi yang langsung serta jujur.

### Brand Personality
- **Yang Harus Terasa:** Human, thoughtful, independent, creative, modern, approachable, confident without being loud, technically curious, professional without corporate stiffness, personal without amateur clutter.
- **Yang Harus Dihindari:** Agensi marketing generik, landing page SaaS penuh badge, entrepreneur agresif, affiliate marketer, founder fiktif, atau copy bergaya AI hype (*"skyrocket"*, *"unlock hidden engagement"*, *"Founding Spots"*).

### Target Visitors
1. **Kreator Independen, Coach & Studio Kecil** yang mencari inspirasi atau ingin membeli website template siap pakai dengan kualitas desain editorial.
2. **Calon Klien Freelance / Custom Project** yang menilai selera desain dan kerapian teknis Albert sebelum menghubungi.
3. **Rekan & Pengikut Komunitas** yang tertarik pada eksperimen web, AI workflow, dan catatan kreatif Albert.

---

## 2. Inventaris Konten Lama: Retain / Rewrite / Remove / Confirm

| Elemen Eksisting (`website/`) | Keputusan | Alasan |
| :--- | :--- | :--- |
| Link proyek Serena Flow & Marcus Vale (`index.html:529-601`) | **RETAIN & REWRITE** | Pertahankan link live (HTTP 200), ganti wireframe CSS `.mini-browser` dengan preview visual berkualitas, perjelas peran Albert, perbaiki typo `serenah.site` (`:329`), dan selaraskan deskripsi Marcus pasca-repositioning. |
| Fondasi static vanilla & pola JS aksesibel (focus trap drawer, XSS-safe DOM, copy email, reduced-motion) | **RETAIN (Refactor)** | Fondasi teknis sudah bersih; tetap tanpa framework. |
| Root redirect (`index.html`) | **RETAIN & REWRITE** | Pertahankan redirect, perbarui `<title>` & fallback style ke identitas baru. |
| `website/bio-link.html` | **REWRITE** | Hapus 4 link promo `$3/$5/$7`; jadikan Personal Hub ringkas (portrait/wordmark, Selected Work, Templates, Journal/Notes, Contact). |
| Booking Calendar (`#book`, `index.html:670-897`) | **CONFIRM / REWRITE** | Jangan berpura-pura mengirim request jika belum ada backend. Ganti dengan seksi Contact langsung yang jujur (email nyata + copy + opsi Formspree/Web3Forms/Cal.com bila Albert mau). |
| Hero *"Turn Your Social Presence Into Income"* + 4-tab shell | **REMOVE & REPLACE** | Murni pitch SaaS/agensi. |
| `#income-systems` Bento Grid, `#packages` (`$3/$5/$7` + `"First 10 Founding Spots"` + `"Zero Recycled Templates"`), `#transformations` (`@alex.creates`), `#faq` harga | **REMOVE (Konfirmasi paket `$3–$7`)** | Bertentangan dengan posisi personal brand dan tujuan penjualan website templates. |

---

## 3. Struktur Homepage & Strategi Soft-Selling

Mengurangi panjang halaman dari `7,087px` (7 blok gelap padat) menjadi **6 bab editorial terfokus (~4,400–5,200px desktop)** dengan ritme **~70% Light / ~30% Dark**:

### Top Navigation (Solusi Wajib untuk Isu Kontras `Contact`)
Pada referensi visual `D. Hybrid`, tautan `Work · About · Journal · Contact` mengambang langsung di atas foto kanan sehingga link `Contact` menabrak batas pilar gelap dan dinding terang foto. Karena foto asli Albert nanti bisa memiliki distribusi terang–gelap yang berbeda, blueprint ini mengunci **dua opsi solusi photo-agnostic yang dijamin lolos WCAG AA (≥ 4.5:1)**:

1. **Opsi Nav 1 — Full-Width Light Editorial Topbar di Atas Split Hero *(DIREKOMENDASIKAN — Nol Risiko Kontras)***
   - Header solid terang setinggi `72px` (`#F4F5F6`, `border-bottom: 1px solid rgba(17,18,20,0.08)`), wordmark bold **`Albert.`** di kiri, tautan bersih **`Work · Templates · About · Journal · Contact`** di kanan (tinta `#111214`, kontras **`17.17:1`**).
   - Split hero terang–gelap dengan portrait dimulai rapi pada `y = 72px`. Kontras 100% aman meskipun Albert berganti foto berkali-kali.
2. **Opsi Nav 2 — Full-Bleed `y = 0` Portrait + Frosted Nav Capsule**
   - Jika Albert ingin foto portrait tetap menyentuh tepi paling atas layar (`y = 0`) persis seperti mockup, seluruh grup nav kanan dibungkus satu kapsul frosted terkontrol (`background: rgba(17, 18, 20, 0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; padding: 6px 16px;` dengan teks `#F4F5F6`, atau kapsul terang `rgba(244,245,246,0.90)` dengan teks `#111214`). Dijamin kontras **≥ 10:1** di atas area foto terang maupun gelap.

*Catatan Ikon Bulan (Dark-Mode Toggle):* Mockup referensi menampilkan ikon bulan sabit di pojok kanan atas. Karena arah desain yang disetujui adalah **Hybrid Editorial (~70% light / ~30% dark)** dan bukan dual-theme switcher, rekomendasi awal adalah **menghilangkan ikon bulan tersebut di v1** agar tidak ada tombol dekoratif atau beban QA ganda — kecuali Albert secara eksplisit meminta fitur theme-toggle penuh.

### Enam Seksi Homepage

| Seksi | Tone Permukaan | Tujuan & Komposisi | Strategi CTA |
| :--- | :--- | :--- | :--- |
| **1. Hero (Split Light–Dark Feather)** | **LIGHT (~55%) + Portrait Panel (~45%)** | Wordmark `Albert.`, eyebrow uppercase bersih (`INDEPENDENT DIGITAL CREATOR`), headline serif editorial singkat, subheadline 2 baris human-first, portrait placeholder di kanan dengan transisi CSS gradient feather halus, scroll cue minimal di kiri bawah (`Scroll to explore`). **Nol badge SaaS, nol harga di hero.** | Primary pill hitam solid (`Explore My Work →` ke `#work`) + Secondary link editorial (`— Learn More —` ke `#about`). |
| **2. Selected Work** | **LIGHT** | Naik dari seksi ke-5 menjadi **seksi ke-2** agar kualitas karya berbicara duluan. Menampilkan proyek terbaik (**Serena Flow**, **Marcus Vale**, dll.) dengan preview visual beresolusi tinggi (`16:10`), tujuan proyek, peran nyata Albert (*Design & Frontend*), detail craft, dan label jujur (`Concept Study` jika masih konsep). | Link teks bersih `Explore Live →` per karya (tanpa tombol jualan). |
| **3. Templates & Digital Creations** | **DARK EDITORIAL (~18–20% tinggi halaman)** | **Lapisan Komersial Utama (Soft Selling).** Transisi ke kanvas gelap obsidian membuat preview template website tampil menonjol layaknya galeri pameran. Menampilkan 1–3 template (yang benar-benar Albert konfirmasi) dengan preview jernih, cocok untuk siapa, isi paket teknis, dan harga transparan (atau status `"Early Preview / Notify"` jika belum siap jual). **Nol countdown palsu, nol harga coret, nol matematika `"$0.23/day"`.** | 2 aksi tenang per template: `Live Preview` + `Get Template` / `Inquire`. |
| **4. About Albert** | **LIGHT** | Layout 2 kolom editorial (`max-width: 65ch` untuk narasi jujur Albert + sidebar ringkas *Current Focus / Tools & Interests* seperti Editorial UI, Frontend Craft, AI Workflows — wajib dikonfirmasi Albert). Nol cerita founder fiktif. | Tidak butuh CTA jualan; cukup alur baca alami. |
| **5. Journal & Experiments** | **LIGHT (Subtle Cool Mist Band)** | Daftar indeks editorial ringkas (tanggal + judul + 1 baris ringkasan + 1 tag kategori: `Web Dev`, `AI Experiment`, `UI Notes`) — maksimal 2–4 tulisan/eksperimen yang realistis dijaga Albert. Bila konten belum siap saat launch, dapat dijadikan strip ringkas *"Experiments / Lab"* atau disembunyikan hingga ada 2–3 entri nyata. | Link baca minimalis per entri. |
| **6. Contact & Footer** | **DARK EDITORIAL (~12–13% tinggi halaman)** | Penyeimbang rasio ~70% Light / ~30% Dark (`Seksi 3 + Seksi 6 ≈ 30–33%`). Ajakan kolaborasi/pertanyaan template yang ramah dan manusiawi, 1 jalur kontak utama terverifikasi (email nyata Albert dengan tombol Copy + `mailto:`, plus opsi form nyata / booking link bila disetujui), tautan `Personal Hub` (`bio-link.html`), dan ikon sosial terverifikasi. | 1 tombol aksi kontak utama yang jujur. |

### Disiplin CTA & Pengurangan Kebisingan Visual
- Total tombol utama turun dari **16** menjadi **~5–7 aksi bermakna**.
- Total elemen pill/badge turun dari **50** menjadi **< 10 metadata tag halus**.
- **Aturan Ikon Sosial Vertikal (Desktop vs. Mobile):**
  - **Desktop (`>= 1024px`):** Hanya menampilkan akun sosial nyata milik Albert. Jika ditempatkan di tepi kanan hero seperti mockup, bungkus dalam kapsul vertikal halus berlatar kontras tinggi (`background: rgba(244,245,246,0.88); backdrop-filter: blur(8px); border-radius: 999px;`) dengan area klik `44×44px` agar tidak tenggelam di atas foto gelap atau terpotong di tepi bawah.
  - **Tablet & Mobile (`< 1024px`):** **Nonaktifkan vertical rail tepi kanan (`display: none`).** Tampilkan ikon sosial yang sama sebagai **baris horizontal inline yang rapi** (`gap: 12px`, tap target `44×44px`) di bawah blok CTA/portrait hero serta di dalam mobile drawer dan footer. Nol tumpang tindih dengan foto maupun jempol saat scroll.

---

## 4. Tiga Interpretasi Visual Hybrid Editorial (~70% Light / ~30% Dark)

Ketiga opsi berikut seluruhnya lulus **WCAG 2.1 AA (≥ 4.5:1)** dan dirancang agar tetap memiliki identitas unik yang jelas berbeda dari Serena Flow (mineral stone + olive `#24342b` + terracotta `#964c34` + `Cormorant Garamond`) maupun Marcus Vale (sand `#DFD5C7` + espresso `#231914` + cognac `#C88A3B` + `Fraunces`).

### Option A — "Monochrome Architectural Feather" *(Anchor Langsung Referensi `D. Hybrid` Albert)* — **DIREKOMENDASIKAN**
- **Palet Warna (~70% Light / ~30% Dark):**
  - *Light Surfaces:* Crisp Alabaster `#F4F5F6` (canvas utama), Cool Mist `#EAECEF` (band sekunder), Pure Surface `#FFFFFF` (kartu/frame), Hairline `rgba(17,18,20,0.10)`.
  - *Light Ink:* Primary `#111214` (`17.17:1`), Body `#3D4148` (`9.39:1`), Muted `#595E67` (`5.97:1` di alabaster / `5.51:1` di mist).
  - *Dark Surfaces (Templates & Contact):* Deep Obsidian `#141518` (canvas gelap), Elevated Charcoal `#1E2025` (kartu), Hairline `rgba(255,255,255,0.12)`.
  - *Dark Ink:* Primary `#F4F5F6` (`16.73:1` di obsidian), Body `#C5C8CE` (`10.89:1` di obsidian), Muted `#9A9FA8` (`6.87:1` di obsidian `#141518` / `6.13:1` di charcoal `#1E2025`).
  - *CTA & Aksen Terkendali:* Primary pill monokrom `#111214` + `#FFFFFF` (`18.74:1`); aksen fokus/tautan sangat hemat **Architectural Ink Slate** `#2B4C7E` di terang (`7.89:1`) / `#8AB4E8` di gelap (`8.50:1`).
- **Tipografi:** `Newsreader` (400/500 editorial serif dengan optical sizing tajam di 56px maupun 28px — atau `Playfair Display` jika ingin kontras stroke lebih dramatis seperti mockup) + `Plus Jakarta Sans` atau `Inter` (400/500/600 body/UI, `Albert.` wordmark 700) + `JetBrains Mono` (hemat untuk tanggal/spesifikasi).
- **Nuansa Layout:** Split hero terang–gelap dengan CSS gradient feather halus, ruang napas lega, galeri template berlatar obsidian pekat, transisi bersih tanpa kartu bento berlebihan.
- **Kelebihan:** 100% selaras dengan referensi `D. Hybrid` yang Albert sukai; kanvas monokrom netral membuat proyek berwarna (Serena, Marcus, dan template masa depan) tampil menonjol tanpa tabrakan warna.
- **Catatan/Tantangan:** Wajib menerapkan solusi kontras navbar (Opsi Nav 1 atau 2) dan komposisi foto kanan yang memberi ruang negatif kiri agar gradient feather mulus.

### Option B — "Warm Paper & Graphite Monograph" *(Alternatif Editorial Lebih Hangat & Klasik)*
- **Palet Warna:** Warm Archival Paper `#F8F6F2` + Soft Stone `#EFECE6` (~70% light) dipadu Deep Graphite `#151618` + Charcoal `#1E2024` (~30% dark); Ink `#17171A` (`16.57:1`); aksen **Editorial Ink Blue** `#1E4B7A` (`8.30:1`) / `#8AB8E6` (`8.69:1` dark).
- **Tipografi:** `Newsreader` (regular + italic) + `Plus Jakarta Sans` + `JetBrains Mono`.
- **Nuansa Layout:** Portrait `4:5` dibingkai rapi di kolom kanan dalam grid klasik (tanpa full-bleed edge atau gradient feather), garis pembatas hairline, nuansa kertas buku hangat.
- **Kelebihan:** Nol kompleksitas overlap navbar/foto; terasa sedikit lebih hangat dan organik.
- **Kekurangan:** Kurang modern dan kurang dramatis dibanding split-hero gradient feather yang Albert pilih di referensi.

### Option C — "Swiss Grid & Obsidian Precision" *(Alternatif Teknis Sans-Only)*
- **Palet Warna:** Gallery `#FAFAFA` + Mist `#F1F2F5` (~70% light) + True Obsidian `#0F1115` (~30% dark); aksen **Precision Pine Teal** `#0E6650` (`6.63:1`) / `#52D6A8` (`10.39:1` dark).
- **Tipografi:** `Archivo` atau `Space Grotesk` + `Inter` + `JetBrains Mono` (tanpa serif).
- **Nuansa Layout:** Grid Swiss 12 kolom dengan garis struktur tegas, radius tajam `4–6px`, indeks catatan bergaya tabel teknis.
- **Kelebihan:** Kredibilitas engineering/teknis paling kuat.
- **Kekurangan:** Menghilangkan kehangatan tipografi serif editorial yang secara spesifik disukai Albert di referensi `D. Hybrid`.

### Rekomendasi Final
**Option A — "Monochrome Architectural Feather"**, dipadukan dengan **Opsi Nav 1 (Full-Width Light Topbar)** atau **Opsi Nav 2 (Frosted Nav Capsule)** sesuai pilihan Albert, **Portrait Placeholder Jujur (`1600×2000px`)**, dan **Mobile Horizontal Social Row**.

---

## 5. Spesifikasi Portrait Photography & Placeholder (`read.md` Section 8)

- **Aturan Anti-Fabrikasi Mutlak:** **DILARANG** memakai wajah AI dari mockup referensi (`media_1795411216405_80cafa09.jpg`), foto stok orang lain, atau wajah hasil generasi AI seolah-olah itu Albert. Selama foto asli dari HP Albert belum tersedia, gunakan placeholder arsitektural yang jujur dan rapi.
- **Jumlah:** **1 foto portrait utama** di Hero (boleh dipakai ulang sebagai avatar lingkaran kecil di `bio-link.html`).
- **Dimensi & Aspek Rasio:**
  - **Sumber Foto Asli (Saat Albert Menyerahkan Foto):** Minimal **`1600 × 2000 px`** (rasio **`4:5` vertical**), diekspor ke **`WebP` + fallback `JPEG`**, target ukuran **`< 140 KB`**, dengan atribut eksplisit `width`, `height`, `loading="eager"`, dan `fetchpriority="high"` (mencegah CLS).
  - **Container Desktop (`>= 1024px`):** Kolom kanan split-panel `48–50%` lebar viewport (`min-height: 640px`, `max-height: 820px`, rasio efektif `4:5` hingga `3:4`). Tepi kiri foto diberi overlay gradient feather CSS (`width: 22–28%` dari kolom media) yang melebur mulus ke `#F4F5F6`.
  - **Container Mobile (`< 1024px`):** Menumpuk rapi di bawah headline + CTA hero (atau frame terbingkai dengan `aspect-ratio: 4 / 5` atau `1 / 1`, `max-height: 380px`, `border-radius: 12px`) agar headline dan tombol `Explore My Work →` tetap berada above the fold di `390×844` dan `360×800`.
- **Panduan Komposisi (Saat Memilih / Memotret / Meningkatkan Foto Asli):**
  - Posisi subjek **sedikit ke kanan dari titik tengah** (sisakan ~25–30% ruang tenang di sisi kiri agar efek gradient feather tidak memudarkan wajah/bahu Albert).
  - Mata berada di sepertiga atas (`~30–35%` dari tepi atas); sisakan ruang kepala aman jika memilih Opsi Nav 2 (full-bleed `y = 0`).
  - Pencahayaan alami (cahaya jendela atau luar ruangan teduh), latar arsitektural/dinding netral tidak ramai, ekspresi santai dan natural, pakaian warna gelap/netral solid (selaras dengan palet Option A).
- **Perilaku Crop CSS:**
  - Desktop split: `object-fit: cover; object-position: 58% 22%;`
  - Mobile: `object-fit: cover; object-position: 50% 20%;`
- **Tampilan Placeholder Phase 1 / Awal Phase 2:**
  - Permukaan gradasi tonal arsitektural matte (`#D8DCE2 → #3B3F46`) di balik gradient feather kiri yang sama persis, sehingga proporsi layout dan efek feather sudah teruji secara nyata, diberi caption tenang: `Portrait of Albert — Real Photo Pending (4:5 · 1600×2000px)`.

---

## 6. Informasi & Keputusan yang Wajib Dikonfirmasi Albert Sebelum Phase 2

1. **Nama Brand Utama:** Cukup **`Albert.`** (dengan deskriptor *"Independent Digital Creator"*), atau tetap membawa sub-nama studio?
2. **Gaya Navbar di Atas Split Hero:** Pilih **Opsi Nav 1 (Full-width light topbar `72px` di atas foto — nol risiko kontras)** atau **Opsi Nav 2 (Full-bleed `y=0` foto + frosted pill di belakang nav links)**?
3. **Ikon Bulan (Dark-Mode Toggle):** Setuju **dihilangkan di v1** (tetap Hybrid Editorial tetap ~70/30) atau ingin fitur switch tema penuh?
4. **Bio Jujur "About Albert" (2–4 kalimat):** Latar belakang singkat Albert, lokasi (apakah ingin mencantumkan Indonesia / WIB), serta minat utama di web, AI, dan digital tools.
5. **Realitas Produk Templates & Paket Lama:**
   - Template website mana saja yang siap dipamerkan/dijual duluan?
   - Apakah paket lama **`$3 / $5 / $7` Grand Opening**, gratis domain `.site` tahun pertama, dan 30 hari revisi unlimited resmi dipensiunkan, atau tetap ada layanan custom build?
   - Jalur pembayaran/pembelian apa yang akan dipakai? (Gumroad, Lemon Squeezy, Mayar, Lynk.id, atau inquiry via email/WhatsApp?)
6. **Kontak & Akun Sosial Terverifikasi:** Apakah `hello@albertstudio.site` aktif, atau email publik mana yang dipakai? Akun sosial apa saja yang benar-benar aktif untuk ditampilkan (GitHub, YouTube, LinkedIn, Instagram, X)? Dan untuk seksi Contact: cukup email + copy, form backend (Formspree/Web3Forms), atau link booking (Cal.com)?
7. **Kesiapan Seksi Journal / Experiments:** Apakah Albert siap mengisi 2–3 catatan/eksperimen awal, atau sebaiknya diluncurkan tanpa seksi Journal dulu?
8. **Bahasa Website Utama:** Tetap **Bahasa Inggris** (seperti sekarang), **Bahasa Indonesia**, atau **bilingual**?
