import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const users = await db.listUsers();
  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const data = await request.json();
  if (!data.id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  // Admin tidak bisa menonaktifkan dirinya sendiri
  if (data.id === currentUser.id && data.status === "inactive") {
    return NextResponse.json(
      { error: "Anda tidak dapat menonaktifkan akun sendiri" },
      { status: 400 }
    );
  }

  const res = await db.updateUser(data);
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal memperbarui user" }, { status: 400 });
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
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  // Admin tidak bisa menghapus dirinya sendiri
  if (id === currentUser.id) {
    return NextResponse.json(
      { error: "Anda tidak dapat menghapus akun Anda sendiri" },
      { status: 400 }
    );
  }

  const res = await db.deleteUser(id);
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal menghapus user" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
