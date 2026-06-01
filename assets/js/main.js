// ==================== DATA ====================
const coffeeData = [
	{
		id: "arabika",
		name: "Kopi Arabika",
		latin: "Coffea arabica",
		emoji: "🏔️",
		badge: "Terpopuler",
		color: "#FFF8E1",
		accent: "#FF8F00",
		desc: "Kopi premium dengan cita rasa kompleks, asam yang menyenangkan, dan aroma bunga & buah yang khas. Tumbuh terbaik di dataran tinggi Jawa Barat.",
		tags: ["Dataran Tinggi", "Premium", "Ekspor"],
		stats: {
			ketinggian: "1.000–2.000 mdpl",
			rasa: "Asam, Fruity, Floral",
			kafein: "1,2–1,5%",
			panen: "Tahun ke 3–4",
		},
		detail: {
			sejarah: 'Arabika pertama masuk Indonesia pada era VOC abad ke-17. Kopi Arabika Jawa Barat dikenal di pasar dunia dengan nama "Java Coffee" dan menjadi salah satu kopi paling prestisius.',
			karakteristik: "Biji lebih lonjong dan rata. Permukaan biji lebih halus dengan garis tengah berliku. Rasa kaya dengan kompleksitas tinggi — asam, manis, pahit yang seimbang dengan aroma buah tropis, cokelat, dan bunga.",
			wilayah: "Garut, Cianjur, Bandung, Tasikmalaya. Kopi Mandheling (Arabika Sumatra) juga dikenal secara internasional.",
			tips: "Arabika membutuhkan suhu 18–24°C dan ketinggian minimal 1.000 mdpl. Sangat sensitif terhadap perubahan iklim dan penyakit karat daun (HV).",
		},
	},
	{
		id: "robusta",
		name: "Kopi Robusta",
		latin: "Coffea canephora",
		emoji: "💪",
		badge: "Tahan Hama",
		color: "#E8F5E9",
		accent: "#2E7D32",
		desc: "Kopi kuat dengan rasa pahit tegas dan kandungan kafein tinggi. Lebih mudah dibudidayakan dan tahan terhadap penyakit.",
		tags: ["Dataran Rendah", "Tahan Hama", "Kafein Tinggi"],
		stats: {
			ketinggian: "200–800 mdpl",
			rasa: "Pahit, Earthy, Full Body",
			kafein: "2,0–2,7%",
			panen: "Tahun ke 2–3",
		},
		detail: {
			sejarah: "Robusta berasal dari Afrika Tengah dan diperkenalkan ke Indonesia pada awal abad ke-20 sebagai pengganti Arabika yang terserang hama. Kini mendominasi produksi kopi Indonesia.",
			karakteristik: 'Biji lebih bulat dan kecil. Rasa lebih pahit dan "earthy" dengan body yang lebih tebal. Kandungan kafein 2x lebih tinggi dari Arabika, cocok untuk espresso blend.',
			wilayah: "Lampung, Sumatera Selatan, dan dataran rendah Jawa Barat seperti Sukabumi.",
			tips: "Robusta lebih toleran terhadap suhu panas dan serangan hama/penyakit. Ideal untuk petani pemula yang baru memulai budidaya kopi.",
		},
	},
	{
		id: "liberika",
		name: "Kopi Liberika",
		latin: "Coffea liberica",
		emoji: "🌴",
		badge: "Langka",
		color: "#FFF3E0",
		accent: "#E65100",
		desc: "Kopi langka dengan biji besar dan rasa unik seperti durian atau nangka. Pohonnya tinggi dan besar dibanding varietas lain.",
		tags: ["Langka", "Unik", "Pohon Besar"],
		stats: {
			ketinggian: "0–600 mdpl",
			rasa: "Smoky, Woody, Fruity",
			kafein: "1,2–1,5%",
			panen: "Tahun ke 4–5",
		},
		detail: {
			sejarah: "Berasal dari Liberia, Afrika Barat. Diperkenalkan ke Asia Tenggara akhir abad ke-19. Di Indonesia, Liberika banyak ditemukan di Malaysia, Kalimantan, dan Jambi.",
			karakteristik: "Pohon bisa mencapai tinggi 9 meter. Biji sangat besar, hampir 2x ukuran Arabika. Rasa khas seperti kayu, asap, dengan aftertaste buah tropis yang unik.",
			wilayah: "Jambi (Tungkal), Kalimantan Barat, dan beberapa daerah di Sumatera.",
			tips: "Liberika tahan genangan air dan kelembaban tinggi. Cocok untuk lahan gambut. Meski langka, harganya bisa sangat tinggi di pasar spesialti.",
		},
	},
	{
		id: "excelsa",
		name: "Kopi Excelsa",
		latin: "Coffea excelsa",
		emoji: "✨",
		badge: "Spesialti",
		color: "#F3E5F5",
		accent: "#6A1B9A",
		desc: "Varietas jarang yang menghasilkan kopi dengan rasa kompleks. Sering digunakan untuk blending karena karakternya yang unik.",
		tags: ["Spesialti", "Blending", "Rare"],
		stats: {
			ketinggian: "400–1.000 mdpl",
			rasa: "Tart, Fruity, Dark",
			kafein: "1,0–1,5%",
			panen: "Tahun ke 3–4",
		},
		detail: {
			sejarah: "Excelsa sempat diklasifikasikan sebagai spesies tersendiri, namun kini dianggap sebagai subspesies dari Coffea liberica. Banyak dibudidayakan di Asia Tenggara, termasuk Filipina dan Vietnam.",
			karakteristik: "Pohon menyerupai Liberika namun lebih kecil. Rasa sangat kompleks: perpaduan asam seperti buah (tart), dark chocolate, dan aroma smoky yang unik. Tubuh medium hingga full.",
			wilayah: "Beberapa wilayah di Sumatera dan Sulawesi. Di Jawa Barat masih sangat jarang dibudidayakan.",
			tips: "Excelsa adalah pilihan menarik untuk diversifikasi tanaman. Ketahanan terhadap penyakit cukup baik. Banyak dicari oleh barista dan roaster spesialti.",
		},
	},
	{
		id: "preanger",
		name: "Kopi Java Preanger",
		latin: "Coffea arabica var. preanger",
		emoji: "🏞️",
		badge: "Khas Jabar",
		color: "#E8EAF6",
		accent: "#1A237E",
		desc: "Kopi khas Jawa Barat (Priangan) dengan warisan sejarah panjang sejak era VOC. Dikenal dengan keasaman seimbang dan body medium.",
		tags: ["Khas Jabar", "Warisan Budaya", "Arabika"],
		stats: {
			ketinggian: "1.200–1.800 mdpl",
			rasa: "Citrus, Caramel, Floral",
			kafein: "1,2–1,4%",
			panen: "Tahun ke 3",
		},
		detail: {
			sejarah: "Kopi Preanger merupakan kopi pertama yang ditanam secara massal di Nusantara oleh VOC sejak 1699. Wilayah Priangan (kini Bandung, Garut, Cianjur, Tasikmalaya) menjadi pusat produksi kopi dunia pada abad ke-18.",
			karakteristik: "Profil rasa clean dan seimbang — asam citrus yang menyenangkan, aroma karamel, dengan sedikit sentuhan bunga. Aftertaste yang lembut dan panjang. Salah satu kopi paling konsisten di Indonesia.",
			wilayah: "Kabupaten Garut (Papandayan, Cikajang), Cianjur, Bandung Selatan. Beberapa di Tasikmalaya dan Sumedang.",
			tips: "Kopi Preanger tumbuh optimal di tanah vulkanik Gunung Papandayan dan Gunung Tilu. Proses wet-hulled (Giling Basah) memberikan karakter body yang lebih tebal dan earthy.",
		},
	},
	{
		id: "luwak",
		name: "Kopi Luwak",
		latin: "Coffea sp. (proses khusus)",
		emoji: "🦡",
		badge: "Termahal",
		color: "#FFEBEE",
		accent: "#B71C1C",
		desc: "Kopi paling mahal di dunia yang diproses melalui pencernaan luwak (musang). Menghasilkan rasa yang sangat smooth dan unik.",
		tags: ["Termahal", "Proses Unik", "Premium"],
		stats: {
			ketinggian: "Bergantung varietas",
			rasa: "Smooth, Low Acid, Rich",
			kafein: "1,0–1,3%",
			panen: "Bergantung musim",
		},
		detail: {
			sejarah: "Kopi Luwak pertama kali diproduksi pada era kolonial Belanda ketika petani lokal tidak boleh memanen kopi untuk keperluan pribadi. Mereka menemukan biji kopi yang telah melewati pencernaan luwak masih bisa diolah.",
			karakteristik: "Enzim pencernaan luwak memecah protein biji kopi yang menghasilkan rasa lebih smooth, hampir tidak pahit, dengan keasaman sangat rendah. Aroma kompleks dengan nuansa tanah, cokelat, dan vanilla.",
			wilayah: "Jawa Barat (khususnya area hutan di Pangandaran, Ciamis), Sumatera, Bali, Flores.",
			tips: "Kopi luwak etis berasal dari luwak liar yang hidup bebas di habitat aslinya, bukan dari luwak yang dikurung. Harga per kilogram bisa mencapai Rp 1–3 juta.",
		},
	},
];

