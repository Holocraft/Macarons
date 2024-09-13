"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "@/components/lightbox-image";

export default function AlbumImages({ album }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

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
              width={300}
              height={300}
              style={{ objectFit: "contain" }}
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
