import type { Metadata } from "next";
import { Karla, Inconsolata, Montserrat } from "next/font/google";
import "./globals.css";
import { css } from "@styled-system/css";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const monsterrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zach Huxford",
  description: "SWE from NZ, based in London",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="purple">
      <body
        className={`${karla.variable} ${monsterrat.variable} ${inconsolata.variable} ${css({ backgroundColor: "background.main-accent" })}`}
      >
        {children}
      </body>
    </html>
  );
}
