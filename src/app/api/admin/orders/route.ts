import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status") || undefined;

  const orders = await db.listAllOrders(statusFilter);
  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id, status, rejection_reason } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "ID dan status pesanan wajib diisi" }, { status: 400 });
  }

  if (
    status !== "menunggu_konfirmasi" &&
    status !== "dikonfirmasi" &&
    status !== "dibatalkan"
  ) {
    return NextResponse.json({ error: "Status pesanan tidak valid" }, { status: 400 });
  }

  const result = await db.updateOrderStatus({
    id,
    status,
    rejection_reason,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error || "Gagal mengubah status" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: `Status pesanan diubah ke ${status}` });
}

