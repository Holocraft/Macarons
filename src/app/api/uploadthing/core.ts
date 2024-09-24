import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTFiles } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const f = createUploadthing();

const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 50,
    },
  })
    .middleware(async ({ req, files }) => {
      // This code runs on your server before upload
      const session = await getServerSession(options);
      const user = await session?.user;

      if (!user) throw new UploadThingError("Unauthorized");

      const invalidFiles = files.filter(
        (file) => !allowedFileTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        throw new UploadThingError(
          "Invalid file type. Only JPEG, PNG, and WEBP are allowed. Please refresh the page and try again."
        );
      }

      const fileOverrides = files.map((file) => {
        return { ...file };
      });

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.email, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
