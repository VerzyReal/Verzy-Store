# Progres Proyek - Verzy Store

Terakhir diperbarui: 9 November 2026
Posisi saat ini: **Step 1 - Landing Page**

## Checklist
- [x] Inisiasi (data usaha & desain terkumpul)
- [ ] STEP 1 - Landing page
  - [ ] Hero
  - [ ] About
  - [ ] Service
  - [ ] Berita/Post
  - [ ] Contact + Google Maps
  - [ ] Responsif & aksesibilitas dicek
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 2 - User management & dashboard
  - [ ] Apps Script (code.gs, setup.gs) + inisiasi tabel
  - [ ] Login & register
  - [ ] Role admin & user
  - [ ] Dashboard: manajemen user, manajemen role, CRUD berita
  - [ ] Upload media lokal
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 3 - Pemesanan (opsional / dilewati)
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 4 - Deploy & maintenance
  - [ ] Deploy ke Vercel
  - [ ] Dikonfirmasi pengguna

## Data Usaha
- **Nama Usaha**: Verzy Store (PT Verzy Digital Media)
- **Bidang Usaha**: Top-Up Games & Voucher Hiburan Digital
- **Deskripsi**: Platform top-up game dan voucher digital tercepat, termurah, dan terpercaya di Indonesia. Transaksi otomatis 24 jam non-stop, 100% legal dan bergaransi anti-banned.
- **Link Google Maps**: https://maps.app.goo.gl/hpJeqcMT7P4XfJua8 (Cyber 2 Tower Lt. 18, Jl. H. R. Rasuna Said, Kuningan Barat, Jakarta Selatan 12950)
- **Logo Usaha**: Ikon kristal V biru neon dengan tipografi "VERZY STORE"
- **Rancangan UI**: Sesuai design token dan layout di folder `stitch_verzy_store_game_landing_page`

## Catatan & Keputusan
- Stack: Next.js (App Router) + Tailwind CSS (Vercel-ready).
- Design system: Space Grotesk (headings) & Plus Jakarta Sans (body/labels).
- Palet Warna: Primary Deep Marine Blue (`#086288`), Secondary Mid Blue (`#4D8DBA`), Tertiary Ice Cyan (`#97D7FF`), Surface Canvas (`#F8FAFC`).
- Seluruh aset gambar (game icons, hero illustrations, logo) disalin ke `public/images/`.
- Data konfigurasi situs dipusatkan di `src/config/site.ts`.

## Cara Menjalankan
1. `npm run dev` untuk menjalankan server development lokal di `http://localhost:3000`.
2. `npm run build` untuk memeriksa build produksi.
