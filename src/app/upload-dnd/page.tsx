"use client";

import "@uploadthing/react/styles.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";

export default function UploadDnDPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const albumId = segments[segments.length - 1];
  const userId = session?.user?.id;
  const router = useRouter();

  return (
    <>
      <UploadDropzone
        className='upload-container'
        endpoint='imageUploader'
        onClientUploadComplete={async (res) => {
          if (res) {
            const imageUrls = res.map((file) => file.url);

            await fetch(`/api/album/images?path=/photos/${albumId}`, {
              method: "POST",
              body: JSON.stringify({ albumId, imageUrls, userId }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            router.refresh();
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
