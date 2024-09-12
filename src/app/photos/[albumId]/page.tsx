import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../../../lib/prisma";
import UploadDnDPage from "@/app/upload-dnd/page";
import AlbumImages from "@/app/photos/album-images/album-images";
import Link from "next/link";
import paths from "@/paths";

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

  return (
    <div className='album-details'>
      <Link href={paths.photos()} className='back-link'>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Albums
      </Link>
      <h1>{album?.title}</h1>
      <AlbumImages album={album} />
      <div className='uploadthing-container'>
        <UploadDnDPage />
      </div>
    </div>
  );
}
