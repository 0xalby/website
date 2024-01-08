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
    "Experienced full-stack developer specializing in the crypto sphere. Passionate about building software that helps people.",
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
