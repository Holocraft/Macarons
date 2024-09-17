import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import NavBar from "@/components/nav-bar/nav-bar";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className='macarons'>
          <div className='content'>
            <NavBar />
            <div className='logged-in-header'>
              <div className='header-title'>
                <h1>Macarons</h1>
                <h3>Benicia mom&apos;s group</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <NavBar />
          <div className='logged-out-header'>
            <h1>Welcome to the Macarons group!</h1>
            <h2>Please sign in to continue</h2>
          </div>
        </>
      )}
    </>
  );
}
