import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "NudgeDM - Turn Instagram Comments Into Customers",
  description:
    "Automatically send personalized Instagram DMs whenever someone comments on your posts. Scale your engagement and sales without lifting a finger.",
  keywords: [
    "Instagram automation",
    "auto DM",
    "Instagram DM bot",
    "creator tools",
    "affiliate marketing",
    "Instagram engagement",
  ],
  openGraph: {
    title: "NudgeDM - Turn Instagram Comments Into Customers",
    description:
      "Automatically send personalized Instagram DMs whenever someone comments on your posts.",
    url: "https://nudgedm.com",
    siteName: "NudgeDM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NudgeDM - Turn Instagram Comments Into Customers",
    description:
      "Automatically send personalized Instagram DMs whenever someone comments on your posts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${plexMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased">{children}</body>
    </html>
  );
}
