import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const emails = process.env.ALLOWED_EMAILS;

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //     name: "Credentials",
    //     credentials: {
    //         username: {
    //             label: "Username:",
    //             type: "text",
    //             placeholder: "Your username"
    //         },
    //     },
    //     async authorize(credentials) {

    //     }
    // })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const allowedEmails = emails?.split(",");

      // Check if the user's email is in the allowed list
      if (allowedEmails?.includes(user.email)) {
        return true;
      } else {
        return "/unauthorized";
      }
    },
  },
};
