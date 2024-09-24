import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { options } from "../../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SignInOutButton from "../sign-in-out-button/sign-in-out-button";
import paths from "../../paths";

export default async function NavBar() {
  const session = await getServerSession(options);
  return (
    <div className='nav-bar'>
      <Link href={"/"} className='logo'>
        <FontAwesomeIcon icon={faCookie} />
      </Link>
      <ul className='nav-bar-list'>
        <li>
          <Link href={paths.photos()}>Photos</Link>
        </li>
        {/* TODO: implement events */}
        {/* <li>
          <Link href={paths.events()}>Events</Link>
        </li> */}
        <li>
          {/* TODO: refactor this to be a more readable component */}
          {session ? (
            <SignInOutButton isSignIn={false} />
          ) : (
            <SignInOutButton isSignIn />
          )}
        </li>
        <li className='signed-in'>{`Signed in as ${session?.user?.name}`}</li>
      </ul>
    </div>
  );
}
