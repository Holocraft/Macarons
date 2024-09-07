"use client";

import { signIn, signOut } from "next-auth/react";

type SignInOutButtonProps = {
  isSignIn?: boolean;
};

export default function SignInOutButton({ isSignIn }: SignInOutButtonProps) {
  return (
    <>
      {isSignIn ? (
        <button className='btn primary' onClick={() => signIn()}>
          Sign In
        </button>
      ) : (
        <button className='btn primary' onClick={() => signOut()}>
          Sign Out
        </button>
      )}
    </>
  );
}
