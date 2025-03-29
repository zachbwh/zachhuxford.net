import type { Metadata } from "next";
import { Karla, Inconsolata, Montserrat } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${karla.variable} ${monsterrat.variable} ${inconsolata.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
