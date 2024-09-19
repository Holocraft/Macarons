"use server";

import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import paths from "@/paths";
import sanitizeInput from "@/utils/sanitize-html";

const createPostSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().min(10).max(500),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createAlbum(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await getServerSession(options);
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to post"],
      },
    };
  }

  let post;
  try {
    const sanitizedTitle = sanitizeInput(result.data.title);
    const sanitizedDescription = sanitizeInput(result.data.description);
    post = await prisma.album.create({
      data: {
        title: sanitizedTitle,
        description: sanitizedDescription,
        userId: session.user.email,
        userName: session.user.name,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create album"],
        },
      };
    }
  }
  redirect(paths.photos());
  return {
    errors: {}, // Return an empty errors object
  };
}
