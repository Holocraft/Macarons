import Link from "next/link";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className='logged-in-header'>
          <div className='header-title'>
            <h1>Macarons</h1>
            <h3>Benicia mom&apos;s group</h3>
          </div>
        </div>
      ) : (
        <>
          <div className='logged-out-header'>
            <h1>Welcome to the Macarons group!</h1>
            <h2>Please sign in to continue</h2>
            <p>
              Need access?{" "}
              <span>
                <Link href='/contact'>Click here</Link>
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
}
