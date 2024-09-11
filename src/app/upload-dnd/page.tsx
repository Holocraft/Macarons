"use client";

import { useState } from "react";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";

export default function UploadDnDPage() {
  const [images, setImages] = useState<{ url: string; key: string }[]>([]);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const albumId = segments[segments.length - 1];

  const title = images.length ? (
    <>
      <p>Upload complete!</p>
      <p>{images.length} files</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      <ul>
        {images?.map((image) => (
          <li key={image.url}>
            <Link href={image.url.toString()} target='_blank'>
              {image.url}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

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
            setImages(res);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
    </>
  );
}