// ==================== PRODUK UNGGULAN DINAS ====================
const produkDinas = [
	{
		nama: "Biji Kopi Robusta Memuko",
		emoji: "💪",
		deskripsi: "Kopi robusta unggulan Jawa Barat dari perkebunan Memuko. Cita rasa pahit tegas dengan body penuh, cocok untuk espresso dan kopi susu.",
		asal: "Perkebunan Memuko, Jawa Barat",
		jenis: "Robusta",
		warna: "#E8F5E9",
		aksen: "#2E7D32",
		keunggulan: ["Tahan hama & penyakit", "Produktivitas tinggi", "Harga kompetitif"],
	},
	{
		nama: "Kopi Arabika Jawa Barat",
		emoji: "🏔️",
		deskripsi: "Kopi arabika pilihan dari dataran tinggi Jawa Barat. Dikenal dengan keasaman citrus yang menyenangkan dan aroma floral yang khas.",
		asal: "Garut, Cianjur, Bandung Selatan",
		jenis: "Arabika",
		warna: "#FFF8E1",
		aksen: "#FF8F00",
		keunggulan: ["Kualitas premium ekspor", "Aroma floral khas", "Profil rasa kompleks"],
	},
	{
		nama: "Teh Putih",
		emoji: "🍵",
		deskripsi: "Teh putih premium Jawa Barat dipetik dari pucuk daun muda yang belum mekar. Rasa lembut dengan aroma halus yang menyegarkan.",
		asal: "Perkebunan Teh Jawa Barat",
		jenis: "Teh",
		warna: "#F3E5F5",
		aksen: "#7B1FA2",
		keunggulan: ["Antioksidan tinggi", "Rasa lembut", "Proses minimal"],
	},
	{
		nama: "Teh Orange Pekoe",
		emoji: "🟠",
		deskripsi: "Teh hitam grade orange pekoe dari perkebunan Jawa Barat. Warna seduhan merah keemasan dengan rasa kuat dan aroma malt yang khas.",
		asal: "Perkebunan Teh Jawa Barat",
		jenis: "Teh",
		warna: "#FFF3E0",
		aksen: "#E65100",
		keunggulan: ["Grade ekspor terpilih", "Warna seduhan premium", "Aroma khas malt"],
	},
	{
		nama: "Teh Hitam",
		emoji: "🫖",
		deskripsi: "Teh hitam klasik Jawa Barat dengan proses fermentasi penuh. Rasa bold dan kuat, cocok untuk teh susu maupun diseduh langsung.",
		asal: "Perkebunan Teh Jawa Barat",
		jenis: "Teh",
		warna: "#FFEBEE",
		aksen: "#B71C1C",
		keunggulan: ["Rasa bold & kuat", "Cocok berbagai sajian", "Produksi lokal unggulan"],
	},
];

