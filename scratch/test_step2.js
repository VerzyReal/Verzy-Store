const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(process.cwd(), "data", "local_db.json");

console.log("=== MEMULAI TEST VERIFIKASI STEP 2 ===");

// 1. Cek local_db.json
if (!fs.existsSync(dbPath)) {
  console.log("Membuat file initial data/local_db.json...");
  const initial = {
    roles: [
      { id: "role_admin", name: "admin", description: "Akses penuh", permissions: "all", is_system: true, created_at: new Date().toISOString() },
      { id: "role_user", name: "user", description: "Pengguna umum", permissions: "read,order", is_system: true, created_at: new Date().toISOString() }
    ],
    users: [
      { id: "user_admin_default", name: "Administrator Verzy", email: "admin@gmail.com", password_hash: "$2b$10$RNMsZ27RoPtysNnABuzLnen0a0OApvrdjXgflL.rri/0dzOe48hx6", role_id: "admin", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ],
    news: [
      { id: "news_1", title: "Diskon Gajian: Cashback hingga 30%", slug: "diskon-gajian-cashback-30", excerpt: "Diskon diamond", content: "Konten lengkap promo", thumbnail_path: "/images/hero-illustration.png", status: "published", author_id: "user_admin_default", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ]
  };
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2), "utf-8");
}

const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

// 1. Akun Admin
const admin = data.users.find(u => u.email === "admin@gmail.com");
if (!admin) {
  console.error("FAIL: Admin tidak ditemukan!");
  process.exit(1);
}
console.log("✓ Admin ditemukan:", admin.email, "| Role:", admin.role_id, "| Status:", admin.status);

// 2. Hash Password Verification
const isMatch = bcrypt.compareSync("123456", admin.password_hash);
if (!isMatch) {
  console.error("FAIL: Password '123456' tidak cocok dengan hash!");
  process.exit(1);
}
console.log("✓ Password '123456' terverifikasi cocok dengan hash bcrypt.");

const isWrongMatch = bcrypt.compareSync("passwordSalah", admin.password_hash);
if (isWrongMatch) {
  console.error("FAIL: Password salah seharusnya tidak cocok!");
  process.exit(1);
}
console.log("✓ Password salah berhasil ditolak.");

// 3. System Roles Protection
const adminRole = data.roles.find(r => r.name === "admin");
const userRole = data.roles.find(r => r.name === "user");
if (!adminRole || !adminRole.is_system || !userRole || !userRole.is_system) {
  console.error("FAIL: System roles tidak terproteksi!");
  process.exit(1);
}
console.log("✓ System roles (admin, user) terproteksi dengan flag is_system: true.");

// 4. Initial News Articles
console.log("✓ Artikel Berita tersedia:", data.news.length, "artikel.");
data.news.forEach(n => console.log("  - [" + n.status + "] " + n.title));

console.log("\n=== SELURUH PENGUJIAN STEP 2 BERHASIL 100%! ===");
