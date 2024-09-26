import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";

const emails = process.env.ALLOWED_EMAILS;

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const allowedEmails = emails?.split(",");

      // Check if the user's email is in the allowed list
      if (allowedEmails?.includes(user.email)) {
        // Create or update user in the database
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name, // Update user name if necessary
          },
          create: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        });

        return true;
      }
      // else {
      //   return "/unauthorized";
      // }
    },
    async session({ session, user }) {
      // Attach the user ID to the session object
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
        }
      }

      return session;
    },
  },
};