// ==================== QUIZ DATA ====================
const quizData = {
	easy: [
		{ q: "☕ Apa warna buah kopi yang siap dipanen?", opts: ["Hijau", "Merah", "Kuning", "Hitam"], ans: 1, exp: 'Buah kopi siap panen berwarna merah cerah. Inilah mengapa panen selektif disebut "petik merah". Buah hijau/hitam menurunkan mutu.' },
		{ q: "🏔️ Kopi Arabika tumbuh optimal di ketinggian berapa?", opts: ["0–200 mdpl", "200–600 mdpl", "1.000–2.000 mdpl", "2.500–3.000 mdpl"], ans: 2, exp: "Arabika tumbuh optimal di 1.000–2.000 mdpl dengan suhu 15–25°C dan pH tanah 5,5–6,5." },
		{ q: "🌱 Berapa pH tanah ideal untuk menanam kopi?", opts: ["3,0–4,0", "5,5–6,5", "7,5–8,5", "9,0–10"], ans: 1, exp: "Kopi tumbuh terbaik di pH 5,5–6,5. Berlaku untuk Arabika maupun Robusta." },
		{ q: "💧 Kapan waktu terbaik menanam kopi?", opts: ["Musim kemarau", "Awal musim hujan", "Pertengahan kemarau", "Kapan saja"], ans: 1, exp: "Penanaman dilakukan awal musim hujan agar bibit mendapat cukup air dan tidak stres akibat panas terik." },
		{ q: "🌿 Berapa pasang daun bibit kopi yang siap tanam?", opts: ["1–2 pasang", "3–4 pasang", "6–8 pasang", "10–12 pasang"], ans: 2, exp: "Bibit siap tanam memiliki 6–8 pasang daun normal dengan sepasang cabang primer yang sudah terbentuk." },
		{ q: "🧪 Berapa dosis pupuk organik per pohon kopi per tahun?", opts: ["1–2 kg", "5–8 kg", "10–20 kg", "30–50 kg"], ans: 2, exp: "Dosis pupuk organik yang dianjurkan adalah 10–20 kg/pohon/tahun, sangat penting untuk tanah dengan bahan organik rendah (<3,5%)." },
		{ q: "🦡 Apa nama hama penggerek buah kopi?", opts: ["Helopeltis", "Hypothenemus hampei", "Pratylenchus coffeae", "Hemileia vastatrix"], ans: 1, exp: "Hypothenemus hampei (PBKo/Penggerek Buah Kopi) adalah hama utama yang menyerang buah kopi dan menurunkan mutu hasil panen." },
	],
	medium: [
		{ q: "📍 Kopi Robusta tumbuh di ketinggian berapa?", opts: ["0–100 mdpl", "100–600 mdpl", "1.000–1.500 mdpl", "1.500–2.000 mdpl"], ans: 1, exp: "Robusta tumbuh optimal di 100–600 mdpl dengan suhu 21–24°C. Lebih toleran panas dibanding Arabika." },
		{ q: "⚗️ Metode pascapanen apa yang menghasilkan mutu TERBAIK?", opts: ["Natural/Dry Process", "Giling Kering", "Giling Basah (Wet Hulled)", "Semi-washed"], ans: 2, exp: "Giling Basah (Wet Hulled) dianjurkan karena menghasilkan mutu terbaik. Buah masak harus segera diolah setelah panen." },
		{ q: "🌱 Apa nama klon batang bawah yang tahan nematoda?", opts: ["BP 42", "BP 308", "SA 237", "Kartika 1"], ans: 1, exp: "Klon BP 308 digunakan sebagai batang bawah pada bibit sambungan Robusta karena tahan terhadap nematoda parasit." },
		{ q: "✂️ Pada ketinggian berapa Etape I pemangkasan dilakukan?", opts: ["50–60 cm", "80–100 cm", "120–140 cm", "160–180 cm"], ans: 1, exp: "Etape I: batang dipotong di ±1 m, cabang primer disunat pada 80–100 cm untuk membentuk kerangka tanaman." },
		{ q: "🏛️ Berapa jumlah keluarga yang bergantung pada kopi di Indonesia?", opts: ["100.000 keluarga", "500.000 keluarga", "1 juta keluarga", "1,84 juta keluarga"], ans: 3, exp: "Tidak kurang dari 1,84 juta keluarga bergantung langsung pada budidaya kopi, dan sekitar 1 juta keluarga lagi pada industri hilirnya." },
		{ q: "🌿 Tanaman penaung tetap apa yang paling umum dipakai di Indonesia?", opts: ["Pisang", "Lamtoro (Leucaena sp.)", "Jagung", "Singkong"], ans: 1, exp: "Lamtoro (Leucaena sp.) adalah penaung tetap paling umum, ditanam jarak 2×2,5 m lalu dijarangkan ke 4×5 m setelah dewasa." },
		{ q: "📊 Kelas lahan mana yang paling ideal untuk kopi?", opts: ["Kelas N", "Kelas S3", "Kelas S2", "Kelas S1"], ans: 3, exp: "Kelas S1 (Sangat Sesuai) adalah lahan terbaik tanpa pembatas berarti. Kelas N berarti tidak sesuai dan tidak bisa dikoreksi." },
	],
	hard: [
		{ q: "🧪 Dosis Urea untuk kopi berumur >10 tahun per pohon per tahun?", opts: ["100 gram", "200 gram", "300 gram", "400 gram"], ans: 3, exp: "Pohon kopi >10 tahun membutuhkan Urea 400g + SP36 200g + KCl 250g + Kieserit 140g per pohon per tahun, dibagi dua pemberian." },
		{ q: "🦠 Jamur apa yang digunakan untuk mengendalikan PBKo secara biologis?", opts: ["Paecilomyces lilacinus", "Beauveria bassiana", "Trichoderma sp.", "Gliocladium sp."], ans: 1, exp: "Beauveria bassiana digunakan dengan dosis 2,5 kg biakan padat atau 100 g spora murni per hektar, tiga kali aplikasi per musim panen." },
		{ q: "📐 Berapa ukuran rorak konservasi yang dianjurkan?", opts: ["60×30×30 cm", "120×40×40 cm", "200×60×60 cm", "80×80×80 cm"], ans: 1, exp: "Rorak berukuran 120×40×40 cm dibuat di sekitar tanaman untuk menampung air dan bahan organik, mengurangi erosi." },
		{ q: "🌱 Robusta sebaiknya ditanam poliklonal berapa klon?", opts: ["1 klon tunggal", "2 klon", "3–4 klon", "5–6 klon"], ans: 2, exp: "Robusta bersifat menyerbuk silang sehingga wajib ditanam poliklonal 3–4 klon agar terjadi penyerbukan silang dan produksi optimal." },
		{ q: "📜 Berapa jarak tanam yang dianjurkan untuk Robusta?", opts: ["1,5 m × 1,5 m", "2,0 m × 1,5 m", "2,5 m × 2,5 m", "4,0 m × 4,0 m"], ans: 2, exp: "Robusta ditanam dengan jarak 2,5×2,5 m atau 3,0×2,0 m. Lubang tanam 60×60 cm bagian atas, 40×40 cm bagian bawah, kedalaman 60 cm." },
		{ q: "🔬 Berapa jumlah perangkap PBKo yang dipasang per hektar?", opts: ["5 trap", "12 trap", "24 trap", "50 trap"], ans: 2, exp: "Dipasang 24 trap/ha menggunakan senyawa penarik (seperti Hypotan), minimal selama 2 tahun setelah panen untuk memutus siklus hama." },
		{ q: "🌡️ Suhu optimal untuk kopi Liberika?", opts: ["10–15°C", "15–20°C", "21–30°C", "30–40°C"], ans: 2, exp: "Liberika tumbuh di suhu 21–30°C pada ketinggian 0–900 mdpl dengan curah hujan 1.250–3.500 mm/tahun, cocok di lahan gambut." },
	],
};

