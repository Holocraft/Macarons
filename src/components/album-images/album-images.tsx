import Image from "next/image";

export default function AlbumImages({ album }) {
  return (
    <div>
      {album?.images?.map((image) => {
        return (
          <div>
            <Image src={image.url} alt='image' width={200} height={200} />
          </div>
        );
      })}
    </div>
  );
}
