import prisma from "../../../lib/prisma";
import Button from "@/components/button/button";
import AlbumCard from "./album-card/album-card";
import Link from "next/link";
import paths from "@/paths";
import NavBar from "@/components/nav-bar/nav-bar";

export default async function AlbumsPage() {
  const albums = await prisma.album.findMany({
    include: {
      images: true,
    },
  });
  return (
    <>
      <NavBar />
      <div className='albums-page'>
        <div className='albums-container'>
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
                    image={album.images[0]?.url}
                    createdAt={album.createdAt}
                    userName={album.userName}
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
