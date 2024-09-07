import Button from "@/components/button/button";
import AlbumCard from "./album-card";
import Link from "next/link";
import paths from "@/paths";

export default function Albums({ albums }) {
  return (
    <>
      <Link href={paths.createAlbumForm()}>
        <Button buttonStyle='btn primary'>Add Album</Button>
      </Link>
      <div className='albums'>
        {albums?.map((album) => {
          return (
            <div className='album' key={album.id}>
              <AlbumCard
                title={album.title}
                description={album.description}
                image={album.image}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
