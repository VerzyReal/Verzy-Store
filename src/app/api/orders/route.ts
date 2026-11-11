import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: "Harap masuk/login terlebih dahulu untuk melihat pesanan Anda." },
      { status: 401 }
    );
  }

  const orders = await db.listUserOrders(currentUser.id);
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Harap login terlebih dahulu untuk membuat pesanan." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      game_id,
      game_name,
      item_name,
      price,
      user_game_id,
      zone_id,
      nickname,
      whatsapp,
    } = body;

    // Validasi Keamanan & Input
    if (!game_id || !game_name || !item_name) {
      return NextResponse.json({ error: "Data produk game tidak lengkap." }, { status: 400 });
    }

    if (!user_game_id || user_game_id.trim().length === 0) {
      return NextResponse.json({ error: "User ID Game wajib diisi." }, { status: 400 });
    }

    if (!whatsapp || whatsapp.trim().length < 8) {
      return NextResponse.json(
        { error: "Nomor WhatsApp aktif wajib diisi (minimal 8 digit)." },
        { status: 400 }
      );
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json({ error: "Nominal harga tidak valid." }, { status: 400 });
    }

    const result = await db.createOrder({
      user_id: currentUser.id,
      game_id,
      game_name,
      item_name,
      price: numericPrice,
      user_game_id: user_game_id.trim(),
      zone_id: zone_id ? zone_id.trim() : "",
      nickname: nickname ? nickname.trim() : "",
      whatsapp: whatsapp.trim(),
    });

    if (!result.success || !result.order) {
      return NextResponse.json(
        { error: result.error || "Gagal membuat pesanan." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: result.order,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Terjadi kesalahan server: ${err.message}` },
      { status: 500 }
    );
  }
}

