import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./lib/models";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user?: User & AdapterUser;
  }
}

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  secret: process.env.JWT_KEY,
  jwt: { maxAge: 60 * 60 },
  session: { strategy: "jwt", maxAge: 60 * 60 },
  pages: {
    signIn: "/login",
    signOut: "/",
    newUser: "/register",
    verifyRequest: "/verify",
    error: "/global-error.tsx",
  },
  callbacks: {
    async authorized({ auth, request }) {
      console.log("AUTH", auth);
      if (auth) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = token.user as AdapterUser & User;
        session.user.id = (token.user as User).user_id.toString();
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();
          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
