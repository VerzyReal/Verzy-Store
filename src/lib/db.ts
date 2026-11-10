import fs from "fs";
import path from "path";

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET;

export interface DbUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role_id: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface DbRole {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: boolean;
  created_at: string;
}

export interface DbNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: "draft" | "published";
  author_id: string;
  created_at: string;
  updated_at: string;
}

// Path penyimpanan fallback lokal
const LOCAL_DB_PATH = path.join(process.cwd(), "data", "local_db.json");

interface LocalData {
  roles: DbRole[];
  users: DbUser[];
  news: DbNews[];
}

function getInitialLocalData(): LocalData {
  const now = new Date().toISOString();
  return {
    roles: [
      {
        id: "role_admin",
        name: "admin",
        description: "Akses penuh seluruh manajemen sistem",
        permissions: "all",
        is_system: true,
        created_at: now,
      },
      {
        id: "role_user",
        name: "user",
        description: "Pengguna umum dan pemesanan game",
        permissions: "read,order",
        is_system: true,
        created_at: now,
      },
    ],
    users: [
      {
        id: "user_admin_default",
        name: "Administrator Verzy",
        email: "admin@gmail.com",
        password_hash: "$2b$10$RNMsZ27RoPtysNnABuzLnen0a0OApvrdjXgflL.rri/0dzOe48hx6",
        role_id: "admin",
        status: "active",
        created_at: now,
        updated_at: now,
      },
    ],
    news: [
      {
        id: "news_1",
        title: "Diskon Gajian: Cashback hingga 30% Top Up Mobile Legends Pakai QRIS",
        slug: "diskon-gajian-cashback-30-top-up-mlbb-qris",
        excerpt:
          "Dapatkan bonus diamond melimpah untuk persiapan gacha skin kolektor terbaru akhir bulan ini. Berlaku untuk seluruh e-wallet dan m-banking.",
        content:
          "Kabar gembira untuk seluruh pecinta Land of Dawn! Verzy Store menghadirkan promo gajian spesial diskon dan cashback hingga 30% untuk setiap transaksi top-up Diamond Mobile Legends menggunakan metode QRIS.",
        thumbnail_path: "/images/hero-illustration.png",
        status: "published",
        author_id: "user_admin_default",
        created_at: now,
        updated_at: now,
      },
      {
        id: "news_2",
        title: "Guide Meta Patch Terbaru MLBB: Hero Terbaik Push Rank Mythic Immortal",
        slug: "guide-meta-patch-terbaru-mlbb-push-rank",
        excerpt:
          "Analisis tier list hero tier S yang wajib kamu kuasai dan strategi item counter meta assassin untuk solo maupun mabar 5-man.",
        content:
          "Memasuki pertengahan season, Moonton kembali merilis penyesuaian keseimbangan hero. Dalam artikel ini, tim analis esports Verzy Store merangkum daftar hero tier SS yang mendominasi ranked match tingkat Mythic Glory hingga Immortal.",
        thumbnail_path: "/images/team-about.png",
        status: "published",
        author_id: "user_admin_default",
        created_at: now,
        updated_at: now,
      },
      {
        id: "news_3",
        title: "Verzy Championship Season 4 Resmi Dibuka: Total Prize Pool Rp 50 Juta!",
        slug: "verzy-championship-season-4-resmi-dibuka",
        excerpt:
          "Daftarkan tim esports kampus dan komunitasmu sekarang, gratis biaya pendaftaran slot terbatas dengan total hadiah puluhan juta rupiah.",
        content:
          "Sebagai wujud komitmen Verzy Store terhadap perkembangan ekosistem esports akar rumput di Indonesia, Verzy Championship Season 4 kembali digelar. Pendaftaran terbuka untuk 128 tim umum tanpa dipungut biaya pendaftaran sama sekali.",
        thumbnail_path: "/images/hero-illustration.png",
        status: "published",
        author_id: "user_admin_default",
        created_at: now,
        updated_at: now,
      },
    ],
  };
}

function readLocalDb(): LocalData {
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      const initial = getInitialLocalData();
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const content = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return getInitialLocalData();
  }
}