// ==================== STATE ====================
let totalPoints = 0;
let currentQuizLevel = "easy";
let currentQ = 0;
let quizAnswered = false;
let quizScore = 0;

// ==================== INIT ====================
window.onload = () => {
	createFloatingBeans();
	renderCoffeeCards();
	renderProdukDinas();
	startQuiz();
};

function createFloatingBeans() {
	const container = document.getElementById("floatingBeans");
	const emojis = ["☕", "🫘", "🌱", "🍃", "🌿"];
	for (let i = 0; i < 12; i++) {
		const b = document.createElement("div");
		b.className = "bean";
		b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
		b.style.cssText = `left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 12}s;animation-delay:-${Math.random() * 15}s;font-size:${0.8 + Math.random() * 1.5}rem`;
		container.appendChild(b);
	}
}

function startGame() {
	document.getElementById("splash").classList.remove("active");
	document.getElementById("mainGame").classList.add("active");
}

// ==================== NAVIGATION ====================
function showPanel(name) {
	document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
	document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
	document.getElementById("panel" + name.charAt(0).toUpperCase() + name.slice(1)).classList.add("active");
	document.getElementById("nav" + name.charAt(0).toUpperCase() + name.slice(1)).classList.add("active");

	if (name === "quiz") startQuiz();
}

