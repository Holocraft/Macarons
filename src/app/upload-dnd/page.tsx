"use client";

import "@uploadthing/react/styles.css";
import { usePathname } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";

export default function UploadDnDPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const albumId = segments[segments.length - 1];
  const userId = session?.user?.id;

  return (
    <>
      <UploadDropzone
        className='upload-container'
        endpoint='imageUploader'
        onClientUploadComplete={async (res) => {
          if (res) {
            const imageUrls = res.map((file) => file.url);

            await fetch("/api/album/images", {
              method: "POST",
              body: JSON.stringify({ albumId, imageUrls, userId }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
