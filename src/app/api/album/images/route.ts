import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export const revalidate = true;

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  try {
    const body = await req.json();
    const { albumId, imageUrls, userId } = body;
    if (!albumId || !imageUrls) {
      return NextResponse.json(
        { message: "Missing data" },
        {
          status: 400,
        }
      );
    }

    const images = await prisma.image.createMany({
      data: imageUrls?.map((url: string) => ({
        url,
        albumId,
        userId,
      })),
    });

    if (path) {
      revalidatePath(path);
      return Response.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json(
      { message: "Images saved successfully", images },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving images:", error);
    return NextResponse.json(
      { error: "Failed to save images" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  try {
    const body = await req.json();
    const { imageId, albumId } = body;

    if (!imageId || !albumId) {
      return NextResponse.json(
        { message: "Missing data" },
        {
          status: 400,
        }
      );
    }

    console.log("Revalidating path:", path);
    console.log("Deleting image:", imageId, "from album:", albumId);

    // Delete the image from the database
    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
      return Response.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json(
      { message: "Image deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      {
        status: 500,
      }
    );
  }
}
