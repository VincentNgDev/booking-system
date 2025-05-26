  import NextAuth, { DefaultSession, NextAuthResult } from "next-auth";
  import Credentials from "next-auth/providers/credentials";

  declare module "next-auth" {
    // /**
    //  * The shape of the user object returned in the OAuth providers' `profile` callback,
    //  * or the second parameter of the `session` callback, when using a database.
    //  */
    // interface User {}
    // /**
    //  * The shape of the account object returned in the OAuth providers' `account` callback,
    //  * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
    //  */
    // interface Account {}

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
      user: {
        [key: string]: any; // Allow additional properties
      } & DefaultSession["user"];
    }
  }

  // The `JWT` interface can be found in the `next-auth/jwt` submodule
  import { JWT } from "next-auth/jwt";
  import { useSession } from "next-auth/react";

  declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
      // idToken?: string,
      [key: string]: any; // Allow additional properties
    }
  }

  const authResult = NextAuth({
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "text", placeholder: "you@example.com" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const testPw = "test1234";
          const testEmail = "test@mail.com";
          // You can add your own logic here to validate the credentials
          // For example, you can call an API to check if the credentials are valid

          // Simulate a user object returned from an API
          if (
            credentials?.email !== testEmail ||
            credentials?.password !== testPw
          ) {
            throw new Error("Invalid credentials.");
          }

          const user = await testCheckCredentials({
            email: credentials?.email,
          });

          return { id: user.id, name: user.name, email: credentials?.email };
        },
      }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    callbacks: {
      jwt: async ({ token, user, session, trigger }) => {
        if (user) {
          token.id = user.id;
        }
        if (trigger === "update") {
          console.log("JWT update triggered", session);
          if (session.resourceCategoryId) {
            token.resourceCategoryId = session.resourceCategoryId;
          }
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token) {
          session.user.id = token.id as string;

          // Selected Resource Category ID
          console.log("Session resourceCategoryId", token.resourceCategoryId);
          session.user.resourceCategoryId = token.resourceCategoryId;
        }
        return session;
      },
    },
  });

  function testCheckCredentials({ email }: { email?: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id: 1, name: "User", email: email });
      }, 1000);
    });
  }

  export const handlers: NextAuthResult["handlers"] = authResult.handlers;
  export const auth: NextAuthResult["auth"] = authResult.auth;
  export const signIn: NextAuthResult["signIn"] = authResult.signIn;
  export const signOut: NextAuthResult["signOut"] = authResult.signOut;