// ==================== COFFEE CARDS ====================
function renderCoffeeCards() {
	const grid = document.getElementById("coffeeGrid");
	grid.innerHTML = coffeeData
		.map(
			(c) => `
    <div class="coffee-card" onclick="openCoffeeModal('${c.id}')">
      <div class="coffee-card-banner" style="background:${c.color}">
        <span style="font-size:3.5rem">${c.emoji}</span>
        ${c.badge ? `<span class="coffee-badge">${c.badge}</span>` : ""}
      </div>
      <div class="coffee-card-body">
        <div class="coffee-card-name">${c.name}</div>
        <div class="coffee-card-latin">${c.latin}</div>
        <div class="coffee-card-desc">${c.desc}</div>
        <div class="coffee-tags">${c.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="coffee-stats">
          <div class="coffee-stat"><div class="coffee-stat-label">📍 Ketinggian</div><div class="coffee-stat-val">${c.stats.ketinggian}</div></div>
          <div class="coffee-stat"><div class="coffee-stat-label">😋 Rasa</div><div class="coffee-stat-val">${c.stats.rasa}</div></div>
        </div>
      </div>
    </div>
  `,
		)
		.join("");
}

function renderProdukDinas() {
	const grid = document.getElementById("produkGrid");
	grid.innerHTML = produkDinas
		.map(
			(p) => `
        <div class="coffee-card" style="cursor:default;">
            <div class="coffee-card-banner" style="background:${p.warna};">
                <span style="font-size:3.5rem">${p.emoji}</span>
                <span class="coffee-badge" style="background:${p.aksen}; color:white;">Produk Dinas</span>
            </div>
            <div class="coffee-card-body">
                <div class="coffee-card-name">${p.nama}</div>
                <div class="coffee-card-latin" style="color:${p.aksen}">📍 ${p.asal}</div>
                <div class="coffee-card-desc">${p.deskripsi}</div>
                <div style="margin-top: 10px;">
                    ${p.keunggulan
						.map(
							(k) => `
                        <div style="display:flex; align-items:center; gap:8px; font-size:0.82rem; color:#444; margin-bottom:5px;">
                            <span style="color:${p.aksen}; font-weight:800;">✓</span> ${k}
                        </div>
                    `,
						)
						.join("")}
                </div>
                <div style="margin-top:12px; background:var(--cream); border-radius:10px; padding:8px 12px; font-size:0.78rem; font-weight:700; color:var(--coffee-mid); border-left: 3px solid ${p.aksen};">
                    Jenis: ${p.jenis}
                </div>
            </div>
        </div>
    `,
		)
		.join("");
}

