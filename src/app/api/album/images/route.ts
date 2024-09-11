import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { albumId, imageUrls } = body;
    console.log("🚀 ~ POST ~ req.body:", body);
    if (!albumId || !imageUrls) {
      return new Response(JSON.stringify({ message: "Missing data" }), {
        status: 400,
      });
    }

    // Save the images to the database
    const images = await prisma.image.createMany({
      data: imageUrls?.map((url: string) => ({
        url,
        albumId, // Associate the image with the album
      })),
    });

    return new Response(
      JSON.stringify({ message: "Images saved successfully", images }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving images:", error);
    return new Response(JSON.stringify({ error: "Failed to save images" }), {
      status: 500,
    });
  }
}
