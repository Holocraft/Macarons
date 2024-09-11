import prisma from "../../../../lib/prisma";
import UploadDnDPage from "@/app/upload-dnd/page";
import AlbumImages from "@/components/album-images/album-images";

export default async function Album({ params }) {
  const { albumId } = params;
  const album = await prisma.album.findUnique({
    where: {
      id: albumId,
    },
    include: {
      images: true,
    },
  });
  console.log("🚀 ~ Album ~ album:", album);

  return (
    <div>
      <h1>Album</h1>
      <p>{album?.title}</p>
      <div>
        <AlbumImages album={album} />
      </div>
      <UploadDnDPage />
    </div>
  );
}
