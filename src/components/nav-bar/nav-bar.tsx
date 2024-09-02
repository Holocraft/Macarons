import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { options } from "../../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SignInOutButton from "../sign-in-out-button/sign-in-out-button";

export default async function NavBar() {
  const session = await getServerSession(options);
  return (
    <div className='nav-bar'>
      <Link href={"/"}>
        <FontAwesomeIcon icon={faCookie} />
      </Link>
      <ul className='nav-bar-list'>
        <li>
          <Link href={"/photos"}>Photos</Link>
        </li>
        <li>
          <Link href={"/events"}>Events</Link>
        </li>
        <li>
          {session ? (
            <SignInOutButton isSignIn={false} />
          ) : (
            <SignInOutButton isSignIn />
          )}
        </li>
      </ul>
    </div>
  );
}
