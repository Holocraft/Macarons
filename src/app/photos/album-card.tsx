import Image from "next/image";
import Link from "next/link";

type AlbumImageProps = {
  title: string;
  description: string;
  image: string;
};

export default function AlbumCard({
  title,
  description,
  image,
}: AlbumImageProps) {
  return (
    <Link href='/album'>
      <div className='album-card-container'>
        <h3 className='album-card-title'>{title}</h3>
        <p>{description}</p>
        <Image src={image} alt='album image' width={300} height={200} />
      </div>
    </Link>
  );
}
