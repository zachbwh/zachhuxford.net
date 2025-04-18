import type { Metadata } from "next";
import { Karla, Inconsolata, Montserrat } from "next/font/google";
import "./globals.css";
import { css } from "@styled-system/css";
import { Navigation } from "@components/Navigation";

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
        className={`${karla.variable} ${monsterrat.variable} ${inconsolata.variable} ${css(
          {
            backgroundColor: "background.main-accent",
            minHeight: "[100dvh]",
            position: "relative",
          }
        )}`}
      >
        <Navigation
          items={[
            { label: "Home", id: "home", href: "/" },
            { label: "My Story", id: "my-story", href: "/my-story" },
            { label: "Blog", id: "Blog", href: "/blog" },
          ]}
        />
        <div
          className={css({ maxWidth: "breakpoint-lg", marginInline: "auto" })}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
