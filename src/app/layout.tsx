import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MTGDailyCard - Your Daily Magic: The Gathering Card",
  description: "Discover a new Magic: The Gathering card every day. Built with Next.js, TypeScript, and deployed on Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
