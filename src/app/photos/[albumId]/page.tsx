import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../../../lib/prisma";
import UploadDnDPage from "@/app/upload-dnd/page";
import AlbumImages from "@/app/photos/album-images/album-images";
import Link from "next/link";
import paths from "@/paths";
import Comments from "@/components/comments/comments";

export default async function Album({ params }) {
  const { albumId } = params;
  const session = await getServerSession(options);
  const album = await prisma.album.findUnique({
    where: {
      id: albumId,
    },
    include: {
      images: true,
      user: true,
    },
  });

  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });

  return (
    <>
      <div className='album-details'>
        <Link href={paths.photos()} className='back-link'>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Albums
        </Link>
        <h1 className='album-title'>{album?.title}</h1>
        <p className='album-description'>{album?.description}</p>
        <p className='album-info'>{`Posted by: ${
          album?.user?.name
        } on ${album?.createdAt.toLocaleDateString("en-US")}`}</p>
        {album?.images.length === 0 ? (
          <h4>No images yet. Upload images below.</h4>
        ) : (
          <AlbumImages
            album={album}
            session={session}
            isAdmin={currentUser?.isAdmin}
          />
        )}
        <Comments params={params} />
        <div className='uploadthing-container'>
          <UploadDnDPage />
        </div>
      </div>
    </>
  );
}
