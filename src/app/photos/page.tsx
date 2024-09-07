import prisma from "../../../lib/prisma";
import Albums from "./albums";

export default async function AlbumsPage() {
  const albums = await prisma.album.findMany();
  return (
    <div className='albums-page'>
      <Albums albums={albums} />
    </div>
  );
}
