import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.AUTH_SECRET || "verzy-super-secure-secret-key-32chars-min!";
const ENCODED_SECRET = new TextEncoder().encode(SECRET_KEY);
export const AUTH_COOKIE_NAME = "verzy_auth_token";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Hash password menggunakan bcryptjs (salt rounds: 10)
 */
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

/**
 * Verifikasi kecocokan password dengan hash tersimpan
 */
export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

/**
 * Membuat JWT signed token dengan masa berlaku 7 hari
 */
export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_SECRET);
}

/**
 * Memverifikasi JWT token
 */
export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, ENCODED_SECRET);
    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Mendapatkan user sesi saat ini dari cookie httpOnly
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Menyimpan token sesi ke cookie httpOnly yang aman
 */
export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
}

/**
 * Menghapus cookie auth (logout)
 */
export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
