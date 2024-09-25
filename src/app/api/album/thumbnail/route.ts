import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { albumId, imageId } = await req.json();
    if (!albumId || !imageId) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (!currentUser?.isAdmin) {
      return NextResponse.json(
        { error: "Access denied. Admins only." },
        { status: 403 }
      );
    }

    const album = await prisma.album.update({
      where: { id: albumId },
      data: { thumbnail: imageId },
    });

    return NextResponse.json({
      message: "Thumbnail updated successfully",
      album,
    });
  } catch (error) {
    console.error("Error setting thumbnail:", error);
    return NextResponse.json(
      { error: "Failed to set thumbnail" },
      { status: 500 }
    );
  }
}
