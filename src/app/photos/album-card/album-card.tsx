import paths from "@/paths";
import Image from "next/image";
import Link from "next/link";

type AlbumImageProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  userName: string;
};

export default function AlbumCard({
  id,
  title,
  description,
  image,
  createdAt,
  userName,
}: AlbumImageProps) {
  return (
    <Link href={`${paths.photos()}/${id}`} className='album-card-link'>
      <div className='album-card-container'>
        <Image src={image} alt='album image' width={300} height={200} />
        <div className='title-wrapper'>
          <h3 className='album-card-title'>{title}</h3>
          <p className='album-card-info'>{`Posted by: ${userName} on ${createdAt.toLocaleDateString(
            "en-US"
          )}`}</p>
        </div>
      </div>
    </Link>
  );
}
