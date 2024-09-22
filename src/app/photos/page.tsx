import prisma from "../../../lib/prisma";
import Link from "next/link";
import Button from "@/components/button/button";
import AlbumCard from "./album-card/album-card";
import paths from "@/paths";

export default async function AlbumsPage() {
  const albums = await prisma.album.findMany({
    include: {
      images: true,
      user: true,
    },
  });
  return (
    <>
      <div className='albums-page'>
        <div className='albums-container'>
          <Link href={paths.createAlbumForm()} className='add-album'>
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
                    image={album.images[0]?.url}
                    images={album.images}
                    createdAt={album.createdAt}
                    userName={album.user?.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