function openCoffeeModal(id) {
	const c = coffeeData.find((x) => x.id === id);
	const modal = document.getElementById("modalContent");
	modal.innerHTML = `
    <div class="modal-header">
      <div>
        <div class="modal-emoji">${c.emoji}</div>
        <div class="modal-title">${c.name}</div>
        <div class="modal-latin">${c.latin}</div>
      </div>
      <button class="modal-close" onclick="closeCoffeeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-section-title">📖 Sejarah</div>
      <div class="modal-text">${c.detail.sejarah}</div>
      <div class="modal-section-title">🎨 Karakteristik</div>
      <div class="modal-text">${c.detail.karakteristik}</div>
      <div class="modal-section-title">📍 Wilayah Produksi</div>
      <div class="modal-text">${c.detail.wilayah}</div>
      <div class="modal-section-title">💡 Tips Budidaya</div>
      <div class="modal-text">${c.detail.tips}</div>
      <div class="modal-fact-grid">
        ${Object.entries(c.stats)
			.map(
				([k, v]) => `
          <div class="modal-fact">
            <div class="modal-fact-key">${k}</div>
            <div class="modal-fact-val">${v}</div>
          </div>`,
			)
			.join("")}
      </div>
    </div>
  `;
	document.getElementById("coffeeModal").classList.add("open");
	addPoints(10, "Membaca info kopi! +10");
}

