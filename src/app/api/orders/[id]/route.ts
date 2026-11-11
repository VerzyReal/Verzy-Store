import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderId = params.id;
  const order = await db.getOrderById(orderId);

  if (!order) {
    return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
  }

  // Pengguna hanya boleh melihat pesanan miliknya, kecuali admin
  if (order.user_id !== currentUser.id && currentUser.role !== "admin") {
    return NextResponse.json(
      { error: "Akses ditolak: Anda tidak memiliki akses ke tiket pesanan ini" },
      { status: 403 }
    );
  }

  return NextResponse.json({ order });
}

