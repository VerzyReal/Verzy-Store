import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status") as "draft" | "published" | null;
  const slugParam = searchParams.get("slug");

  if (slugParam) {
    const article = await db.findNewsBySlug(slugParam);
    return NextResponse.json({ article });
  }

  const currentUser = await getCurrentUser();
  // Jika bukan admin dan tidak minta filter, hanya tampilkan published
  const filter = currentUser?.role === "admin" ? (statusParam || undefined) : "published";

  const news = await db.listNews(filter);
  return NextResponse.json({ news });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const data = await request.json();
  if (!data.title || !data.content) {
    return NextResponse.json({ error: "Judul dan konten wajib diisi" }, { status: 400 });
  }

  const res = await db.createNews({
    ...data,
    author_id: currentUser.id,
  });

  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal membuat berita" }, { status: 400 });
  }

  return NextResponse.json({ success: true, id: res.id, slug: res.slug });
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const data = await request.json();
  if (!data.id) {
    return NextResponse.json({ error: "News ID required" }, { status: 400 });
  }

  const res = await db.updateNews(data);
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal memperbarui berita" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "News ID required" }, { status: 400 });
  }

  const res = await db.deleteNews(id);
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal menghapus berita" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