function writeLocalDb(data: LocalData) {
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Gagal menulis local database:", e);
  }
}

/**
 * Pemanggil utama ke Apps Script API
 */
async function callAppsScript(action: string, data?: any): Promise<any> {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("YOUR_DEPLOYMENT_ID")) {
    return null; // Gunakan fallback lokal
  }
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: APPS_SCRIPT_SECRET,
        action,
        data,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Apps Script responded with ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Apps Script call failed, falling back to local database:", err);
    return null;
  }
}

export const db = {
  // USERS
  async findUserByEmail(email: string): Promise<DbUser | null> {
    const remote = await callAppsScript("findUserByEmail", { email });
    if (remote && remote.user !== undefined) return remote.user;

    const local = readLocalDb();
    const user = local.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    return user || null;
  },

  async createUser(data: {
    name: string;
    email: string;
    password_hash: string;
    role_id?: string;
    status?: "active" | "inactive";
  }): Promise<{ success: boolean; user?: Partial<DbUser>; error?: string }> {
    const remote = await callAppsScript("createUser", data);
    if (remote) return remote;

    const local = readLocalDb();
    if (local.users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    const now = new Date().toISOString();
    const newUser: DbUser = {
      id: "user_" + Math.random().toString(36).substring(2, 10),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role_id: data.role_id || "user",
      status: data.status || "active",
      created_at: now,
      updated_at: now,
    };
    local.users.push(newUser);
    writeLocalDb(local);
    return { success: true, user: newUser };
  },

  async listUsers(): Promise<DbUser[]> {
    const remote = await callAppsScript("listUsers");
    if (remote && remote.users) return remote.users;

    const local = readLocalDb();
    return local.users.map(({ password_hash, ...u }) => ({
      ...u,
      password_hash: "",
    })) as DbUser[];
  },

  async updateUser(data: {
    id: string;
    name?: string;
    role_id?: string;
    status?: "active" | "inactive";
    password_hash?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const remote = await callAppsScript("updateUser", data);
    if (remote) return remote;

    const local = readLocalDb();
    const idx = local.users.findIndex((u) => u.id === data.id);
    if (idx === -1) return { success: false, error: "User tidak ditemukan" };

    if (data.name !== undefined) local.users[idx].name = data.name;
    if (data.role_id !== undefined) local.users[idx].role_id = data.role_id;
    if (data.status !== undefined) local.users[idx].status = data.status;
    if (data.password_hash !== undefined) local.users[idx].password_hash = data.password_hash;
    local.users[idx].updated_at = new Date().toISOString();

    writeLocalDb(local);
    return { success: true };
  },

  async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
    const remote = await callAppsScript("deleteUser", { id });
    if (remote) return remote;

    const local = readLocalDb();
    const user = local.users.find((u) => u.id === id);
    if (!user) return { success: false, error: "User tidak ditemukan" };

    // Proteksi admin terakhir
    const adminCount = local.users.filter((u) => u.role_id === "admin").length;
    if (user.role_id === "admin" && adminCount <= 1) {
      return { success: false, error: "Tidak dapat menghapus satu-satunya administrator" };
    }

    local.users = local.users.filter((u) => u.id !== id);
    writeLocalDb(local);
    return { success: true };
  },

  // ROLES
  async listRoles(): Promise<DbRole[]> {
    const remote = await callAppsScript("listRoles");
    if (remote && remote.roles) return remote.roles;

    const local = readLocalDb();
    return local.roles;
  },

  async createRole(data: {
    name: string;
    description: string;
    permissions?: string;
  }): Promise<{ success: boolean; id?: string; error?: string }> {
    const remote = await callAppsScript("createRole", data);
    if (remote) return remote;

    const local = readLocalDb();
    const id = "role_" + Math.random().toString(36).substring(2, 9);
    const newRole: DbRole = {
      id,
      name: data.name,
      description: data.description,
      permissions: data.permissions || "read",
      is_system: false,
      created_at: new Date().toISOString(),
    };
    local.roles.push(newRole);
    writeLocalDb(local);
    return { success: true, id };
  },

  async updateRole(data: {
    id: string;
    name?: string;
    description?: string;
    permissions?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const remote = await callAppsScript("updateRole", data);
    if (remote) return remote;

    const local = readLocalDb();
    const idx = local.roles.findIndex((r) => r.id === data.id);
    if (idx === -1) return { success: false, error: "Role tidak ditemukan" };
    if (local.roles[idx].is_system) {
      return { success: false, error: "Role sistem tidak dapat diubah" };
    }

    if (data.name !== undefined) local.roles[idx].name = data.name;
    if (data.description !== undefined) local.roles[idx].description = data.description;
    if (data.permissions !== undefined) local.roles[idx].permissions = data.permissions;

    writeLocalDb(local);
    return { success: true };
  },

  async deleteRole(id: string): Promise<{ success: boolean; error?: string }> {
    const remote = await callAppsScript("deleteRole", { id });
    if (remote) return remote;

    const local = readLocalDb();
    const role = local.roles.find((r) => r.id === id);
    if (!role) return { success: false, error: "Role tidak ditemukan" };
    if (role.is_system) {
      return { success: false, error: "Role sistem tidak dapat dihapus" };
    }

    local.roles = local.roles.filter((r) => r.id !== id);
    writeLocalDb(local);
    return { success: true };
  },

  // NEWS
  async listNews(statusFilter?: "draft" | "published"): Promise<DbNews[]> {
    const remote = await callAppsScript("listNews", { status: statusFilter });
    if (remote && remote.news) return remote.news;

    const local = readLocalDb();
    if (statusFilter) {
      return local.news.filter((n) => n.status === statusFilter);
    }
    return local.news;
  },

  async findNewsBySlug(slug: string): Promise<DbNews | null> {
    const remote = await callAppsScript("findNewsBySlug", { slug });
    if (remote && remote.article !== undefined) return remote.article;

    const local = readLocalDb();
    return local.news.find((n) => n.slug === slug) || null;
  },

  async createNews(data: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: string;
    thumbnail_path?: string;
    status?: "draft" | "published";
    author_id?: string;
  }): Promise<{ success: boolean; id?: string; slug?: string; error?: string }> {
    const remote = await callAppsScript("createNews", data);
    if (remote) return remote;

    const local = readLocalDb();
    const now = new Date().toISOString();
    const id = "news_" + Math.random().toString(36).substring(2, 9);
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newArticle: DbNews = {
      id,
      title: data.title,
      slug,
      excerpt: data.excerpt || "",
      content: data.content,
      thumbnail_path: data.thumbnail_path || "/images/hero-illustration.png",
      status: data.status || "draft",
      author_id: data.author_id || "user_admin_default",
      created_at: now,
      updated_at: now,
    };

    local.news.unshift(newArticle);
    writeLocalDb(local);
    return { success: true, id };
  },

  async updateNews(data: {
    id: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    thumbnail_path?: string;
    status?: "draft" | "published";
  }): Promise<{ success: boolean; error?: string }> {
    const remote = await callAppsScript("updateNews", data);
    if (remote) return remote;

    const local = readLocalDb();
    const idx = local.news.findIndex((n) => n.id === data.id);
    if (idx === -1) return { success: false, error: "Berita tidak ditemukan" };

    if (data.title !== undefined) local.news[idx].title = data.title;
    if (data.slug !== undefined) local.news[idx].slug = data.slug;
    if (data.excerpt !== undefined) local.news[idx].excerpt = data.excerpt;
    if (data.content !== undefined) local.news[idx].content = data.content;
    if (data.thumbnail_path !== undefined) local.news[idx].thumbnail_path = data.thumbnail_path;
    if (data.status !== undefined) local.news[idx].status = data.status;
    local.news[idx].updated_at = new Date().toISOString();

    writeLocalDb(local);
    return { success: true };
  },

  async deleteNews(id: string): Promise<{ success: boolean; error?: string }> {
    const remote = await callAppsScript("deleteNews", { id });
    if (remote) return remote;

    const local = readLocalDb();
    local.news = local.news.filter((n) => n.id !== id);
    writeLocalDb(local);
    return { success: true };
  },
};
