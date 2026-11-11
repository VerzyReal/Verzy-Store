# Maintenance Log - Verzy Store (PT Verzy Digital Media)

Dokumen ini mencatat log pemeliharaan, backlog fitur lanjutan, penanganan bug, dan riwayat pembaruan sistem website Verzy Store.

---

## 🛠️ Panduan Perawatan & Siklus Update

1. **Pembaruan Kode / Tampilan:**
   - Lakukan pengujian di branch lokal dengan `npm run dev`.
   - Pastikan build produksi lolos dengan `npm run build` sebelum push ke Git.
   - Deploy ke Vercel akan terpicu secara otomatis saat branch utama di-push.
2. **Pembaruan Basis Data Google Spreadsheet:**
   - Jika terdapat perubahan skema tabel atau penambahan endpoint di Apps Script (`code.gs` atau `setup.gs`):
     - Salin kode terbaru ke Google Apps Script Editor.
     - Klik **Deploy > Manage deployments > Edit > New version > Deploy**.
     - Pastikan URL deployment di environment variable `APPS_SCRIPT_URL` Vercel selalu sinkron.
3. **Penyimpanan Media & Gambar:**
   - Di production Vercel, pastikan gambar thumbnail berita telah terhubung ke cloud storage (Vercel Blob, Cloudinary, atau Google Drive) sesuai panduan pada `SETUP.md`.

---

## 📋 Backlog Fitur Lanjutan (Future Enhancements)

- [ ] **Payment Gateway Otomatis (Midtrans / Xendit):**
  - Integrasi QRIS dinamis otomatis (otomatis mendeteksi transfer tanpa verifikasi manual admin).
  - Webhook callback untuk mengubah status tiket menjadi *dikonfirmasi* seketika.
- [ ] **Notifikasi Otomatis WhatsApp (Fonnte / WhatsApp Cloud API):**
  - Kirim pesan template WhatsApp otomatis saat pembeli membuat tiket pesanan baru.
  - Kirim bukti pengisian / konfirmasi selesai saat admin menyetujui pesanan.
- [ ] **Notifikasi Email Transaksional (Resend / SendGrid):**
  - Kirim ringkasan struk pesanan ke email pembeli.
- [ ] **Cek ID Akun Game Otomatis (API Nickname Validator):**
  - Cek otomatis apakah Nickname Mobile Legends / Free Fire sesuai sebelum lanjut bayar.
- [ ] **Migrasi Cloud Storage Terpadu (Vercel Blob):**
  - Upload thumbnail gambar berita langsung ke Vercel Blob Storage tanpa batas disk server.

---

## 🐛 Bug Diketahui & Status Penanganan

| Tanggal | Deskripsi Masalah | Prioritas | Status | Solusi / Catatan |
|---|---|---|---|---|
| 09/11/2026 | Google Font build failure karena jaringan offline | Medium | **Resolved** | Beralih ke link preconnect CDN Google Fonts di `layout.tsx` |
| 10/11/2026 | Prerender error `useSearchParams` tanpa boundary | Medium | **Resolved** | Membungkus halaman `/login` dan `/order` dengan `<Suspense>` |
| 10/11/2026 | Script execution policy terblokir saat `npm run dev` | Low | **Resolved** | Memberikan instruksi `cmd.exe /c` dan `RemoteSigned` di dokumentasi |

---

## 📜 Riwayat Perubahan (Changelog)

### [Versi 1.0.0] - 11 November 2026
- **Step 1 - Landing Page:**
  - Hero Section lengkap dengan trust metrics 500K+ transaksi, ilustrasi visual gaming, dan floating badges.
  - Section Tentang Kami, Katalog Layanan 6 kartu game terpopuler, Promo & Berita, Kontak CS WhatsApp & responsive Google Maps embed Cyber 2 Tower Kuningan.
  - Dark Mode interaktif dengan palet Cyber Neon (`#0a0e18` dan `#00d2ff`), toggle switch, anti-FOUC, dan persistensi `localStorage`.
- **Step 2 - User Management & Admin Dashboard:**
  - Integrasi Google Spreadsheet via Google Apps Script (`code.gs`, `setup.gs`) dan fallback JSON lokal.
  - Sistem otentikasi aman JWT `jose` httpOnly cookie & hashing `bcryptjs`.
  - Dashboard manajemen user, manajemen role, dan CRUD berita/promo dengan thumbnail upload.
- **Step 3 - Sistem Pemesanan & Pembayaran QRIS:**
  - Vektor QRIS dummy resolusi tinggi (`public/images/qris-dummy.svg`).
  - Form pemesanan dinamis dengan pilihan paket nominal, akun tujuan, dan WhatsApp.
  - Halaman tiket QRIS interaktif dengan nomor tiket unik `#VS-XXXXXXXX`, auto-refresh status realtime 10 detik, dan shortcut CS WhatsApp.
  - Halaman riwayat "Pesanan Saya" (`/orders`) dan Panel Admin Verifikasi Pesanan (`/dashboard/orders`).
- **Step 4 - Persiapan Deploy & Maintenance:**
  - Inisialisasi dokumen pemeliharaan dan checklist rilis Vercel.
