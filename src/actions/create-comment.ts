"use server";

import prisma from "../../lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import paths from "@/paths";
import sanitizeInput from "@/utils/sanitize-html";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  comment: z.string().min(4).max(500),
  albumId: z.string(),
});

interface CreateCommentFormState {
  errors: {
    comment?: string[];
    _form?: string[];
  };
}

export async function createComment(
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const session = await getServerSession(options);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });

  if (!user) {
    return {
      errors: {
        _form: ["User not found"],
      },
    };
  }
  const result = createPostSchema.safeParse({
    comment: formData.get("comment"),
    albumId: formData.get("albumId"),
  });
  console.log("🚀 ~ result:", result);

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
    const sanitizedComment = sanitizeInput(result.data.comment);
    post = await prisma.comment.create({
      data: {
        content: sanitizedComment,
        albumId: result.data.albumId,
        authorId: user.id,
        // author: user.name,
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
          _form: ["Failed to create comment"],
        },
      };
    }
  }
  revalidatePath(paths.album(result.data.albumId));
  return {
    errors: {},
  };
}
