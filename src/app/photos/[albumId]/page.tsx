import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../../../lib/prisma";
import UploadDnDPage from "@/app/upload-dnd/page";
import AlbumImages from "@/app/photos/album-images/album-images";
import NavBar from "@/components/nav-bar/nav-bar";
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
    <>
      <NavBar />
      <div className='album-details'>
        <Link href={paths.photos()} className='back-link'>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Albums
        </Link>
        <h1 className='album-title'>{album?.title}</h1>
        <p className='album-description'>{album?.description}</p>
        <p className='album-info'>{`Posted by: ${
          album?.userName
        } on ${album?.createdAt.toLocaleDateString("en-US")}`}</p>
        {album?.images.length === 0 ? (
          <h4>No images yet. Upload images below.</h4>
        ) : (
          <AlbumImages album={album} />
        )}
        <div className='uploadthing-container'>
          <UploadDnDPage />
        </div>
      </div>
    </>
  );
}
