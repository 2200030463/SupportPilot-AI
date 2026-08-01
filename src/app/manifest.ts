import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SupportPilot AI - Multilingual AI Support Agent for Bharat Businesses",
    short_name: "SupportPilot AI",
    description: "AI-Powered Multilingual Customer Support Agent for Indian E-Commerce and SaaS Businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#080d1a",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
