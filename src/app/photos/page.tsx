import prisma from "../../../lib/prisma";
import Button from "@/components/button/button";
import AlbumCard from "./album-card/album-card";
import Link from "next/link";
import paths from "@/paths";

export default async function AlbumsPage() {
  const albums = await prisma.album.findMany({
    include: {
      images: true,
    },
  });
  return (
    <div className='albums-page'>
      <Link href={paths.createAlbumForm()}>
        <Button buttonStyle='btn primary'>Add Album</Button>
      </Link>
      <div className='albums'>
        {albums?.map((album) => {
          return (
            <div className='album' key={album.id}>
              <AlbumCard
                id={album.id}
                title={album.title}
                description={album.description}
                image={album.images[0].url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
