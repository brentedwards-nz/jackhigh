import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

// Extend Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    };
  }
  interface User {
    firstName?: string | null;
    lastName?: string | null;
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do NOT call .db() here for the adapter — pass the clientPromise directly
  return NextAuth(req, res, {
    debug: true,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT!),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        profile(profile) {
          console.log("Google profile:", profile);
          return {
            id: profile.sub,
            email: profile.email,
            image: profile.picture,
            firstName: profile.given_name,
            lastName: profile.family_name,
            name: profile.name,
          };
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/signin",
      verifyRequest: "/auth/verify-request",
      newUser: "/auth/welcome",
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log("Redirect callback:", { url, baseUrl });
        if (url.startsWith(baseUrl)) return url;
        return baseUrl + "/dashboard";
      },
      async jwt({ token, user }) {
        if (user) {
          console.log("JWT callback - user:", user);
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
        return token;
      },
      async session({ session, token }) {
        console.log("Session callback - token:", token);
        if (!session.user) session.user = {};
        session.user.firstName =
          typeof token?.firstName === "string" ? token.firstName : null;
        session.user.lastName =
          typeof token?.lastName === "string" ? token.lastName : null;
        return session;
      },
    },
  });
}
