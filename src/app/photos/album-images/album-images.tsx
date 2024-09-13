"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "@/components/lightbox-image";

export default function AlbumImages({ album }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='album-images-container'>
      {album?.images?.map((image) => {
        return (
          <div
            className='album-image'
            key={image.url}
            onClick={() => setOpen(true)}
          >
            <Image
              src={image.url}
              alt='image'
              fill
              sizes='(max-width: 768px) 100vw (max-width: 1200px) 50vw, 33vw'
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      })}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={album?.images?.map((photo) => ({ src: photo.url }))}
        render={{ slide: NextJsImage }}
      />
    </div>
  );
}
