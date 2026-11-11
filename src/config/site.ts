export interface GameService {
  id: string;
  name: string;
  category: "mobile" | "pc" | "voucher";
  tag: string;
  tagColor?: string;
  description: string;
  startingPrice: string;
  image: string;
  popular?: boolean;
}

export interface TopUpPackage {
  id: string;
  name: string;
  price: number;
  bonus?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  tag: string;
  date: string;
  excerpt: string;
  content: string;
  thumbnail: string;
}

export const siteConfig = {
  name: "Verzy Store",
  legalName: "PT Verzy Digital Media",
  slogan: "Platform Top-Up #1 Gamers Indonesia",
  headline: "Top Up Game Cepat, Hemat, & 100% Legal",
  description:
    "Solusi instan isi ulang diamond, voucher game favorit, dan item digital dalam hitungan detik dengan metode pembayaran terlengkap 24/7.",
  aboutStory:
    "Verzy Store lahir dari komunitas gamer yang mengutamakan kecepatan transaksi otomatis, keamanan akun pelanggan, dan harga paling ramah di kantong pelajar hingga pro player esports di seluruh Nusantara.",
  foundedYear: "2021",
  stats: [
    { label: "Transaksi Berhasil", value: "500K+" },
    { label: "Kecepatan Pengiriman", value: "3-15 dtk" },
    { label: "Kepuasan Pelanggan", value: "4.9 / 5.0" },
  ],
  logo: "/images/logo.jpg",
  heroIllustration: "/images/hero-illustration.png",
  aboutImage: "/images/team-about.png",
  contact: {
    phone: "+62 812-9988-7722",
    whatsapp: "+62 812-9988-7722",
    whatsappUrl: "https://wa.me/6281299887722",
    email: "support@verzystore.id",
    office: "Cyber 2 Tower Lt. 18, Jl. H. R. Rasuna Said, Kuningan Barat, Jakarta Selatan 12950",
    hours: "Jam CS Aktif: 08.00 - 23.00 WIB (Sistem 24 Jam Otomatis)",
    googleMapsUrl: "https://maps.app.goo.gl/hpJeqcMT7P4XfJua8",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=Cyber%202%20Tower%2C%20Jl.%20H.%20R.%20Rasuna%20Said%2C%20Kuningan%20Barat%2C%20Jakarta%20Selatan&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  socials: {
    instagram: "https://instagram.com/verzystore.id",
    tiktok: "https://tiktok.com/@verzystore.id",
    discord: "https://discord.gg/verzystore",
    whatsapp: "https://wa.me/6281299887722",
  },
  navigation: [
    { name: "Beranda", href: "#beranda" },
    { name: "Tentang Kami", href: "#tentang-kami" },
    { name: "Layanan & Game", href: "#layanan" },
    { name: "Berita & Promo", href: "#promo" },
    { name: "Kontak", href: "#kontak" },
  ],
  strengths: [
    {
      icon: "Zap",
      title: "Instant Delivery Otomatis",
      description:
        "Diamond & item langsung masuk akun dalam 3–15 detik tanpa antre manual berkat integrasi API cloud gaming berkecepatan tinggi.",
    },
    {
      icon: "ShieldCheck",
      title: "100% Legal & Resmi",
      description:
        "Seluruh voucher bersumber langsung dari publisher resmi (Moonton, Garena, Riot Games, Hoyoverse). Bebas banned permanen dan aman selamanya.",
    },
    {
      icon: "Headphones",
      title: "Layanan Siaga 24/7",
      description:
        "Customer support gamer berpengalaman siap memandu melalui WhatsApp dan Discord kapan saja saat kamu membutuhkan bantuan.",
    },
  ],
  games: [
    {
      id: "mlbb",
      name: "Mobile Legends: Bang Bang",
      category: "mobile",
      tag: "Terpopuler",
      description:
        "Top up Diamond, Weekly Diamond Pass, dan Twilight Pass termurah proses instan masuk langsung ke User ID.",
      startingPrice: "Rp 1.500",
      image: "/images/mlbb.png",
      popular: true,
    },
    {
      id: "ff",
      name: "Free Fire & FF MAX",
      category: "mobile",
      tag: "Flash Sale",
      description:
        "Diamond resmi Garena FF dengan bonus event mingguan dan membership bulanan langsung via nomor ID karakter.",
      startingPrice: "Rp 1.000",
      image: "/images/ff.png",
      popular: true,
    },
    {
      id: "pubg",
      name: "PUBG Mobile & HoK",
      category: "mobile",
      tag: "Otomatis UID",
      description:
        "Unknown Cash (UC) PUBG dan Tokens Honor of Kings resmi langsung masuk UID tanpa perlu password atau login akun.",
      startingPrice: "Rp 12.000",
      image: "/images/pubg.png",
      popular: true,
    },
    {
      id: "genshin",
      name: "Genshin Impact & Star Rail",
      category: "mobile",
      tag: "Legal Hoyo",
      description:
        "Genesis Crystal, Oneiric Shards, Blessing of the Welkin Moon, dan Express Supply Pass via UID server resmi.",
      startingPrice: "Rp 14.500",
      image: "/images/genshin.png",
    },
    {
      id: "valorant",
      name: "Valorant & Steam Wallet",
      category: "pc",
      tag: "PC Gaming",
      description:
        "Redeem code instan untuk VP Riot Games dan voucher saldo Steam IDR resmi tanpa biaya tersembunyi.",
      startingPrice: "Rp 15.000",
      image: "/images/valorant.png",
    },
    {
      id: "voucher",
      name: "Voucher Digital & Hiburan",
      category: "voucher",
      tag: "Entertainment",
      description:
        "Saldo Google Play, PlayStation Store Gift Card, Discord Nitro, dan voucher Spotify Premium dengan harga agen.",
      startingPrice: "Rp 10.000",
      image: "/images/voucher.png",
    },
  ] as GameService[],
  articles: [
    {
      id: "1",
      slug: "diskon-gajian-cashback-30-top-up-mlbb-qris",
      tag: "Promo Spesial",
      date: "24 Oktober 2026",
      title: "Diskon Gajian: Cashback hingga 30% Top Up Mobile Legends Pakai QRIS",
      excerpt:
        "Dapatkan bonus diamond melimpah untuk persiapan gacha skin kolektor terbaru akhir bulan ini. Berlaku untuk seluruh e-wallet dan m-banking.",
      content:
        "Kabar gembira untuk seluruh pecinta Land of Dawn! Verzy Store menghadirkan promo gajian spesial diskon dan cashback hingga 30% untuk setiap transaksi top-up Diamond Mobile Legends menggunakan metode QRIS. Promo ini berlaku untuk pembelian denominasi mulai dari Weekly Diamond Pass hingga 5000+ Diamonds. Pastikan ID dan Server Zone Anda sudah benar saat transaksi.",
      thumbnail: "/images/hero-illustration.png",
    },
    {
      id: "2",
      slug: "guide-meta-patch-terbaru-mlbb-push-rank",
      tag: "Update Game",
      date: "21 Oktober 2026",
      title: "Guide Meta Patch Terbaru MLBB: Hero Terbaik Push Rank Mythic Immortal",
      excerpt:
        "Analisis tier list hero tier S yang wajib kamu kuasai dan strategi item counter meta assassin untuk solo maupun mabar 5-man.",
      content:
        "Memasuki pertengahan season, Moonton kembali merilis penyesuaian keseimbangan hero. Dalam artikel ini, tim analis esports Verzy Store merangkum daftar hero tier SS yang mendominasi ranked match tingkat Mythic Glory hingga Immortal, beserta panduan build item paling efektif.",
      thumbnail: "/images/team-about.png",
    },
    {
      id: "3",
      slug: "verzy-championship-season-4-resmi-dibuka",
      tag: "Komunitas",
      date: "18 Oktober 2026",
      title: "Verzy Championship Season 4 Resmi Dibuka: Total Prize Pool Rp 50 Juta!",
      excerpt:
        "Daftarkan tim esports kampus dan komunitasmu sekarang, gratis biaya pendaftaran slot terbatas dengan total hadiah puluhan juta rupiah.",
      content:
        "Sebagai wujud komitmen Verzy Store terhadap perkembangan ekosistem esports akar rumput di Indonesia, Verzy Championship Season 4 kembali digelar. Pendaftaran terbuka untuk 128 tim umum tanpa dipungut biaya pendaftaran sama sekali. Saksikan pertandingan seru yang disiarkan langsung di YouTube dan TikTok resmi Verzy Store.",
      thumbnail: "/images/hero-illustration.png",
    },
  ] as NewsArticle[],
  gamePackages: {
    mlbb: [
      { id: "mlbb_86", name: "86 Diamonds", price: 21000 },
      { id: "mlbb_172", name: "172 Diamonds", price: 42000 },
      { id: "mlbb_257", name: "257 Diamonds", price: 63000, bonus: "Best Seller" },
      { id: "mlbb_706", name: "706 Diamonds", price: 170000, bonus: "+64 Bonus" },
      { id: "mlbb_wdp", name: "Weekly Diamond Pass", price: 27500, bonus: "Hemat 60%" },
      { id: "mlbb_twilight", name: "Twilight Pass", price: 145000 },
    ],
    ff: [
      { id: "ff_70", name: "70 Diamonds", price: 10000 },
      { id: "ff_140", name: "140 Diamonds", price: 20000 },
      { id: "ff_355", name: "355 Diamonds", price: 50000, bonus: "Populer" },
      { id: "ff_720", name: "720 Diamonds", price: 100000 },
      { id: "ff_membership", name: "Membership Mingguan", price: 30000 },
    ],
    pubg: [
      { id: "pubg_60", name: "60 UC", price: 15000 },
      { id: "pubg_325", name: "325 UC", price: 75000, bonus: "Diskon 5%" },
      { id: "pubg_660", name: "660 UC", price: 150000 },
      { id: "pubg_1800", name: "1800 UC", price: 380000 },
    ],
    genshin: [
      { id: "genshin_60", name: "60 Genesis Crystals", price: 16500 },
      { id: "genshin_300", name: "300+30 Genesis Crystals", price: 79000 },
      { id: "genshin_welkin", name: "Blessing of the Welkin Moon", price: 79000, bonus: "Best Value" },
      { id: "genshin_980", name: "980+110 Genesis Crystals", price: 245000 },
    ],
    valorant: [
      { id: "val_475", name: "475 VP Riot Games", price: 50000 },
      { id: "val_1000", name: "1000 VP Riot Games", price: 100000, bonus: "Populer" },
      { id: "steam_60k", name: "Steam Wallet IDR 60.000", price: 65000 },
      { id: "steam_120k", name: "Steam Wallet IDR 120.000", price: 128000 },
    ],
    voucher: [
      { id: "gplay_50", name: "Google Play IDR 50.000", price: 52000 },
      { id: "gplay_100", name: "Google Play IDR 100.000", price: 103000 },
      { id: "discord_nitro", name: "Discord Nitro 1 Bulan", price: 140000 },
      { id: "spotify_1m", name: "Spotify Premium 1 Bulan", price: 55000 },
    ],
  } as Record<string, TopUpPackage[]>,
};

