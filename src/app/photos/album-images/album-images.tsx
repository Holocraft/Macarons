"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "@/components/lightbox-image";
import Button from "@/components/button/button";
import ConfirmationModal from "@/components/confirmation-modal/confirmation-modal";

export default function AlbumImages({ album, session }) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(album?.images || []);
  const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = (index: number) => {
    setOpen(true);
    setIndex(index);
  };

  const handleDelete = async (imageId: string) => {
    try {
      const res = await fetch(`/api/album/images?path=/photos/${album.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId, albumId: album.id }),
      });

      if (res.ok) {
        setImages(images.filter((image) => image.id !== imageId));
        setShowModal(false);
        router.refresh();
      } else {
        console.error("Failed to delete image", await res.text());
      }
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const confirmDelete = (imageId: string) => {
    setImageIdToDelete(imageId);
    setShowModal(true);
  };

  return (
    <div className='album-images-container'>
      {album?.images?.map((image, index: number) => {
        return (
          <div className='album-image' key={image.url}>
            <Image
              src={image.url}
              alt='image'
              fill
              sizes='(max-width: 768px) 100vw (max-width: 1200px) 50vw, 33vw'
              style={{ objectFit: "cover" }}
              onClick={() => handleClick(index)}
            />
            {session?.user?.id === image.userId ? (
              <>
                <Button
                  buttonStyle='btn delete delete-image-button'
                  onClick={() => confirmDelete(image.id)}
                >
                  Delete
                </Button>
              </>
            ) : null}
          </div>
        );
      })}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={album?.images?.map((photo) => ({ src: photo.url }))}
        render={{ slide: NextJsImage }}
        index={index}
      />
      {showModal && (
        <ConfirmationModal
          title='Are you sure you want to delete this image?'
          buttonText='Delete'
          cancel={() => setShowModal(false)}
          onClick={() => imageIdToDelete && handleDelete(imageIdToDelete)}
        />
      )}
    </div>
  );
}
