"use client";

import { signIn, signOut } from "next-auth/react";

type SignInOutButtonProps = {
  isSignIn?: boolean;
};

export default function SignInOutButton({ isSignIn }: SignInOutButtonProps) {
  return (
    <>
      {isSignIn ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </>
  );
}
