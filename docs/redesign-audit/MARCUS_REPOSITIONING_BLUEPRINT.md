# MARCUS REPOSITIONING BLUEPRINT — Marcus Vale (`projects/marcus-vale-mentor-concept/`)

**Status:** Phase 1 — Repositioning Blueprint (Menunggu Sign-Off Albert)  
**Target:** `projects/marcus-vale-mentor-concept/index.html`, `bio-link.html`, `styles.css`, `app.js`  
**Tujuan Utama (`read.md` Section 7):** Mengubah website dari funnel info-product & affiliate marketer menjadi **personal brand motivasional & berwawasan bisnis yang kredibel**, bebas konten afiliasi, dan bebas klaim fiktif yang menyamar sebagai fakta.

---

## 1. Diagnosis Masalah Positioning Saat Ini

Website Marcus Vale saat ini terasa seperti **template monetisasi info-product & affiliate marketer** karena 4 akar masalah struktural:
1. **Monetisasi Mendahului Gagasan:** Di atas fold (`index.html:22-159`), pengunjung langsung menghadapi **4 tombol/promosi E-Book `$19`** (link nav `E-Book`, tombol claret `Get the E-Book`, CTA hero `Buy the E-Book — $19`, dan `.hero-book-card` yang menimpa caption nama Marcus sebesar `284×34px`) sebelum membaca satu pun pemikiran atau prinsip Marcus.
2. **Nol Ruang untuk Filosofi & Tulisan Nyata:** Seluruh 6 seksi `index.html` (`#ebook`, `#videos`, `#mentoring`, `#availability`, `#setup`, `#faq`) adalah jalur konversi atau preview konten tak aktif. Tidak ada halaman/seksi About, Personal Philosophy, atau Esai/Perspektif Bisnis.
3. **Identitas Affiliate Marketer yang Menggerus Otoritas:** Menaruh `My Setup` di top navbar (`index.html:37`), menempelkan label `PARTNER LINK` pada 3 item di Section 05 (`:794, 801, 808`), dan mengisi lebih dari separuh `bio-link.html` (`:105-267`) dengan 6 kartu afiliasi (mikrofon, boom arm, timer, buku) membuat Marcus terlihat seperti kreator link afiliasi, bukan pemikir bisnis & kepemimpinan.
4. **Klaim Fiktif Berlebihan yang Berujung Dead-End:** Mengklaim buku edisi kedua 142 halaman, audio studio 90 menit, 4 kanal video aktif, dan klien di 3 benua — namun saat diklik semuanya berujung modal `"CONCEPT PREVIEW ONLY · NOT LIVE"` — justru merusak rasa kredibilitas.

---

## 2. Inventaris Penghapusan & Transformasi Elemen Afiliasi / Sales-Heavy

| Elemen / Selector | Lokasi File & Baris | Aksi | Alasan |
| :--- | :--- | :--- | :--- |
| Link navbar `My Setup` | `index.html:37, 72, 886` | **HAPUS** | Mengangkat gear afiliasi ke navigasi utama; ganti dengan `Philosophy` / `Perspectives`. |
| Section 05 `My Reading & Setup` + tag `PARTNER LINK` + disclosure afiliasi | `index.html:760-816` | **HAPUS TOTAL** | Sumber utama kesan "affiliate marketer". Nol link partner/perangkat keras. |
| `bio-link.html` `#my-stack` (6 kartu afiliasi, filter bar, `#partner-modal`, `initStackFilters`, `initPartnerModal`) | `bio-link.html:104-267, 291-332`; `app.js:1034-1113`; `styles.css:2477-2513` | **HAPUS TOTAL** | Menghilangkan etalase 6 produk partner (`Shure MV7+`, `Elgato`, `Time Timer`, `Leuchtturm`, 2 buku partner). |
| `.hero-book-card` (`FLAGSHIP E-BOOK · $19`) & `.book-3d` CSS mockup | `index.html:134-156, 184-194`; `styles.css:740-927` | **HAPUS TOTAL** | Memperbaiki bug tabrakan caption `284×34px` dan menghilangkan visual click-funnel. |
| Navbar `E-Book` & tombol claret `Get the E-Book` | `index.html:25, 40, 76-78` | **UBAH** | Ganti dengan tautan editorial tenang (`Perspectives`, `Contact` / `Start a Conversation`). |
| Hero CTA `Buy the E-Book — $19` & Hero Ledger (`142 Pages`, `YouTube · TikTok · IG`) | `index.html:92-114` | **UBAH** | Ganti dengan `Read Perspectives` + `Get in Touch`; hapus statistik produk/kanal tak terverifikasi. |
| Section 01 `#ebook` (`$19` Flagship + `$39` Bundle + `#ebook-modal`) | `index.html:161-283, 898-964`; `bio-link.html:59-70, 334-400` | **HAPUS / GANTI** | Ganti posisi #1 menjadi **Core Philosophy & Leadership Principles**. |
| Section 02 `#videos` (Thumbnail palsu YouTube/TikTok/IG + `#video-modal`) | `index.html:285-461, 966-1012` | **UBAH** | Ganti menjadi **Ideas, Essays & Business Perspectives** yang benar-benar bisa dibaca langsung tanpa tombol play palsu. |
| Section 03 `#mentoring` (paket coaching + `"limited monthly roster"`) | `index.html:463-575` | **UBAH** | Ubah menjadi fokus pemikiran bisnis/pengembangan diri + opsi percakapan/advisory yang tenang dan jujur tanpa kelangkaan palsu. |
| Copy bocor Cal.com / Calendly (`connects seamlessly to...`) | `index.html:712-714` | **HAPUS / TULIS ULANG** | Menghilangkan copy marketplace template yang merusak imersi. |
| Section 06 Sales FAQ (`Should I start with the $19 E-Book...`) | `index.html:818-868` | **HAPUS / RINGKAS** | Hapus FAQ upsell produk; pangkas panjang halaman dari `8,106px`. |
| `bio-link.html` funnel teratas (`Buy Flagship E-Book ($19)`) | `bio-link.html:58-78` | **UBAH** | Ubah menjadi **Editorial Profile & Contact Card** (Portrait, Philosophy ringkas, 3–4 link non-sales). |

