# ☕ KopiLand — Dokumentasi Teknis

> Media pembelajaran budidaya kopi interaktif dari Dinas Perkebunan Provinsi Jawa Barat.
> Dibangun sebagai single-file HTML5 game berbasis Canvas + DOM UI.

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Struktur File](#2-struktur-file)
3. [Konstanta & Konfigurasi Global](#3-konstanta--konfigurasi-global)
4. [State Management](#4-state-management)
5. [Data Model](#5-data-model)
   - [SEASONS](#seasons)
   - [COFFEES](#coffees)
   - [QUIZ_LEVELS](#quiz_levels)
   - [QUEST_POOL](#quest_pool)
6. [Sistem Rendering (Canvas)](#6-sistem-rendering-canvas)
7. [Grid Isometrik](#7-grid-isometrik)
8. [Game Loop](#8-game-loop)
9. [Sistem Hari & Musim](#9-sistem-hari--musim)
10. [Sistem Pertumbuhan Tanaman](#10-sistem-pertumbuhan-tanaman)
11. [Aksi Pemain (doAction)](#11-aksi-pemain-doaction)
12. [Popup Aksi](#12-popup-aksi)
13. [Sistem Partikel & Score Pop](#13-sistem-partikel--score-pop)
14. [Sistem Maskot](#14-sistem-maskot)
15. [Sistem Kuis](#15-sistem-kuis)
16. [Sistem Quest](#16-sistem-quest)
17. [Sistem Tutorial](#17-sistem-tutorial)
18. [Splash Screen & Intro Karakter](#18-splash-screen--intro-karakter)
19. [Info Panel Kopi](#19-info-panel-kopi)
20. [Info Musim (Multi-Slide)](#20-info-musim-multi-slide)
21. [Notifikasi Panen (Harvest Notif)](#21-notifikasi-panen-harvest-notif)
22. [Sistem Audio](#22-sistem-audio)
23. [Settings Panel](#23-settings-panel)
24. [Swipe Gesture & Navigasi Kuis](#24-swipe-gesture--navigasi-kuis)
25. [Auto Scale (Responsif)](#25-auto-scale-responsif)
26. [Alur Program Lengkap](#26-alur-program-lengkap)

---

## 1. Gambaran Umum

KopiLand adalah game simulasi pertanian kopi berbasis browser yang bersifat edukatif. Pemain dapat:

- Menanam 3 jenis kopi: **Arabika**, **Robusta**, **Liberika** di lahan masing-masing
- Menjalankan siklus tanam: Gali → Tanam → Siram → Panen
- Belajar pengaruh **musim dan cuaca** terhadap pertumbuhan tanaman
- Mengerjakan **kuis** 3 level untuk menguji pemahaman materi budidaya kopi
- Menyelesaikan **quest** harian untuk mendapatkan bonus poin

Seluruh game terkandung dalam **satu file HTML** tanpa framework eksternal — menggunakan Canvas HTML5 untuk rendering dunia, dan DOM HTML biasa untuk semua panel UI overlay.

---

## 2. Struktur File

```
index.html
├── <style>          — Seluruh CSS inline (font, layout, panel, kuis, quest, dsb.)
├── <body>
│   ├── #adpopup     — Popup iklan (muncul saat pertama load)
│   ├── #wrap        — Container utama game (420×780px, di-scale otomatis)
│   │   ├── #splash          — Splash screen pembuka
│   │   ├── #intro-screen    — Layar perkenalan karakter & 3 jenis kopi
│   │   ├── #swipe-hint      — Indikator geser ke kanan untuk buka kuis
│   │   ├── #quizpanel       — Panel kuis (slide dari kanan)
│   │   ├── <canvas id="c">  — Canvas rendering dunia isometrik
│   │   └── #ui              — Semua overlay UI (topbar, popup, info, quest, dsb.)
│   ├── #desktop-sidebar-left   — Sidebar desktop (info KopiLand)
│   └── #desktop-sidebar-right  — Sidebar desktop (cara bermain & tips musim)
└── <script>         — Seluruh logika game (inline)
```

**Aset yang dibutuhkan:**
```
assets/
├── fonts/
│   ├── nunito-var.woff2
│   └── nunitosans-var.woff2
├── img/
│   ├── logo-dinas.webp
│   ├── char_game.png
│   ├── kopi-arabika.webp
│   ├── kopi-robusta.webp
│   ├── kopi-liberika.webp
│   └── Ad-banner.jpeg
└── audio/
    ├── backsound.mp3
    ├── sfx-dig.mp3
    ├── sfx-seed.mp3
    ├── sfx-water.mp3
    ├── sfx-harvest.mp3
    └── sfx-click.mp3
```

---

## 3. Konstanta & Konfigurasi Global

```js
const CW = 420, CH = 780;
```
Ukuran logis canvas (lebar × tinggi dalam piksel). Seluruh koordinat dihitung berdasarkan nilai ini, lalu di-scale secara visual via CSS `transform: scale()`.

```js
const ST = { EMPTY: 0, DUG: 1, SEEDED: 2, SPROUT: 3, YOUNG: 4, MATURE: 5, RIPE: 6 };
```
Enum state pertumbuhan tiap petak tanah (plot). Nilai integer digunakan untuk perbandingan cepat (`>=`, `<`).

```js
const ST_LABEL = ["Tanah Kosong", "Sudah Digali", "Benih Ditanam", "Kecambah", "Bibit Muda", "Pohon Dewasa", "Siap Panen ✨"];
```
Label teks yang ditampilkan di popup aksi, sesuai indeks state.

```js
const ISO_TILE_W = 110, ISO_TILE_H = 56;
const GRID_OX = CW / 2, GRID_OY = 395;
```
Dimensi tile isometrik dan titik origin grid. `GRID_OX/GRID_OY` adalah pusat visual grid di dalam canvas.

```js
let DAY_SEC = 35;
```
Durasi satu hari dalam detik (real-time). Setiap `DAY_SEC` detik, `advanceDay()` dipanggil otomatis.

---

## 4. State Management

Semua state game disimpan sebagai variabel global:

| Variabel | Tipe | Keterangan |
|---|---|---|
| `score` | `number` | Total poin pemain |
| `totalDay` | `number` | Hari ke-berapa sejak game dimulai |
| `seasonIdx` | `number` | Indeks musim aktif (0–3) |
| `dayInSeason` | `number` | Hari ke-berapa dalam musim saat ini (0–6) |
| `weather` | `object` | Objek cuaca aktif (name, emoji, growth modifier, probability) |
| `dayTimer` | `number` | Akumulator waktu (detik) menuju pergantian hari |
| `gameStarted` | `boolean` | `true` setelah tutorial selesai; mengaktifkan timer hari |
| `selectedCoffee` | `number` | Indeks kopi yang sedang dipilih (0=Arabika, 1=Robusta, 2=Liberika) |
| `selectedPlot` | `number` | Indeks petak yang sedang dipilih (-1 = tidak ada) |
| `allPlots` | `array[3][9]` | Array 3 lahan × 9 petak, masing-masing berisi objek plot |
| `plots` | `array[9]` | Referensi ke `allPlots[selectedCoffee]` — lahan yang sedang aktif |
| `particles` | `array` | Partikel efek visual aktif |
| `scorePops` | `array` | Teks score pop-up yang melayang |
| `animTime` | `number` | Akumulator waktu animasi (detik sejak start) |

---

## 5. Data Model

### SEASONS

Array 4 musim. Setiap musim memiliki properti:

```js
{
  name: "Musim Hujan 🌧",
  bgTop: "#c25a00",    // warna langit atas (untuk gradient canvas)
  bgBot: "#e88020",    // warna langit bawah
  weathers: [          // daftar cuaca yang mungkin muncul di musim ini
    { name: "Hujan Lebat", e: "⛈", g: 1.4, p: 0.35 },
    // g = growth modifier, p = probability (harus total = 1.0)
  ]
}
```

Urutan musim: `0` Hujan → `1` Pancaroba → `2` Kemarau → `3` Dingin → kembali ke `0`.

### COFFEES

Array 3 jenis kopi. Setiap kopi memiliki:

```js
{
  name: "Arabika",
  color: "#c0392b",        // warna buah/beri untuk render pohon
  dark: "#8b1a0e",
  seasons: [1.3, 1.1, 0.7, 0.8],  // multiplier per musim [Hujan, Pancaroba, Kemarau, Dingin]
  rate: 1.0,               // base growth rate
  soilTop/Left/Right: ..., // warna tanah kosong (3 sisi isometrik)
  dugTop/Left/Right: ...,  // warna tanah setelah digali
  label: "Dataran Tinggi",
  info: { ... }            // data lengkap untuk panel Info
}
```

**`info` object** berisi data edukatif: `ketinggian`, `suhu`, `curahHujan`, `ph`, `bahanOrganik`, `bentukBiji`, `alurTengah`, `warnaBiji`, `kafein`, `rasa`, `aroma`, `harga`, `varietas`, `penaung`, `tips`, dan lain-lain.

### QUIZ_LEVELS

Objek dengan 3 key: `pemula`, `sedang`, `mahir`. Masing-masing:

```js
{
  label: "Pemula",
  icon: "🌱",
  color: "#4aaa20",
  desc: "Deskripsi singkat level",
  questions: [
    {
      category: "Jenis Kopi",
      q: "Teks pertanyaan",
      opts: ["A", "B", "C", "D"],  // 4 pilihan
      ans: 2,                       // indeks jawaban benar (0-based)
      feedback: "Penjelasan jawaban (HTML)"
    }
  ]
}
```

Setiap level memiliki **8 soal**. Soal diacak urutan tampilannya saat kuis dimulai.

### QUEST_POOL

Array template quest yang tersedia. Setiap template:

```js
{
  type: "dig" | "plant" | "water" | "harvest" | "quiz",
  coffeeType: null | 0 | 1 | 2,  // null = semua jenis kopi
  icon: "⛏",
  min: 2, max: 5,           // range target (dipilih acak)
  rewardMin: 10, rewardMax: 20,
  label: (n) => `Gali ${n} petak tanah`  // fungsi label dinamis
}
```

---

## 6. Sistem Rendering (Canvas)

### `drawBG()`
Menggambar latar belakang: gradient langit berdasarkan musim aktif, efek cahaya matahari (lebih terang saat cuaca cerah/terik), bukit dekoratif, tanah, dan dua pohon dekoratif di sisi kiri-kanan.

### `drawDecoTree(x, y, sc)`
Menggambar pohon dekoratif (mirip kelapa) di koordinat `(x, y)` dengan skala `sc`. Terdiri dari batang, 7 pelepah, dan 2 buah kelapa.

### `drawIsoTile(x, y, w, h, topC, leftC, rightC, alpha)`
Menggambar satu tile isometrik dengan 3 sisi: atas (diamond), kiri bawah, kanan bawah. Menerima warna terpisah untuk tiap sisi. Parameter `alpha` mengontrol transparansi global.

### `drawPlant(x, y, plot, idx)`
Menggambar tanaman di atas tile sesuai state plot saat ini:

| State | Visual |
|---|---|
| `SEEDED` | Gundukan tanah kecil dengan biji |
| `SPROUT` | Batang pendek + 2 daun kecil |
| `YOUNG` | Batang + 3 pasang cabang berdaun |
| `MATURE` | Pohon penuh + sedikit buah berwarna kopi |
| `RIPE` | Pohon penuh + banyak buah matang + glow animasi |

Efek tambahan yang dirender di `drawPlant`:
- **Growth bar** (biru/kuning/hijau): progress tumbuh 0–100%
- **Ikon 💧**: muncul di bawah growth bar jika sudah disiram hari ini
- **Bintang ✨ bouncing**: muncul di atas pohon saat state `RIPE`
- **Shake animation**: batang bergetar saat aksi dilakukan (via `plot.shakeAnim`)

### `render(dt)`
Fungsi render utama yang dipanggil setiap frame. Urutannya:
1. Clear canvas
2. `drawBG()` — latar
3. Render partikel cuaca (hujan / kabut)
4. Loop grid 3×3 → `drawIsoTile()` + `drawPlant()` per petak (back-to-front: row 0→2)
5. Render partikel efek aksi
6. Render score pop-up

---

## 7. Grid Isometrik

### `isoToScreen(col, row) → { x, y }`
Mengonversi koordinat grid (col 0–2, row 0–2) ke koordinat piksel canvas menggunakan proyeksi isometrik:

```js
x = GRID_OX + (col - row) * ISO_TILE_W / 2
y = GRID_OY + (col + row) * ISO_TILE_H / 2
```

### `screenToIso(sx, sy) → { col, row }`
Kebalikan dari `isoToScreen` — mengonversi klik piksel ke koordinat grid. Digunakan untuk deteksi klik petak.

### `plotIdx(col, row) → number`
Mengonversi (col, row) ke indeks linear array `plots[]`: `row * 3 + col`.

### Hit Testing (Event Click Canvas)
Setiap klik pada canvas dievaluasi dengan **point-in-diamond test**:

```js
// Untuk setiap tile (col, row):
const hw = ISO_TILE_W / 2, hh = ISO_TILE_H / 2;
const dx = sx - x, dy = sy - (y + hh);
if (Math.abs(dx)/hw + Math.abs(dy)/hh < 1.05) {
  openPopup(plotIdx(col, row));
}
```

Tiles diuji dari baris paling belakang (row 0) ke depan (row 2) agar tile depan mendapat prioritas.

---

## 8. Game Loop

```js
function loop(ts) {
  const dt = (ts - last) / 1000;  // delta time dalam detik
  last = ts;
  animTime += dt;

  // Timer hari (hanya jalan saat game aktif & tidak ada notif blokir)
  if (gameStarted && !tutActive && !harvestNotifActive) {
    dayTimer += dt;
  }

  // Pergantian hari
  if (gameStarted && !tutActive && !harvestNotifActive && dayTimer >= DAY_SEC) {
    dayTimer -= DAY_SEC;
    advanceDay();
  }

  // Update progress bar hari di UI
  document.getElementById("daybarfill").style.width = (dayTimer / DAY_SEC) * 100 + "%";

  // Update partikel cuaca, partikel efek, score pop
  // ...

  render(dt);
  requestAnimationFrame(loop);
}
```

Game loop berjalan terus menggunakan `requestAnimationFrame`. Timer hari **berhenti** saat tutorial aktif atau notifikasi panen sedang ditampilkan.

---

## 9. Sistem Hari & Musim

### `pickWeather(season) → weatherObject`
Memilih cuaca secara acak berbobot dari array `season.weathers` berdasarkan probabilitas `p` tiap cuaca.

### `advanceDay()`
Dipanggil setiap `DAY_SEC` detik. Urutannya:
1. Tambah `totalDay` dan `dayInSeason`
2. Jika `dayInSeason >= 7` → reset ke 0, maju ke musim berikutnya
3. Pilih cuaca baru (`pickWeather`)
4. Re-inisialisasi partikel cuaca (`initWeatherPts`)
5. Tumbuhkan semua tanaman di **semua 3 lahan** (`allPlots`)
6. Kumpulkan semua petak `RIPE` ke `readyHarvestQueue`
7. Panggil `updateUI()`, `showNarasi()`, `updateSiramReminder()`
8. Jika ada petak siap panen → `showHarvestNotif()` (delay 6 detik)

### `initWeatherPts()`
Membuat array `weatherPts` berisi partikel cuaca (hujan/kabut) sesuai cuaca aktif. Jumlah partikel bervariasi: hujan lebat = 70, gerimis = 30, berkabut = 18, cuaca lain = 0.

---

## 10. Sistem Pertumbuhan Tanaman

Pertumbuhan dihitung di dalam `advanceDay()` untuk setiap petak di semua lahan:

```js
const mult = coffee.rate * weather.g * coffee.seasons[seasonIdx];
const grow = (plot.watered ? 18 : 6) * mult + random(0..4);
plot.growth = Math.min(100, plot.growth + grow);
```

**Keterangan komponen multiplier:**
- `coffee.rate` — base rate jenis kopi (Arabika=1.0, Robusta=1.2, Liberika=0.9)
- `weather.g` — growth modifier cuaca (0.5 untuk terik, 1.4 untuk hujan lebat)
- `coffee.seasons[seasonIdx]` — cocoknya kopi ini di musim tertentu
- `plot.watered` — jika `true`, pertumbuhan 3× lebih cepat (18 vs 6)

**Transisi state berdasarkan `growth`:**

| Threshold | Transisi |
|---|---|
| ≥ 20 | `SEEDED` → `SPROUT` |
| ≥ 40 | `SPROUT` → `YOUNG` |
| ≥ 65 | `YOUNG` → `MATURE` |
| ≥ 90 | `MATURE` → `RIPE` |

Setelah `advanceDay()`, `plot.watered` di-reset ke `false` (perlu disiram lagi besok).

---

## 11. Aksi Pemain (doAction)

```js
function doAction(plotI, action)
```

Menjalankan aksi pada petak `plotI`. Parameter `action` adalah string:

### `"dig"`
- Syarat: `plot.state === ST.EMPTY`
- Efek: ubah state ke `DUG`, spawn partikel tanah, sfx dig
- Quest: `incrementQuest("dig")`

### `"seed"`
- Syarat: `plot.state === ST.DUG`
- Efek: ubah state ke `SEEDED`, set `plot.coffeeType = selectedCoffee`, reset `growth = 0`
- Quest: `incrementQuest("plant", 1, selectedCoffee)`

### `"water"`
- Syarat: `plot.state >= SEEDED && plot.state < RIPE && !plot.watered`
- Efek: set `plot.watered = true`, spawn partikel air, sfx water
- Trigger `startWaitGuide()` pertama kali (panduan sambil menunggu)
- Quest: `incrementQuest("water", 1, plot.coffeeType)`

### `"harvest"`
- Syarat: `plot.state === ST.RIPE`
- Efek: hitung poin `10 + floor(growth / 8)`, reset state ke `MATURE` (growth 65), spawn partikel emas + score pop
- Quest: `incrementQuest("harvest", 1, plot.coffeeType)`

---

## 12. Popup Aksi

### `openPopup(plotI)`
Menampilkan popup di atas tile yang diklik. Posisi dihitung dari koordinat isometrik, dikonversi ke piksel layar dengan mempertimbangkan scale wrap.

Tombol yang ditampilkan: **Gali ⛏**, **Tanam 🌱**, **Siram 💧**, **Panen 🌿** — yang tidak relevan dengan state saat ini diberi class `.disabled` (opacity 35%, `pointer-events: none`).

### `closePopup()`
Menyembunyikan popup dan mereset `selectedPlot = -1`.

---

## 13. Sistem Partikel & Score Pop

### `spawnParticles(x, y, color, n, spread)`
Membuat `n` partikel di koordinat `(x, y)` yang terbang ke segala arah dengan kecepatan acak, memudar secara gradual.

### `spawnScorePop(x, y, text, color)`
Membuat teks yang melayang ke atas (misalnya `+12 ☕`) dengan animasi fade-out. Di-render di atas canvas dengan stroke hitam tipis untuk keterbacaan.

Kedua sistem diperbarui dan difilter (partikel mati dihapus) di dalam `loop()`.

---

## 14. Sistem Maskot

Maskot (gambar karakter + bubble teks) digunakan untuk semua notifikasi in-game.

### `showMaskot(label, html, duration, showClose)`
- Menampilkan `#maskot-wrap` dan `#maskot-bubble`
- `label` = teks badge kecil di atas bubble
- `html` = konten bubble (mendukung HTML)
- `duration` = durasi auto-hide dalam ms (0 = tidak auto-hide)
- `showClose` = tampilkan tombol "Oke!" atau tidak
- Tidak muncul jika panel kuis sedang terbuka

### `hideMaskot()` / `closeMaskot()`
Menyembunyikan maskot. `closeMaskot()` juga set `gameStarted = true`.

Maskot digunakan oleh:
- `showNarasi()` — narasi cuaca & pergantian musim tiap hari
- `showKopiInfo(i)` — info singkat saat ganti lahan
- `showHarvestNotif()` — notifikasi petak siap panen
- `onQuestCompleted()` — notifikasi quest selesai
- `announceNewQuests()` — pengumuman quest baru
- `updateSiramReminder()` — reminder menyiram tanaman
- `renderSeasonSlide()` — info musim multi-slide

---

## 15. Sistem Kuis

### Alur Kuis

```
openQuiz()
  └─ showLevelSelect()         — Tampilkan 3 pilihan level
       └─ startQuiz(level)     — Acak soal, reset state
            └─ renderQuizQuestion()  — Render kartu soal + pilihan
                 └─ selectAnswer(i)  — Evaluasi jawaban, tampilkan feedback
                      └─ quizNext()  — Soal berikutnya atau showQuizResult()
                           └─ showQuizResult()  — Tampilkan hasil, review, bonus poin
```

### `openQuiz()` / `closeQuiz()`
Menggeser panel `#quizpanel` masuk/keluar dari sisi kanan layar (via CSS class `.open` → `left: 0`). Menyembunyikan/menampilkan kembali `#swipe-hint`.

### `startQuiz(level)`
- Mengambil soal dari `QUIZ_LEVELS[level].questions`
- Mengacak urutan soal dengan `shuffleArray()`
- Mereset semua state kuis: `quizIdx`, `quizScore`, `quizUserAnswers`, `quizAnswered`

### `renderQuizQuestion()`
Merender kartu soal ke `#quiz-q-area`: badge kategori, teks soal, dan 4 tombol pilihan. Progress bar diperbarui.

### `selectAnswer(optIdx)`
- Jika sudah dijawab sebelumnya, diabaikan
- Cek apakah jawaban benar (`optIdx === q.ans`)
- Warnai pilihan: hijau (benar), merah (salah), sorot pilihan yang benar
- Tampilkan `quiz-feedback` dengan penjelasan
- Aktifkan tombol "Soal Berikutnya"

### `showQuizResult()`
Menghitung grade berdasarkan persentase benar:

| Skor | Grade | Bonus Poin |
|---|---|---|
| ≥ 90% | A | +50 poin |
| ≥ 70% | B | +20 poin |
| ≥ 50% | C | 0 |
| < 50% | D | 0 |

Menampilkan review per soal, memanggil `incrementQuest("quiz")`.

### `backToLevelSelect()` / `retryQuiz()`
Kembali ke pilih level atau ulangi level yang sama dari awal.

---

## 16. Sistem Quest

### Siklus Quest

1. `createQuestSet()` → pilih 4 quest acak dari `QUEST_POOL` via `pickRandomQuests()`
2. Quest ditampilkan di panel `#questpanel` via `renderQuestList()`
3. Setiap aksi game memanggil `incrementQuest(type, amount, coffeeType)`
4. Saat quest selesai → `onQuestCompleted(q)` → bonus poin + notifikasi maskot
5. Saat semua quest selesai → `refreshQuestsIfAllDone()` → set baru setelah 2.5 detik

### `incrementQuest(type, amount, coffeeType)`
Mencari quest yang cocok (`type` dan `coffeeType` match, belum selesai), tambah progress. Jika mencapai target, tandai `done = true` dan panggil `onQuestCompleted()`.

### `updateQuestBadge()`
Memperbarui angka di badge merah pada tombol quest. Badge disembunyikan jika semua quest selesai.

---

## 17. Sistem Tutorial

Tutorial menggunakan overlay `#tutorial` dengan komponen:
- `#tut-dark` — overlay gelap (klik untuk lanjut)
- `#tut-cutout` — "lubang" transparan yang menyorot elemen UI target
- `#tut-bubble` — bubble penjelasan dengan badge langkah, judul, deskripsi, tombol navigasi

### `startTutorial(steps, onFinish)`
Menerima array langkah dan callback opsional saat selesai. Membuat dots navigasi dan memanggil `renderTutStep()`.

### `renderTutStep()`
Memosisikan `#tut-cutout` di atas elemen target (`step.highlight` = ID elemen), dan memosisikan `#tut-bubble` di atas atau di bawah cutout. Mendukung 3 arah panah: `down`, `up`, `left`.

### `tutNext()` / `skipTutorial()`
Maju ke langkah berikutnya atau menutup tutorial sepenuhnya. Jika `onFinish` callback ada, dijalankan; jika tidak, maskot muncul dengan panduan awal bermain.

**Dua set tutorial:**
- `TUT_STEPS` (7 langkah) — tutorial utama saat pertama main
- `WAIT_STEPS` (4–5 langkah) — panduan "sambil menunggu" setelah menyiram pertama kali, dipanggil via `startWaitGuide()`

---

## 18. Splash Screen & Intro Karakter

### Splash Screen (`#splash`)
Layar pembuka yang menampilkan identitas Dinas Perkebunan Jawa Barat. Tombol "Mulai Bermain" memanggil:

```js
function closeSplash()
  → initAudio()            // aktifkan audio setelah interaksi user
  → fade-out splash
  → openIntroScreen()
```

### Intro Screen (`#intro-screen`)
Layar perkenalan karakter + 3 jenis kopi. Terdiri dari 5 langkah (`INTRO_STEPS`):
1. Sambutan
2. Info Arabika
3. Info Robusta
4. Info Liberika
5. Siap bermain

### `introNext()`
Maju ke langkah berikutnya dengan animasi `bubble-pop`. Saat langkah terakhir selesai → fade-out intro → `startTutorial()`.

---

## 19. Info Panel Kopi

### `openInfo(i)`
Membuka panel `#infopanel` dan mengisi semua field data dari `COFFEES[i].info`. Baris dengan nilai `"-"` disembunyikan otomatis. Menampilkan foto kopi jika `info.foto` tersedia.

### `closeInfo()`
Menutup panel info.

### `showKopiInfo(i)` 
Menampilkan info ringkas kopi di bubble maskot saat pemain mengganti lahan. Menyertakan SVG biji kopi yang digambar programatik via `buatSVGBiji(i)`.

### `buatSVGBiji(idx) → string (SVG HTML)`
Membuat SVG inline biji kopi sesuai jenis:
- **Arabika**: bentuk oval, alur S berkelok
- **Robusta**: bentuk bulat, alur lurus
- **Liberika**: bentuk lonjong asimetris, alur tidak beraturan

Menggunakan radial gradient dan filter drop-shadow untuk tampilan realistis.

---

## 20. Info Musim (Multi-Slide)

`SEASON_SLIDES` berisi 6 slide: overview, detail 4 musim, dan tips bertani.

### `showSeasonInfo()`
Dipanggil saat badge musim di-tap. Langsung membuka slide musim yang sedang aktif (`seasonIdx + 1`).

### `renderSeasonSlide()`
Merender konten slide ke bubble maskot. Tombol Prev/Next/Tutup dibuat inline dan dipasang event listener setelah DOM diupdate (bukan via `onclick` attribute, untuk menghindari referensi global).

---

## 21. Notifikasi Panen (Harvest Notif)

Sistem antrian yang menampilkan notifikasi satu per satu untuk setiap petak yang siap panen.

### `showHarvestNotif(queue)`
Menerima array `{ landIdx, plotIdx }` dan memulai antrian.

### `renderHarvestNotif()`
- Berpindah lahan secara otomatis via `selCoffeeSilent(landIdx)`
- Menampilkan cutout spotlight di atas petak target (`#harvest-cutout`)
- Menampilkan maskot bubble dengan instruksi panen
- Auto-lanjut ke notifikasi berikutnya setelah 4.8 detik

### `skipHarvestNotif()`
Tombol "Lewati ⏭" di bubble — melewati seluruh antrian notifikasi sekaligus.

### `selCoffeeSilent(i)` vs `selCoffee(i)`
`selCoffeeSilent` melakukan hal yang sama dengan `selCoffee` (ganti lahan aktif, update UI), namun **tidak** memanggil `showKopiInfo()` agar bubble maskot info kopi tidak menimpa pesan panen.

---

## 22. Sistem Audio

Menggunakan HTML5 Audio API. Audio hanya diinisialisasi setelah interaksi pertama user (klik tombol splash) untuk mematuhi kebijakan autoplay browser.

### `initAudio()`
Dipanggil sekali dari `closeSplash()`. Memulai musik latar `bgMusic.play()`.

```js
const bgMusic = new Audio("assets/audio/backsound.mp3");
bgMusic.loop = true;

const SFX = {
  dig, seed, water, harvest, click   // masing-masing Audio object
}
```

### `playSfx(name)`
Mereset `audio.currentTime = 0` sebelum memutar agar bisa di-trigger berulang kali cepat.

### Fungsi SFX shorthand
`sfxDig()`, `sfxSeed()`, `sfxWater()`, `sfxHarvest()`, `sfxClick()` — masing-masing memanggil `playSfx(name)` yang sesuai.

---

## 23. Settings Panel

### `openSettings()` / `closeSettings()`
Toggle class `.open` pada `#settingspanel`.

### `toggleMusic(on)` / `toggleSfx(on)`
Pause/resume `bgMusic`, set flag `sfxOn`.

### `setMusicVolume(val)` / `setSfxVolume(val)`
Menerima nilai 0–100 dari slider, mengonversi ke 0.0–1.0, mengupdate volume semua objek Audio.

---

## 24. Swipe Gesture & Navigasi Kuis

Swipe horizontal dideteksi via `touchstart`, `touchmove`, `touchend` pada level `document`:

- **Swipe kiri** (dx < -50px): `openQuiz()`
- **Swipe kanan** (dx > 50px): `closeQuiz()`

Syarat swipe valid:
- `|dx| > 50` px
- `|dy| < 80` px (bukan scroll vertikal)
- Durasi < 400 ms
- Tidak ada panel lain yang terbuka (settings, info, tutorial)

---

## 25. Auto Scale (Responsif)

### `scaleWrap()`
Menghitung scale agar `#wrap` (420×780) muat di layar:

```js
const scaleX = vw / 420;
const scaleY = vh / 780;
let scale = Math.min(scaleX, scaleY);

// Desktop: max scale 1.0
// Tablet: max scale 0.95
// Mobile: max scale 1.0 (fit layar)

wrap.style.transform = `scale(${scale})`;
```

Dipanggil saat `load`, `resize`, dan `orientationchange` (delay 150ms untuk orientasi).

---

## 26. Alur Program Lengkap

```
Halaman dimuat
  ├── updateUI()            — render UI awal
  ├── requestAnimationFrame(loop) — mulai game loop
  └── scaleWrap()           — scale initial

User klik "Mulai Bermain" di Splash
  ├── initAudio()
  ├── fade-out Splash
  └── openIntroScreen()
        └── INTRO_STEPS × 5
              └── introNext() → startTutorial(TUT_STEPS)
                    └── TUT_STEPS × 7
                          └── skipTutorial()
                                ├── showMaskot("Yuk Mulai!", ...)
                                ├── createQuestSet()
                                └── announceNewQuests()
                                      └── gameStarted = true (via closeMaskot)

Game berjalan
  ├── Setiap frame: loop() → render()
  ├── Setiap DAY_SEC detik: advanceDay()
  │     ├── Tumbuhkan semua tanaman
  │     ├── showNarasi() via maskot
  │     ├── updateSiramReminder()
  │     └── showHarvestNotif() jika ada RIPE
  └── Saat user klik canvas:
        └── openPopup() → doAction()
              ├── dig / seed / water / harvest
              ├── incrementQuest()
              └── updateUI()

User buka Kuis (swipe kiri / tombol KUIS)
  └── openQuiz() → showLevelSelect()
        └── startQuiz(level) → renderQuizQuestion()
              └── selectAnswer() → quizNext() → showQuizResult()
                    └── bonus poin + incrementQuest("quiz")
```

---

*Dokumentasi ini dibuat berdasarkan source code `index.html` KopiLand v1.0.0*
*Dinas Perkebunan Provinsi Jawa Barat × KopiLand*
