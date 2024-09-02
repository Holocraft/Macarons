import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UploadDnDPage from "./upload-dnd/page";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className='logged-in-header'>
          <h1>Macarons</h1>
          <h3>Benicia mom&apos;s group</h3>
          <UploadDnDPage />
        </div>
      ) : (
        <div className='logged-out-header'>
          <h1>Welcome to the Macarons group!</h1>
          <h2>Please sign in to continue</h2>
        </div>
      )}
    </>
  );
}
