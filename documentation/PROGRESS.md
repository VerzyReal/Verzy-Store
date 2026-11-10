# Progres Proyek - Verzy Store

Terakhir diperbarui: 10 November 2026
Posisi saat ini: **Step 2 - User Management, Dashboard, & Google Spreadsheet Database (Selesai & Siap Dikonfirmasi)**

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
  - [x] Apps Script (`code.gs`, `setup.gs`) + inisiasi tabel idempoten (`Roles`, `Users`, `News`)
  - [x] Login & register (Validasi form, cookie httpOnly JWT dengan `jose`, proteksi password dengan `bcryptjs`, halaman login bersih tanpa pembocoran kredensial)
  - [x] Role admin & user (Role bawaan berstatus `is_system`, proteksi route dashboard di server via `middleware.ts`)
  - [x] Akun admin default (`admin@gmail.com` / `123456`) tersimpan dalam bentuk hash bcrypt + form ganti password
  - [x] Dashboard: manajemen user (cari, ubah role, aktif/nonaktif, proteksi hapus admin sendiri & admin terakhir)
  - [x] Dashboard: manajemen role (daftar role, tambah role kustom, proteksi role sistem)
  - [x] Dashboard: CRUD berita & promo (tambah, edit, hapus, status draft/published, pratinjau langsung)
  - [x] Upload media lokal (`src/lib/storage.ts`) ke `public/uploads/` dengan validasi tipe & ukuran
  - [x] Landing page terhubung dinamis ke berita dari database
  - [x] Panduan lengkap Google Spreadsheet di `/documentation/SETUP.md`
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 3 - Pemesanan (opsional / jual-beli & booking game top up)
  - [ ] Dikonfirmasi pengguna
- [ ] STEP 4 - Deploy & maintenance
  - [ ] Deploy ke Vercel
  - [ ] Dikonfirmasi pengguna

## Catatan Penting Mengenai Media (Upload Gambar)
Penyimpanan gambar thumbnail di `public/uploads/` berjalan optimal saat pengembangan lokal (*development*). Karena disk server Vercel bersifat sementara (*ephemeral*) saat production, modul penyimpanan telah diisolasi di `src/lib/storage.ts` agar di Step 4 dapat dengan mudah dimigrasikan ke cloud storage (seperti Vercel Blob, Cloudinary, atau Google Drive).

## Peringatan Keamanan Kredensial Default
Akun admin bawaan menggunakan email `admin@gmail.com` dan kata sandi `123456`. Harap gunakan fitur ganti kata sandi di menu Dashboard sebelum mempublikasikan website ke production.

## Cara Menguji Lokal
1. Jalankan server:
   ```bash
   npm run dev
   ```
2. Buka `http://localhost:3000/login`
3. Masuk menggunakan akun admin:
   - Email: `admin@gmail.com`
   - Kata Sandi: `123456`
4. Coba uji:
   - Akses `/dashboard`: lihat ringkasan & coba form ganti kata sandi
   - Akses `/dashboard/users`: cari user, ubah role, aktif/nonaktifkan status
   - Akses `/dashboard/roles`: buat role kustom baru
   - Akses `/dashboard/news`: buat berita baru, unggah gambar thumbnail, dan lihat hasilnya muncul di landing page
5. Uji logout dan daftar user baru di `/register`. Coba buka `/dashboard` saat login sebagai user biasa (akan otomatis dicegah oleh middleware).