function closeCoffeeModal(e) {
	if (!e || e.target.id === "coffeeModal" || e.target.className === "modal-close") {
		document.getElementById("coffeeModal").classList.remove("open");
	}
}

// ==================== QUIZ ====================
function selectLevel(level, btn) {
	currentQuizLevel = level;
	document.querySelectorAll(".level-btn").forEach((b) => b.classList.remove("active"));
	btn.classList.add("active");
	currentQ = 0;
	quizScore = 0;
	document.getElementById("scoreBoard").classList.remove("show");
	document.getElementById("quizCard").style.display = "block";
	renderQuestion();
}

function startQuiz() {
	currentQ = 0;
	quizScore = 0;
	document.getElementById("scoreBoard").classList.remove("show");
	document.getElementById("quizCard").style.display = "block";
	renderQuestion();
}

function renderQuestion() {
	const questions = quizData[currentQuizLevel];
	if (currentQ >= questions.length) {
		showScore();
		return;
	}
	const q = questions[currentQ];
	quizAnswered = false;

	const dots = questions
		.map((_, i) => {
			let cls = i < currentQ ? "done" : i === currentQ ? "current" : "";
			return `<div class="quiz-dot ${cls}"></div>`;
		})
		.join("");

	const letters = ["A", "B", "C", "D"];
	const opts = q.opts
		.map(
			(o, i) => `
    <button class="quiz-opt" onclick="answerQuiz(${i})">
      <span class="opt-letter">${letters[i]}</span> ${o}
    </button>
  `,
		)
		.join("");

	document.getElementById("quizCard").innerHTML = `
    <div class="quiz-progress">
      <span class="quiz-num">Soal ${currentQ + 1} / ${questions.length}</span>
      <div class="quiz-dots">${dots}</div>
    </div>
    <div class="quiz-question"><span class="q-icon"></span>${q.q}</div>
    <div class="quiz-options">${opts}</div>
    <div class="quiz-feedback" id="quizFb"></div>
    <div class="quiz-actions">
      <button class="btn-next" id="btnNext" onclick="nextQuestion()">Lanjut →</button>
    </div>
  `;
}

