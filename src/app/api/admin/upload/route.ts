import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { saveFile } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const result = await saveFile(file, file.name);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      url: result.url,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Gagal mengunggah file: ${err.message}` },
      { status: 500 }
    );
  }
}
