"use client";

import { useState } from "react";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { UploadDropzone } from "@/utils/uploadthing";

export default function UploadDnDPage() {
  const [images, setImages] = useState<{ url: string; key: string }[]>([]);

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
        onClientUploadComplete={(res) => {
          console.log("🚀 ~ onClientUploadComplete ~ res:", res);
          if (res) {
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
