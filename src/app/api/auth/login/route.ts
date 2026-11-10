import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, createSessionToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan kata sandi wajib diisi" },
        { status: 400 }
      );
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Email atau kata sandi tidak cocok" },
        { status: 401 }
      );
    }

    if (user.status === "inactive") {
      return NextResponse.json(
        { error: "Akun Anda dinonaktifkan. Silakan hubungi admin." },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Email atau kata sandi tidak cocok" },
        { status: 401 }
      );
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
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
