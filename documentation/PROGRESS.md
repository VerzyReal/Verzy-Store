# Progres Proyek - Verzy Store

Terakhir diperbarui: 11 November 2026
Posisi saat ini: **Step 3 - Sistem Pemesanan Top Up Game, Tiket Pembayaran QRIS, & Dashboard Verifikasi Admin (Selesai & Siap Dikonfirmasi)**

## Checklist
- [x] Inisiasi (data usaha & desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Hero (Heading kuat, badge glowing, trust metrics 500K+, ilustrasi hero + floating badges)
  - [x] About (Kisah Verzy Store dari komunitas gamer, foto tim kantor Kuningan, 3 nilai keunggulan)
  - [x] Service (Katalog 6 kartu game terpopuler + filter kategori + badge + harga mulai)
  - [x] Berita/Post (3 kartu promo & tips gaming + modal pratinjau artikel lengkap)
  - [x] Contact + Google Maps (Info kontak WhatsApp CS 24 jam, Email, Alamat Cyber 2 Tower + Google Maps embed responsive + form kontak interaktif)
  - [x] Dark Mode Interaktif (Tema gelap cyber neon `#0a0e18` & `#00d2ff`, toggle switch, anti-FOUC, persistensi localStorage)
  - [x] Responsif & aksesibilitas dicek (Mobile hamburger drawer, tablet, desktop, kontras warna, semantic tags)
  - [x] Dikonfirmasi pengguna
- [x] STEP 2 - User management & dashboard
  - [x] Apps Script (`code.gs`, `setup.gs`) + inisiasi tabel idempoten (`Roles`, `Users`, `News`, `Orders`)
  - [x] Login & register (Validasi form, cookie httpOnly JWT dengan `jose`, proteksi password dengan `bcryptjs`, halaman login bersih tanpa pembocoran kredensial)
  - [x] Role admin & user (Role bawaan berstatus `is_system`, proteksi route dashboard di server via `middleware.ts`)
  - [x] Akun admin default (`admin@gmail.com` / `123456`) tersimpan dalam bentuk hash bcrypt + form ganti password
  - [x] Dashboard: manajemen user (cari, ubah role, aktif/nonaktif, proteksi hapus admin sendiri & admin terakhir)
  - [x] Dashboard: manajemen role (daftar role, tambah role kustom, proteksi role sistem)
  - [x] Dashboard: CRUD berita & promo (tambah, edit, hapus, status draft/published, pratinjau langsung)
  - [x] Upload media lokal (`src/lib/storage.ts`) ke `public/uploads/` dengan validasi tipe & ukuran
  - [x] Landing page terhubung dinamis ke berita dari database
  - [x] Panduan lengkap Google Spreadsheet di `/documentation/SETUP.md`
  - [x] Dikonfirmasi pengguna
- [x] STEP 3 - Pemesanan (Sistem Top Up Game & Tiket Pembayaran QRIS)
  - [x] Dummy QRIS barcode (`public/images/qris-dummy.svg`) terintegrasi rapi dengan panduan pembayaran 4 langkah
  - [x] Form Pemesanan Top Up (`src/app/order/page.tsx`):
    - [x] Pemilihan Game dinamis (Mobile Legends, Free Fire, PUBG Mobile, Genshin Impact, Valorant, Roblox)
    - [x] Pemilihan nominal diamond/kredit dengan visual kartu interaktif & badge harga
    - [x] Input Data Akun (User ID & Zone ID, Nickname opsional) + instruksi cara cek ID
    - [x] Input Kontak WhatsApp aktif untuk notifikasi instan
    - [x] Tombol submit dengan status loading & integrasi sesi login
  - [x] Tiket Pembayaran QRIS (`src/app/order/[id]/payment/page.tsx`):
    - [x] QRIS Dummy barcode high-resolution dengan tombol unduh barcode
    - [x] Nomor tiket unik (`#VS-XXXXXXXX`) dengan tombol salin 1-klik
    - [x] Rincian lengkap item pesanan & nominal harga Rupiah
    - [x] Status badge live (`menunggu_konfirmasi`, `dikonfirmasi`, `dibatalkan`)
    - [x] Auto-refresh setiap 10 detik mendeteksi konfirmasi admin tanpa reload manual
    - [x] Tombol shortcut konfirmasi instan ke WhatsApp CS resmi dengan pesan template otomatis
  - [x] Riwayat Pesanan Pengguna (`src/app/orders/page.tsx`):
    - [x] Daftar tiket pesanan akun yang sedang login
    - [x] Filter status (Semua, Menunggu, Dikonfirmasi, Dibatalkan) & fitur pencarian
    - [x] Tautan cepat buka tiket QRIS & hubungi CS
  - [x] Dashboard Admin Pesanan Masuk (`src/app/dashboard/orders/page.tsx`):
    - [x] Tab counter filter status live
    - [x] Tabel pesanan lengkap dengan nomor tiket, game, paket, akun tujuan, WhatsApp, harga, status
    - [x] Aksi 1-klik "Konfirmasi" untuk mengubah status tiket menjadi `dikonfirmasi`
    - [x] Aksi "Tolak / Batalkan" dengan modal input alasan penolakan
    - [x] Tombol direct WhatsApp chat ke pembeli
  - [x] Integrasi UI Global:
    - [x] Navbar: Profil pengguna, shortcut "Pesanan Saya", dropdown akun, shortcut dashboard admin
    - [x] Services: Tombol "Top Up" pada 6 kartu game terhubung langsung ke `/order?game=...`
    - [x] Dashboard: Ringkasan total pesanan masuk & pesanan baru pada overview cards
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 4 - Deploy & maintenance
  - [ ] Deploy ke Vercel
  - [ ] Dikonfirmasi pengguna

## Catatan Penting Mengenai Media (Upload Gambar)
Penyimpanan gambar thumbnail di `public/uploads/` berjalan optimal saat pengembangan lokal (*development*). Karena disk server Vercel bersifat sementara (*ephemeral*) saat production, modul penyimpanan telah diisolasi di `src/lib/storage.ts` agar di Step 4 dapat dengan mudah dimigrasikan ke cloud storage (seperti Vercel Blob, Cloudinary, atau Google Drive).

## Peringatan Keamanan Kredensial Default
Akun admin bawaan menggunakan email `admin@gmail.com` dan kata sandi `123456`. Harap gunakan fitur ganti kata sandi di menu Dashboard sebelum mempublikasikan website ke production.

## Cara Menguji Alur Pemesanan (Step 3)
1. Jalankan server:
   ```bash
   npm run dev
   ```
2. Kunjungi halaman utama `http://localhost:3000`:
   - Pada bagian katalog "Layanan", klik tombol **Top Up** pada salah satu kartu game (misal: *Mobile Legends*).
   - Halaman akan membuka `/order?game=mlbb`.
3. Lakukan pengujian pemesanan:
   - Pilih nominal item (misal: *86 Diamonds* atau *296 Diamonds*).
   - Masukkan User ID Game & Zone ID (contoh: `12345678` dan `2024`).
   - Masukkan Nomor WhatsApp aktif.
   - Klik **Lanjutkan Pembayaran QRIS**.
4. Halaman Tiket Pembayaran QRIS (`/order/[id]/payment`) akan terbuka:
   - Tampil barcode QRIS Dummy Verzy Store.
   - Tampil nomor tiket (dapat disalin), rincian akun, dan nominal bayar.
   - Klik tombol **Konfirmasi via WhatsApp** untuk menguji pesan otomatis.
5. Uji Verifikasi Sisi Admin:
   - Buka tab browser baru ke `http://localhost:3000/dashboard/orders`.
   - Pesanan yang baru dibuat akan langsung muncul di baris teratas dengan status *Menunggu*.
   - Klik tombol hijau **Konfirmasi**: status tiket akan langsung berubah menjadi *Dikonfirmasi*.
   - Kembali ke tab tiket pembeli (`/order/[id]/payment`), status akan otomatis terupdate dalam hitungan detik tanpa reload manual!
6. Buka menu **Pesanan Saya** di navbar (`http://localhost:3000/orders`) untuk melihat riwayat semua transaksi top up akun Anda.
