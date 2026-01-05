import { NextResponse } from "next/server";
import { buildFolderPath, getAuthUser } from "../../_services";

export async function GET(req: Request) {
  try {
    const { id: userId } = await getAuthUser();

    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId");

    if (!folderId || isNaN(Number(folderId))) {
      return NextResponse.json({ success: false, path: [] });
    }

    const path = await buildFolderPath(Number(folderId), userId);

    return NextResponse.json({ success: true, path });
  } catch {
    return NextResponse.json({ success: false, path: [] }, { status: 401 });
  }
}
