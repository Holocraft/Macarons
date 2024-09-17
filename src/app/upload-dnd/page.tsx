"use client";

import "@uploadthing/react/styles.css";
import { usePathname } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";

export default function UploadDnDPage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const albumId = segments[segments.length - 1];

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
              body: JSON.stringify({ albumId, imageUrls }),
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