---

## 3. Arah Personal Brand yang Direkomendasikan

### Positioning Baru
> **Marcus Vale — Calm Judgment, Leadership & Business Perspectives**  
> Personal brand motivasional dan berwawasan bisnis yang tenang, jernih, dan pragmatis — berfokus pada kualitas pengambilan keputusan, kepemimpinan yang matang, serta pengembangan diri yang disiplin.

### Pilar Konten Utama (`read.md:393-400`)
1. **Personal Philosophy:** Prinsip dasar tentang kejernihan berpikir, disiplin kerja, dan keputusan jangka panjang.
2. **Ideas & Insights:** Esai singkat atau catatan pemikiran yang langsung dapat dibaca di halaman (bukan terkunci di balik modal produk `$19` atau video palsu).
3. **Business & Leadership Perspectives:** Pandangan terstruktur soal memimpin tim, menyaring kebisingan (*signal over noise*), dan menghadapi kompleksitas bisnis.
4. **Personal Development:** Kerangka refleksi dan kebiasaan kerja yang membumi — bebas nada "hustle bro" atau janji instan.
5. **Contact & Conversation Opportunities:** Ajakan berdialog, kolaborasi, atau undangan diskusi yang dewasa dan tanpa tekanan.

---

## 4. Restrukturisasi Konten & Aturan Kredibilitas (Zero Fabrication)

Memangkas panjang halaman dari **`8,106px`** menjadi alur editorial fokus **5–6 seksi (~4,200–5,000px)**:

1. **Minimal Editorial Masthead:** Wordmark **`MARCUS VALE`** (person-first; sub-nama `Vale Clarity` opsional) + 4 tautan bersih: **`Philosophy · Perspectives · About · Contact`**.
2. **Section 1 — Editorial Hero (Manusia & Sudut Pandang Dulu):**
   - Headline tegas yang merangkum tesis kepemimpinan/bisnis Marcus (nol harga `$19`).
   - Pengantar 2–3 baris tentang gagasan yang dieksplorasi.
   - Portrait `assets/marcus-portrait.jpg` tampil utuh dengan caption bersih (tanpa kartu buku mengambang).
   - CTA tenang: `Read Perspectives` (primary) + `Start a Conversation` (secondary).
3. **Section 2 — Core Philosophy (3–4 Prinsip Inti):**
   - Mengangkat tulisan terbaik yang saat ini terkubur di `.session-standard` (`index.html:527-549` — *Signal Over Volume*, *Structured Rehearsal*, *Grounded Mindset*) menjadi seksi manifesto editorial utama.
4. **Section 3 — Ideas, Essays & Business Perspectives:**
   - Daftar bacaan editorial (3–4 topik esai dengan tag tema, judul, tesis singkat, dan reader/expandable view berisi tulisan konsep yang substansial — tanpa tombol video palsu).
   - Wajib diberi penanda transparan bila masih berupa **editorial concept essays** (bukan klaim publikasi nyata).
5. **Section 4 — About & Experience Context (Slot Anti-Fabrikasi):**
   - Ruang terstruktur untuk latar belakang, nilai, dan fokus pemikiran.
   - **Larangan Keras:** Jangan mengarang judul buku, jumlah klien, angka omzet, testimoni, sertifikasi mentoring, atau daftar panggung keynote. Gunakan penanda konsep jujur (`CONCEPT PROJECT · PORTFOLIO SHOWCASE`) atau slot `[OWNER INPUT REQUIRED]` sampai Albert menentukan apakah Marcus tetap persona konsep atau mewakili figur nyata.
