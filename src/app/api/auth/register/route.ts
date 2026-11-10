import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, createSessionToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan kata sandi wajib diisi" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Kata sandi minimal harus 6 karakter" },
        { status: 400 }
      );
    }

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const result = await db.createUser({
      name,
      email,
      password_hash: hashedPassword,
      role_id: "user",
      status: "active",
    });

    if (!result.success || !result.user) {
      return NextResponse.json(
        { error: result.error || "Gagal membuat akun" },
        { status: 500 }
      );
    }

    const sessionUser = {
      id: result.user.id || "",
      name: result.user.name || name,
      email: result.user.email || email,
      role: result.user.role_id || "user",
    };

    const token = await createSessionToken(sessionUser);
    setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: sessionUser,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Terjadi kesalahan: ${err.message}` },
      { status: 500 }
    );
  }
}
