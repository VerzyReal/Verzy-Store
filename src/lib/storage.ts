import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Pastikan folder public/uploads selalu ada
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export interface SaveFileResult {
  success: boolean;
  filePath?: string;
  url?: string;
  error?: string;
}

/**
 * Menyimpan file media secara lokal ke folder public/uploads/
 * Catatan: Disk Vercel bersifat ephemeral (hanya-baca saat production).
 * Modul ini dirancang agar mudah dimigrasikan ke cloud storage (Vercel Blob, Cloudinary, S3) di Step 4.
 */
export async function saveFile(
  file: File | Blob,
  originalFilename: string
): Promise<SaveFileResult> {
  try {
    // 1. Validasi tipe file (hanya gambar umum)
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
    const ext = path.extname(originalFilename).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return {
        success: false,
        error: "Format file tidak didukung. Harap unggah file JPG, PNG, WEBP, atau SVG.",
      };
    }

    // 2. Validasi ukuran (maksimal 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length > MAX_SIZE) {
      return {
        success: false,
        error: "Ukuran file terlalu besar. Maksimal 5MB.",
      };
    }

    // 3. Generate nama file unik & aman
    const uniquePrefix = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const cleanName = path.basename(originalFilename, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const safeFilename = `${uniquePrefix}_${cleanName}${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, safeFilename);

    // 4. Simpan ke disk
    await fs.promises.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    return {
      success: true,
      filePath: destinationPath,
      url: publicUrl,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Gagal menyimpan file: ${err.message}`,
    };
  }
}

/**
 * Menghapus file lokal bila ada
 */
export async function deleteFile(publicUrl: string): Promise<boolean> {
  try {
    if (!publicUrl.startsWith("/uploads/")) {
      return false; // Jangan hapus file di luar uploads (misal /images/...)
    }
    const filename = path.basename(publicUrl);
    const fullPath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
