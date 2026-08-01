import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "supportpilot-ai-hackathon-2026-secret-key-super-secure",
});

export const config = {
  matcher: ["/admin/:path*"],
};
