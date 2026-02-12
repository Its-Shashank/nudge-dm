import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NudgeDM — Automate Instagram DMs for Creators",
  description:
    "Send automated DMs with links, assets, and lead magnets to every follower who comments on your Instagram Reels, Posts, and Stories. Boost your affiliate revenue on autopilot.",
  keywords: [
    "Instagram automation",
    "auto DM",
    "Instagram DM bot",
    "creator tools",
    "affiliate marketing",
    "Instagram engagement",
  ],
  openGraph: {
    title: "NudgeDM — Automate Instagram DMs for Creators",
    description:
      "Send automated DMs with links to every follower who comments. Boost your affiliate revenue on autopilot.",
    url: "https://nudgedm.com",
    siteName: "NudgeDM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NudgeDM — Automate Instagram DMs for Creators",
    description:
      "Send automated DMs with links to every follower who comments. Boost your affiliate revenue on autopilot.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
