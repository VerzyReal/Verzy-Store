# Progres Proyek - Verzy Store

Terakhir diperbarui: 9 November 2026
Posisi saat ini: **Step 1 - Landing Page (Selesai & Siap Dikonfirmasi)**

## Checklist
- [x] Inisiasi (data usaha & desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Hero (Heading kuat, badge glowing, trust stats 500K+, ilustrasi hero + floating badges)
  - [x] About (Kisah Verzy Store dari komunitas gamer, foto tim kantor Kuningan, 3 nilai keunggulan)
  - [x] Service (Katalog 6 kartu game terpopuler + filter kategori + badge + harga mulai)
  - [x] Berita/Post (3 kartu promo & tips gaming + modal pratinjau artikel lengkap)
  - [x] Contact + Google Maps (Info kontak WhatsApp CS 24 jam, Email, Alamat Cyber 2 Tower + Google Maps embed responsive + form kontak interaktif)
  - [x] Responsif & aksesibilitas dicek (Mobile hamburger drawer, tablet, desktop, kontras warna, semantic tags)
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 2 - User management & dashboard
  - [ ] Apps Script (code.gs, setup.gs) + inisiasi tabel
  - [ ] Login & register
  - [ ] Role admin & user
  - [ ] Dashboard: manajemen user, manajemen role, CRUD berita
  - [ ] Upload media lokal
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 3 - Pemesanan (opsional / jual-beli & booking game top up)
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 4 - Deploy & maintenance
  - [ ] Deploy ke Vercel
  - [ ] Dikonfirmasi pengguna

## Data Usaha
- **Nama Usaha**: Verzy Store (PT Verzy Digital Media)
- **Bidang Usaha**: Top-Up Games & Voucher Hiburan Digital
- **Tentang Usaha**: Platform top-up game dan voucher digital tercepat, termurah, dan terpercaya di Indonesia. Transaksi otomatis 24 jam non-stop, 100% legal dan bergaransi anti-banned.
- **Link Google Maps**: https://maps.app.goo.gl/hpJeqcMT7P4XfJua8 (Cyber 2 Tower Lt. 18, Jl. H. R. Rasuna Said, Kuningan Barat, Jakarta Selatan 12950)
- **Logo Usaha**: Ikon kristal neon V biru dengan tipografi "VERZY STORE" (`public/images/logo.jpg`)
- **Rancangan UI**: Mengacu pada design token & asset di `stitch_verzy_store_game_landing_page`

## Daftar Aset & Media Step 1
- `public/images/logo.jpg`: Logo resmi Verzy Store (dari lampiran pengguna)
- `public/images/hero-illustration.png`: Ilustrasi hero showcase gaming
- `public/images/team-about.png`: Foto tim support & operasional gedung Cyber 2 Tower
- `public/images/mlbb.png`: Mobile Legends Bang Bang
- `public/images/ff.png`: Free Fire & FF MAX
- `public/images/pubg.png`: PUBG Mobile & Honor of Kings
- `public/images/genshin.png`: Genshin Impact & Star Rail
- `public/images/valorant.png`: Valorant & Steam Wallet
- `public/images/voucher.png`: Voucher Digital & Hiburan
- `public/images/hok.png`: Honor of Kings
- `public/images/roblox.png`: Roblox
- `public/images/cod.png`: Call of Duty Mobile

## Catatan & Keputusan Teknis
- Framework: Next.js 14 App Router + Tailwind CSS (Vercel-ready).
- Konfigurasi terpusat di `src/config/site.ts`.
- Tipografi: Space Grotesk (headings) & Plus Jakarta Sans (body).
- Palet Warna: Primary Deep Marine Blue (`#004967` / `#086288`), Secondary Mid Blue (`#19648f` / `#8fcdfd`), Tertiary Ice Cyan (`#97D7FF`).
- Aksesibilitas: Form dengan label eksplisit, atribut alt pada semua gambar, warna kontras tinggi, navigasi keyboard friendly.

## Cara Menjalankan Lokal
1. Jalankan development server:
   ```bash
   npm run dev
   ```
2. Buka browser di [http://localhost:3000](http://localhost:3000).
3. Verifikasi build produksi kapan saja:
   ```bash
   npm run build
   ```