function answerQuiz(idx) {
	if (quizAnswered) return;
	quizAnswered = true;
	const questions = quizData[currentQuizLevel];
	const q = questions[currentQ];
	const opts = document.querySelectorAll(".quiz-opt");
	const fb = document.getElementById("quizFb");

	opts.forEach((o) => o.classList.add("disabled"));
	opts[q.ans].classList.add("correct");

	if (idx === q.ans) {
		quizScore++;
		const pts = currentQuizLevel === "easy" ? 10 : currentQuizLevel === "medium" ? 20 : 30;
		addPoints(pts, `✅ Benar! +${pts}`);
		fb.className = "quiz-feedback show correct";
		fb.innerHTML = `<span>✅</span><div><strong>Benar!</strong> ${q.exp}</div>`;
	} else {
		opts[idx].classList.add("wrong");
		fb.className = "quiz-feedback show wrong";
		fb.innerHTML = `<span>❌</span><div><strong>Salah.</strong> ${q.exp}</div>`;
	}
	document.getElementById("btnNext").classList.add("show");
}

function nextQuestion() {
	currentQ++;
	renderQuestion();
}

function showScore() {
	const questions = quizData[currentQuizLevel];
	const pct = Math.round((quizScore / questions.length) * 100);
	const stars = pct >= 80 ? "⭐⭐⭐" : pct >= 50 ? "⭐⭐" : "⭐";
	const msg = pct === 100 ? "🎉 Sempurna! Kamu ahli kopi sejati!" : pct >= 80 ? "🌟 Luar biasa! Kamu sangat pintar!" : pct >= 50 ? "😊 Bagus! Terus belajar ya!" : "💪 Jangan menyerah, coba lagi!";

	document.getElementById("quizCard").style.display = "none";
	const sb = document.getElementById("scoreBoard");
	sb.innerHTML = `
    <span class="score-trophy">${pct === 100 ? "🏆" : "☕"}</span>
    <div class="score-title">Quiz Selesai!</div>
    <div class="score-stars">${stars}</div>
    <div class="score-val">${quizScore}/${questions.length}</div>
    <div style="font-size:1.5rem;color:var(--coffee-warm);font-weight:800">${pct}%</div>
    <div class="score-msg">${msg}</div>
    <button class="btn-retry" onclick="startQuiz()">🔄 Coba Lagi</button>
  `;
	sb.classList.add("show");
	if (pct === 100) launchConfetti();
}

// ==================== POINTS & UI ====================
function addPoints(pts, msg) {
	totalPoints += pts;
	document.getElementById("totalPoints").textContent = totalPoints;
	const levels = [
		[0, "Pemula"],
		[100, "Pelajar"],
		[300, "Petani"],
		[600, "Ahli"],
		[1000, "Master Kopi ☕"],
	];
	for (let i = levels.length - 1; i >= 0; i--) {
		if (totalPoints >= levels[i][0]) {
			document.getElementById("levelDisplay").textContent = levels[i][1];
			break;
		}
	}
	if (msg) showToast(msg);
}

function showToast(msg) {
	const t = document.getElementById("toast");
	t.textContent = msg;
	t.classList.add("show");
	setTimeout(() => t.classList.remove("show"), 2500);
}

function launchConfetti() {
	const colors = ["#FFD600", "#E91E8C", "#4CAF50", "#29B6F6", "#FF9800", "#9C27B0"];
	for (let i = 0; i < 60; i++) {
		const c = document.createElement("div");
		c.className = "confetti-piece";
		const color = colors[Math.floor(Math.random() * colors.length)];
		const x = Math.random() * 100 + "vw";
		const dx = (Math.random() - 0.5) * 200 + "px";
		const dur = 1.5 + Math.random() * 2 + "s";
		const delay = Math.random() * 0.5 + "s";
		const shape = Math.random() > 0.5 ? "50%" : "0";
		c.style.cssText = `left:${Math.random() * 100}vw;top:0;background:${color};border-radius:${shape};--x:${x};--dx:${dx};--dur:${dur};--delay:${delay}`;
		document.body.appendChild(c);
		setTimeout(() => c.remove(), 4000);
	}
}
