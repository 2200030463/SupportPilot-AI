import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@supportpilot.ai" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@supportpilot.ai" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Support Pilot Admin",
            email: "admin@supportpilot.ai",
            role: "admin",
          };
        }

        if (credentials?.email === "customer@supportpilot.ai") {
          return {
            id: "2",
            name: "Aarav Sharma",
            email: "aarav.sharma@gmail.com",
            role: "customer",
          };
        }

        return {
          id: "1",
          name: "Support Pilot Admin",
          email: credentials?.email || "admin@supportpilot.ai",
          role: "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "supportpilot-ai-hackathon-2026-secret-key-super-secure",
};