6. **Section 5 — Conversations & Contact:**
   - Memanfaatkan ulang fondasi form/kalender yang sudah matang secara teknis, namun diubah bahasanya dari jualan sesi coaching menjadi **Start a Conversation / Inquire** (`General Dialogue`, `Business & Leadership Discussion`, `Speaking / Collaboration`), atau disederhanakan menjadi form kontak editorial bersih + Copy email.
7. **Streamlined `bio-link.html`:**
   - Kartu profil eksekutif ringkas: Portrait + 1 kalimat positioning + 3–4 tautan utama (`Featured Perspectives`, `Core Philosophy`, `Start a Conversation`, `Copy Email`). Nol etalase afiliasi.

### Peningkatan Kepercayaan & Kejujuran
- Pertahankan bar atas tipis `CONCEPT PROJECT · PORTFOLIO SHOWCASE` selama Marcus berfungsi sebagai studi kasus portofolio agar tidak ada pengunjung yang keliru menganggap konten konsep sebagai kredensial dunia nyata.
- Hapus total seluruh 7 kategori klaim fiktif/tanpa bukti yang terdeteksi di audit (`REDESIGN_AUDIT.md` §4).

---

## 5. Penyempurnaan Visual, Tipografi & Teknis (Tetap Unik dari Albert & Serena)

Marcus **tidak boleh** meniru nuansa putih-monokrom Albert maupun nuansa organik-botanical Serena. Pertahankan DNA **"Warm Architectural Monograph"** miliknya, namun dibuat jauh lebih lapang dan matang:

- **Palet Warna (Disederhanakan):**
  - Pertahankan trio khas: **Warm Sand/Paper (`#DFD5C7` / `#EAE2D6`) + Deep Espresso (`#231914`) + Cognac Brass (`#C88A3B`)**.
  - **Hapus 4 pill pastel SaaS** (`pill--slate`, `pill--forest`, `pill--claret`, `pill--cognac`) dan `partner-tag`. Batasi maksimal 2 aksen (Cognac Brass untuk garis/penanda editorial + Deep Espresso; Claret hanya bila perlu sebagai aksen fokus tunggal).
  - **Ringankan ritme visual:** Ubah dari tumpukan kartu gelap padat (~50% kotak berat) menjadi **~75–80% kanvas sand/paper editorial yang lapang + 1–2 band espresso terukur** (Hero atau Philosophy + Footer), memakai garis hairline horizontal daripada kartu bertumpuk.
- **Tipografi:**
  - Pertahankan **`Fraunces`** (display & pull-quote italic — manfaatkan bobot italic yang sudah diimpor!) + **`DM Sans`** (body 16px, reading measure **`60–65ch`** untuk esai) + **`IBM Plex Mono`** (pangkas pemakaiannya hingga ~70%, hanya untuk nomor esai/tanggal/caption).
- **Perbaikan Teknis & Responsif Wajib:**
  - Perbaiki overflow **`+3px`** `#calendar-days` di `360×800` (`styles.css:2931-2935`: ganti `min-width: 44px` menjadi `min-width: 0; width: 100%; min-height: 44px; gap: 4px;`) dan tambahkan `white-space: nowrap` pada `.tz-badge`.
  - Tambahkan **`Tab` focus trap** pada `initMobileDrawer()` (`app.js:283-340`).
  - Tambahkan `<link rel="icon">` SVG untuk menghilangkan error 404 `/favicon.ico`, serta tag Open Graph & canonical.
  - Perbaiki ambiguitas `"EST / Local Time"` dengan deteksi zona waktu browser yang jujur, dan konversi 3 JPG (`636 KB`) ke WebP + JPEG fallback.

---

## 6. Keputusan yang Dibutuhkan dari Albert

1. **Status Persona Marcus Vale:** Apakah Marcus murni **studi kasus konsep portofolio** (untuk memamerkan kemampuan desain Albert pada niche personal brand bisnis) atau mewakili klien/figur nyata?
2. **Nama Masthead:** Pertahankan `Marcus Vale — Vale Clarity` atau sederhanakan menjadi **`MARCUS VALE`** saja (person-first)?
3. **Bentuk Seksi Contact:** Tetap pakai widget kalender interaktif (dengan framing *Start a Conversation*) atau disederhanakan menjadi form kontak editorial + tombol copy email?
4. **Penggunaan Aset Foto:** Setuju mempertahankan `marcus-portrait.jpg` dan `keynote-stage.jpg` untuk konsep baru, dan memensiunkan `mentor-desk-setup.jpg` dari konteks afiliasi (hanya dipakai jika cocok sebagai visual ruang baca/menulis)?
