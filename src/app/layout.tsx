import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noice | Speculation is the new distribution",
  description:
    "Launch a token for your startup. Earn from trades. Spend on the best growth talent. Turn speculation into distribution.",
  keywords: [
    "token launch",
    "startup marketing",
    "attention marketplace",
    "crypto",
    "growth",
    "distribution",
  ],
  openGraph: {
    title: "Noice | Speculation is the new distribution",
    description:
      "Launch a token for your startup. Earn from trades. Spend on the best growth talent.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noice | Speculation is the new distribution",
    description:
      "Launch a token for your startup. Earn from trades. Spend on the best growth talent.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
