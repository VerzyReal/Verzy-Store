import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const roles = await db.listRoles();
  return NextResponse.json({ roles });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name, description, permissions } = await request.json();
  if (!name) {
    return NextResponse.json({ error: "Nama role wajib diisi" }, { status: 400 });
  }

  const res = await db.createRole({ name, description, permissions });
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal membuat role" }, { status: 400 });
  }

  return NextResponse.json({ success: true, id: res.id });
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const data = await request.json();
  if (!data.id) {
    return NextResponse.json({ error: "Role ID required" }, { status: 400 });
  }

  const res = await db.updateRole(data);
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal mengubah role" }, { status: 400 });
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
    return NextResponse.json({ error: "Role ID required" }, { status: 400 });
  }

  const res = await db.deleteRole(id);
  if (!res.success) {
    return NextResponse.json({ error: res.error || "Gagal menghapus role" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
