import paths from "@/paths";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

type AlbumImageProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  images: [];
  createdAt: Date;
  userName: string;
};

export default function AlbumCard({
  id,
  title,
  description,
  image,
  images,
  createdAt,
  userName,
}: AlbumImageProps) {
  return (
    <Link href={`${paths.photos()}/${id}`} className='album-card-link'>
      <div className='album-card-container'>
        <div className='image-container'>
          <Image
            src={image}
            alt='album image'
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className='title-wrapper'>
          <h3 className='album-card-title'>{title}</h3>
          <div className='photo-count'>
            <FontAwesomeIcon icon={faCamera} />
            <p>{`${
              images?.length > 1
                ? `${images?.length} photos`
                : `${images?.length} photo`
            }`}</p>
          </div>
          <p className='album-card-info'>{`Posted by: ${userName} on ${createdAt.toLocaleDateString(
            "en-US"
          )}`}</p>
        </div>
      </div>
    </Link>
  );
}
