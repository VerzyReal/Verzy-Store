import { NextResponse } from "next/server";
import { clearAuthCookie, getCurrentUser } from "@/lib/auth";

export async function POST() {
  clearAuthCookie();
  return NextResponse.json({ success: true, message: "Berhasil logout" });
}

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
