import type { Metadata } from "next";

import { Roboto, Roboto_Mono } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-mono",
});

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "alby",
  description:
    "Experienced self-taught developer specializing in web development. Passionate about developer tech soloutions and contributing to cutting-edge projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
