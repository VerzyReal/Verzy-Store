# Panduan Setup Database Google Spreadsheet via Google Apps Script

Panduan langkah demi langkah untuk menghubungkan website **Verzy Store** ke Google Spreadsheet sebagai database utama melalui Google Apps Script.

---

## Mengapa Menggunakan Arsitektur Ini?
Alur koneksi database:
```
Browser -> Next.js (API Server) -> Apps Script Web App -> Google Spreadsheet
```
> **Konsep Penting:** Browser pengguna **tidak pernah** memanggil Google Apps Script secara langsung. Semua permintaan dilewatkan melalui server Next.js yang memegang kunci rahasia (*shared secret token*), sehingga file Google Spreadsheet Anda tetap terlindungi dan aman dari akses sembarang orang di internet.

---

## Langkah 1: Buat Google Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet Anda, misalnya: **"Database Verzy Store"**.

---

## Langkah 2: Buka Editor Apps Script
1. Di menu atas Google Spreadsheet, klik **Ekstensi (Extensions)** > **Apps Script**.
2. Beri nama proyek Apps Script, misalnya: **"Verzy Store Backend"**.

---

## Langkah 3: Salin File Kode (`code.gs` & `setup.gs`)
File kode ini sudah disiapkan di root proyek lokal Anda:

1. **File `code.gs`:**
   - Di editor Apps Script, buka file `Code.gs` bawaan (atau ganti namanya).
   - Hapus semua isi default, lalu salin dan tempel seluruh isi file `code.gs` yang ada di root project lokal Anda.
2. **File `setup.gs`:**
   - Di panel kiri Apps Script, klik tombol **+** di sebelah *Files* > pilih **Script**.
   - Beri nama file: `setup`.
   - Salin dan tempel seluruh isi file `setup.gs` yang ada di root project lokal Anda.
3. Klik tombol **Simpan (Save)** (ikon disket) atau tekan `Ctrl + S`.

---

## Langkah 4: Jalankan Inisiasi Tabel Otomatis (`initTables`)
Fungsi `initTables()` bersifat **idempoten** (aman dijalankan berulang kali tanpa menghapus atau menduplikasi data yang ada).

1. Pada dropdown fungsi di toolbar atas editor Apps Script, pilih fungsi **`initTables`**.
2. Klik tombol **Jalankan (Run)**.
3. Saat pertama kali dijalankan, Google akan meminta konfirmasi izin akses (*Review Permissions*):
   - Pilih akun Google Anda.
   - Klik *Advanced* (Lanjutan) > klik *Go to Verzy Store Backend (unsafe)*.
   - Klik **Allow** (Izinkan).
4. Setelah selesai, buka kembali tab Google Spreadsheet Anda. Anda akan melihat 3 sheet otomatis terbentuk dengan header rapi:
   - **`Roles`**: memuat role bawaan `admin` dan `user`.
   - **`Users`**: memuat akun admin awal (`admin@gmail.com`).
   - **`News`**: memuat data awal artikel & promo.

---

## Langkah 5: Setel Token Rahasia di Script Properties
1. Di editor Apps Script, klik ikon gerigi **Project Settings** (Setelan Proyek) di bilah navigasi kiri.
2. Gulir ke bawah hingga bagian **Script Properties** (Properti Skrip).
3. Klik **Add script property** (Tambahkan properti skrip):
   - **Property:** `APPS_SCRIPT_SECRET`
   - **Value:** Masukkan kata sandi / token rahasia panjang pilihan Anda (misalnya: `verzy_secret_token_123456789`).
4. Klik **Save script properties**.

---

## Langkah 6: Deploy sebagai Web App
1. Di kanan atas editor Apps Script, klik tombol biru **Deploy** > pilih **New deployment**.
2. Klik ikon gerigi di sebelah *Select type* > pilih **Web app**.
3. Isi konfigurasi berikut:
   - **Description:** `Verzy Store Web App v1`
   - **Execute as:** `Me (email-anda@gmail.com)`
   - **Who has access:** `Anyone` (Siapa saja)
4. Klik **Deploy**.
5. Salin **Web app URL** yang dihasilkan (formatnya: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Langkah 7: Sambungkan ke Proyek Next.js Lokal
1. Buat atau buka file `.env.local` di root proyek:
   ```env
   APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   APPS_SCRIPT_SECRET=verzy_secret_token_123456789
   AUTH_SECRET=kunci_rahasia_sesi_jwt_minimal_32_karakter_acak!
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
2. Restart server development:
   ```bash
   npm run dev
   ```
3. Selamat! Website kini terhubung langsung ke Google Spreadsheet Anda.

---

## Cara Memperbarui Deployment Saat Kode Berubah
Setiap kali Anda mengubah kode di `code.gs` atau `setup.gs`:
1. Klik **Deploy** > **Manage deployments**.
2. Pilih deployment aktif, lalu klik ikon **Edit (pensil)** di kanan atas.
3. Pada dropdown Version, pilih **New version** (Versi baru).
4. Klik **Deploy**.

---

## Catatan Penting Mengenai Penyimpanan Media (Upload Gambar)
* Saat ini, media yang diunggah melalui menu CRUD Berita tersimpan secara lokal di folder `public/uploads/` dan hanya path URL-nya yang dicatat ke spreadsheet.
* **Perilaku di Vercel:** Disk di server Vercel bersifat sementara (*ephemeral*) dan hanya-baca saat production. File yang diunggah secara lokal di komputer development akan berfungsi normal, namun untuk deployment produksi ke Vercel di Step 4, disarankan memindahkan penyimpanan media ke cloud storage (seperti Vercel Blob, Cloudinary, atau Google Drive) melalui modul terpusat `src/lib/storage.ts` yang sudah kami siapkan.
