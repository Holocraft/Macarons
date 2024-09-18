"use client";

import { usePathname } from "next/navigation";

const BackgroundWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const pathname = usePathname();

  // Show background only on the homepage
  const showLoggedInBackground = pathname === "/" && session;
  const showLoggedOutBackground = pathname === "/";

  return (
    <div
      className={
        showLoggedInBackground
          ? "macarons"
          : showLoggedOutBackground
          ? "benicia"
          : ""
      }
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
