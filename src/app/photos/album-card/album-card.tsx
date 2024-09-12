import paths from "@/paths";
import Image from "next/image";
import Link from "next/link";

type AlbumImageProps = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function AlbumCard({
  id,
  title,
  description,
  image,
}: AlbumImageProps) {
  return (
    <Link href={`${paths.photos()}/${id}`} className='album-card-link'>
      <div className='album-card-container'>
        <Image src={image} alt='album image' width={300} height={200} />
        <div className='title-wrapper'>
          <h3 className='album-card-title'>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
