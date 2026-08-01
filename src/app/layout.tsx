import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SupportPilot AI - Multilingual AI Support Agent for Bharat Businesses",
  description: "AI-Powered Multilingual Customer Support Agent for Indian E-Commerce and SaaS Businesses. Built for ChatGPT Codex India Hackathon 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
