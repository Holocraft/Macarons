import Image from "next/image";
import Link from "next/link";

type AlbumImageProps = {
  name: string;
  description: string;
  image: string;
};

export default function AlbumCard({
  name,
  description,
  image,
}: AlbumImageProps) {
  return (
    <Link href='/album'>
      <div className='album-card-container'>
        <h3>{name}</h3>
        <p>{description}</p>
        <Image src={image} alt='album image' width={300} height={200} />
      </div>
    </Link>
  );
}
