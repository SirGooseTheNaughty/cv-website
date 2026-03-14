import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "./components/SmoothScroll";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sergey Vorobyev CV",
  description: "Professional CV of Sergey Vorobyev, experienced web developer and digital creative with expertise in React, Next.js, and modern web technologies.",
  keywords: ["web developer", "frontend developer", "React", "Next.js", "TypeScript", "portfolio"],
  authors: [{ name: "Sergey Vorobyev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
