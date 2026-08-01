import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "SupportPilot AI - Multilingual AI Support Agent for Bharat Businesses",
    template: "%s | SupportPilot AI",
  },
  description: "AI-Powered Multilingual Customer Support Agent for Indian E-Commerce and SaaS Businesses. Features Delhivery/BlueDart shipment tracking, 7-day return eligibility, instant UPI refunds, and product recommendations in INR (₹). Built for ChatGPT Codex India Hackathon 2026.",
  keywords: [
    "SupportPilot AI",
    "AI Customer Support",
    "Bharat AI Agent",
    "Hinglish AI Support",
    "Delhivery Tracking AI",
    "BlueDart Tracking Agent",
    "Multilingual Support India",
    "ChatGPT Codex Hackathon 2026",
  ],
  authors: [{ name: "SupportPilot AI Team" }],
  openGraph: {
    title: "SupportPilot AI - Multilingual Support Agent for Indian Businesses",
    description: "AI-Powered Customer Support Agent for Bharat Businesses. Supports Hindi, Hinglish, Tamil, Telugu, Delhivery tracking, and instant UPI refunds.",
    url: "https://supportpilot-ai.vercel.app",
    siteName: "SupportPilot AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupportPilot AI",
    description: "AI-Powered Multilingual Support Agent for Bharat Businesses",
  },
  robots: {
    index: true,
    follow: true,
  },
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
