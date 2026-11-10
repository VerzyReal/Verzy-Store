import { db } from "../src/lib/db.ts";
import { comparePassword, hashPassword } from "../src/lib/auth.ts";

async function runTests() {
  console.log("=== MEMULAI TEST VERIFIKASI STEP 2 ===");

  // 1. Uji Akun Admin Default
  console.log("\n1. Menguji Akun Admin Default...");
  const admin = await db.findUserByEmail("admin@gmail.com");
  if (!admin) throw new Error("Admin default admin@gmail.com tidak ditemukan!");
  console.log("✓ Admin ditemukan:", admin.email, "Role:", admin.role_id);

  // 2. Uji Verifikasi Password Hash Admin (123456)
  console.log("\n2. Menguji Hash Password Admin...");
  const isMatch = await comparePassword("123456", admin.password_hash);
  if (!isMatch) throw new Error("Hash password admin tidak cocok dengan '123456'!");
  console.log("✓ Password '123456' valid cocok dengan hash bcrypt.");

  // Password salah harus ditolak
  const wrongMatch = await comparePassword("wrongpass", admin.password_hash);
  if (wrongMatch) throw new Error("Password salah seharusnya ditolak!");
  console.log("✓ Password salah berhasil ditolak.");

  // 3. Uji Registrasi User Baru
  console.log("\n3. Menguji Registrasi User Baru...");
  const testEmail = `user_test_${Date.now()}@gmail.com`;
  const hashedPass = await hashPassword("password123");
  const createResult = await db.createUser({
    name: "User Penguji",
    email: testEmail,
    password_hash: hashedPass,
    role_id: "user",
    status: "active",
  });
  if (!createResult.success) throw new Error("Gagal membuat user baru: " + createResult.error);
  console.log("✓ User baru berhasil dibuat dengan role:", createResult.user.role_id);
  if (createResult.user.role_id !== "user") throw new Error("Role pendaftar harus 'user'!");

  // Duplikasi email harus ditolak
  const dupResult = await db.createUser({
    name: "User Duplikat",
    email: testEmail,
    password_hash: hashedPass,
    role_id: "user",
  });
  if (dupResult.success) throw new Error("Duplikasi email seharusnya ditolak!");
  console.log("✓ Duplikasi email berhasil dicegah:", dupResult.error);

  // 4. Uji Manajemen Role
  console.log("\n4. Menguji Manajemen Role...");
  const roles = await db.listRoles();
  const adminRole = roles.find((r) => r.name === "admin");
  const userRole = roles.find((r) => r.name === "user");
  if (!adminRole || !adminRole.is_system) throw new Error("Role admin sistem tidak valid!");
  if (!userRole || !userRole.is_system) throw new Error("Role user sistem tidak valid!");
  console.log("✓ Role sistem bawaan (admin, user) aman terproteksi (is_system = true).");

  // Buat custom role
  const customRoleRes = await db.createRole({
    name: "moderator",
    description: "Moderator turnamen esports",
    permissions: "read,news_crud",
  });
  if (!customRoleRes.success) throw new Error("Gagal membuat role kustom!");
  console.log("✓ Role kustom 'moderator' berhasil dibuat.");

  // 5. Uji CRUD Berita
  console.log("\n5. Menguji CRUD Berita...");
  const initialNews = await db.listNews();
  console.log("✓ Jumlah berita awal:", initialNews.length);

  const createNewsRes = await db.createNews({
    title: "Event Flash Sale Spesial MLBB Verzy Store",
    excerpt: "Diskon diamond 40% khusus weekend ini.",
    content: "Dapatkan promo potongan harga diamond terbesar sepanjang tahun.",
    thumbnail_path: "/uploads/test-banner.webp",
    status: "published",
    author_id: admin.id,
  });
  if (!createNewsRes.success) throw new Error("Gagal membuat artikel berita!");
  console.log("✓ Artikel berita baru berhasil diterbitkan dengan id:", createNewsRes.id);

  // Update berita
  const updateNewsRes = await db.updateNews({
    id: createNewsRes.id,
    title: "Event Flash Sale MLBB Verzy Store (Diperbarui)",
  });
  if (!updateNewsRes.success) throw new Error("Gagal update berita!");
  console.log("✓ Artikel berita berhasil diperbarui.");

  // Hapus berita uji coba
  const deleteNewsRes = await db.deleteNews(createNewsRes.id);
  if (!deleteNewsRes.success) throw new Error("Gagal hapus berita!");
  console.log("✓ Artikel berita uji coba berhasil dibersihkan.");

  console.log("\n=== SEMUA PENGUJIAN STEP 2 BERHASIL 100%! ===");
}

runTests().catch((err) => {
  console.error("\n❌ TEST GAGAL:", err);
  process.exit(1);
});
