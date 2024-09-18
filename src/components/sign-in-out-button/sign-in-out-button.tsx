"use client";

import { signIn, signOut } from "next-auth/react";

type SignInOutButtonProps = {
  isSignIn?: boolean;
};

export default function SignInOutButton({ isSignIn }: SignInOutButtonProps) {
  return (
    <>
      {isSignIn ? (
        <button className='btn sign-on' onClick={() => signIn()}>
          Sign In
        </button>
      ) : (
        <button className='btn sign-on' onClick={() => signOut()}>
          Sign Out
        </button>
      )}
    </>
  );
}
