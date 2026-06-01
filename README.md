# 🎮 KopiLand — Education Game

> Game edukasi interaktif berbasis web tentang budidaya kopi Indonesia,
> dikembangkan untuk mendukung program Dinas Perkebunan Jawa Barat.

🔗 **Run Website** → `index.html` (KopiLand) · `kopifarm.html` (Kopi Farm Pixel Edition)

---

## 📁 Struktur File

```
kopiland/
├── index.html        # Halaman utama KopiLand (menu, kuis, edukasi)
├── kopifarm.html     # Mini game Kopi Farm Pixel Edition
└── README.md
```

---

## 📒 Documentation

### 1. `index.html` — KopiLand (Main App)

Aplikasi utama berbasis HTML/CSS/JS murni (tanpa framework).
Terdiri dari beberapa modul layar:

#### Screens / Panel

| Panel | ID | Deskripsi |
|---|---|---|
| Splash | `#splash` | Halaman pembuka dengan animasi |
| Info Kopi | `#panelInfo` | Ensiklopedia 6 jenis kopi |
| Simulasi | `#panelSimulasi` | Iframe ke `kopifarm.html` |
| Kuis | `#panelQuiz` | Kuis interaktif 3 level |
| Edukasi | `#panelEdukasi` | Panduan budidaya lengkap + tabel |
| Produk Dinas | `#panelProduk` | Showcase produk perkebunan |

#### Data Utama

```js
coffeeData[]      // 6 jenis kopi (Arabika, Robusta, Liberika, Excelsa, Preanger, Luwak)
quizData{}        // Soal kuis: easy (7 soal), medium (7), hard (7)
produkDinas[]     // 5 produk unggulan Dinas Perkebunan Jabar
```

#### Sistem Poin

```
+10 poin  → Membuka detail kartu kopi
+10 poin  → Menjawab benar (level Easy)
+20 poin  → Menjawab benar (level Medium)
+30 poin  → Menjawab benar (level Hard)
```

#### Level Pemain

| Threshold | Label |
|---|---|
| 0 | Pemula |
| 100 | Pelajar |
| 300 | Petani |
| 600 | Ahli |
| 1000 | Master Kopi ☕ |

#### Fungsi Utama

```js
startGame()            // Pindah dari splash ke main game
showPanel(name)        // Navigasi antar panel
openCoffeeModal(id)    // Buka modal detail kopi
answerQuiz(idx)        // Proses jawaban kuis
addPoints(pts, msg)    // Tambah poin + update level
launchConfetti()       // Animasi confetti (skor 100%)
```

---

### 2. `kopifarm.html` — Kopi Farm Pixel Edition

Mini game farming berbasis Canvas 2D dengan dunia scrolling (64×32 tiles).
Karakter pixel art dirender manual dari array string karakter.

#### World Layout

```
Col  0–13   → Ladang (area bercocok tanam)
Col 14–17   → Jalan / Zona Transisi
Col 18–63   → Pasar (area NPC & transaksi)
```

#### Jenis Kopi (Game)

| ID | Nama | Harga Jual | Waktu Tumbuh |
|---|---|---|---|
| `arabika` | Arabika | 220 rp | Sedang |
| `robusta` | Robusta | 140 rp | Cepat |
| `liberika` | Liberika | 380 rp | Lambat |

#### Sistem Musim & Cuaca

```
4 Musim: Hujan → Pancaroba → Kemarau → Dingin (berganti tiap 7 hari)
Cuaca mempengaruhi kecepatan tumbuh kopi (weatherBonus & seasonBonus per varietas)
```

#### Status Lahan (Plot States)

```
0  EMPTY    → Tanah kosong
1  DUG      → Digali
2  SEEDED   → Benih ditanam
3  SPROUT   → Kecambah 🌱
4  YOUNG    → Bibit 🌿
5  MATURE   → Pohon 🌳
6  RIPE     → Siap panen ✨
```

#### NPC Market

| ID | Nama | Spesialisasi |
|---|---|---|
| `warung` | Bu Sari | Robusta (×1.1) |
| `ekspor` | Pak Hendra | Arabika & Liberika premium |
| `barista` | Kak Tari | Arabika (×1.4) |
| `pabrik` | CV. Maju | Robusta massal (×1.5) |

#### NPC Edukasi (Biru 💡)

8 NPC tersebar di peta yang memberikan materi budidaya kopi saat didekati:

| Label | Materi |
|---|---|
| Pak Tani | Pemilihan Lahan |
| Bu Pupuk | Panduan Pemupukan |
| Kang Pangkas | Teknik Pemangkasan |
| Dr. Hama | Pengendalian Hama Terpadu (PHT) |
| Mbak Panen | Tips Panen yang Baik |
| Pak Varietas | Varietas Unggul |
| Agen Sertifikasi | Sertifikasi Kopi |
| Bu Olah | Pengolahan Pascapanen |

#### Kontrol Game

| Input | Aksi |
|---|---|
| `↑↓←→` / `WASD` | Gerak karakter |
| `E` / `Space` | Aksi (gali / tanam / siram / panen / jual) |
| `1` `2` `3` `4` | Ganti alat (gali / tanam / siram / panen) |
| `Tab` | Buka / tutup panel samping |
| Klik canvas | Teleport ke tile + eksekusi aksi |
| Joystick (mobile) | Gerak di layar sentuh |
| Tombol aksi (mobile) | 💧 Siram · ⛏ Gali · 🌱 Tanam · 🧺 Panen · ⚡ Aksi |

#### Fungsi Utama Game

```js
initPlots()             // Inisialisasi grid plot 32×64
updateGrowth()          // Proses tumbuh tanaman per frame
doAction()              // Eksekusi aksi sesuai tool aktif
advanceDay()            // Ganti hari + update musim & cuaca
openNPCSellDialog()     // Jual semua kopi ke NPC terdekat
calcPrice()             // Hitung harga: basePrice × npcMod × weatherMod × bonus
spawnParticles()        // Efek partikel (dirt / water / sparkle / coin)
drawCharacter()         // Render sprite pixel art karakter
drawMarketArea()        // Render NPC, rumah, dan dekorasi pasar
drawEduNPCs()           // Render NPC edukasi biru di peta
updateCamera()          // Kamera mengikuti posisi pemain
drawMinimap()           // Render minimap di pojok layar
toggleFullscreen()      // Masuk / keluar mode fullscreen
```

---

## 🛠️ Tech Stack

- **Vanilla HTML / CSS / JavaScript** — tanpa framework atau library eksternal
- **Canvas 2D API** — untuk rendering game pixel art
- **Google Fonts** — Press Start 2P (game), Nunito & Baloo 2 (UI)
- **Responsive** — mendukung desktop dan mobile (touch joystick)

---

## 🚀 Cara Menjalankan

```bash
# Cukup buka di browser — tidak perlu build tool
open index.html

# Atau jalankan local server (direkomendasikan agar iframe berjalan lancar):
npx serve .
# lalu buka http://localhost:3000
```

> ⚠️ `kopifarm.html` di-load lewat `<iframe>` di dalam `index.html`.
> Pastikan kedua file berada di **folder yang sama**.

---

## 👥 Credits

Dikembangkan sebagai media edukasi interaktif untuk
**Dinas Perkebunan Provinsi Jawa Barat** 🏛️
