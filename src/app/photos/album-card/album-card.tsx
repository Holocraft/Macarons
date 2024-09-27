import prisma from "../../../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import paths from "@/paths";
import placeholderImage from "../../../../public/placeholder.jpg";

type AlbumImageProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  images: [];
  createdAt: Date;
  userName: string;
};

export default async function AlbumCard({
  id,
  title,
  image,
  images,
  createdAt,
  userName,
}: AlbumImageProps) {
  const comments = await prisma.comment.findMany({
    where: {
      albumId: id,
    },
    include: {
      author: true,
    },
  });

  return (
    <Link href={`${paths.photos()}/${id}`} className='album-card-link'>
      <div className='album-card-container'>
        <div className='image-container'>
          <Image
            src={image || placeholderImage}
            alt='album image'
            fill
            style={{ objectFit: "cover" }}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='title-wrapper'>
          <h3 className='album-card-title'>{title}</h3>
          <div className='count-wrapper'>
            <div className='photo-count'>
              <FontAwesomeIcon icon={faCamera} />
              <p>{`${
                images?.length > 1 || images?.length === 0
                  ? `${images?.length} photos`
                  : `${images?.length} photo`
              }`}</p>
            </div>
            {comments && (
              <div className='comment-count'>
                <FontAwesomeIcon icon={faComment} />
                <p>{`${
                  comments?.length > 1 || comments?.length === 0
                    ? `${comments?.length} comments`
                    : `${comments?.length} comment`
                }`}</p>
              </div>
            )}
          </div>
          <p className='album-card-info'>{`Posted by: ${userName} on ${createdAt.toLocaleDateString(
            "en-US"
          )}`}</p>
        </div>
      </div>
    </Link>
  );
}
