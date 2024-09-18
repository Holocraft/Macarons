import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "../App.scss";
import "@uploadthing/react/styles.css";
import NavBar from "@/components/nav-bar/nav-bar";
import BackgroundWrapper from "@/components/background-wrapper";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macarons",
  description: "A Benicia mom's group",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang='en'>
      <body className={sourceSans3.className}>
        <BackgroundWrapper session={session}>
          <div className='content'>
            <NavBar />
            <main>{children}</main>
          </div>
        </BackgroundWrapper>
      </body>
    </html>
  );
}
