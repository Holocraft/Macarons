import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "../App.scss";
import "@uploadthing/react/styles.css";
import NavBar from "@/components/nav-bar/nav-bar";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macarons",
  description: "A Benicia mom's group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={sourceSans3.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
