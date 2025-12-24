import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "./ui/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pick For Me TV",
  description: "Don't want to pick something to watch? Don't even want to pick a show? Use Pick For Me TV to randomly pick an episode from all your favorite shows!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>
          <main>
            <Nav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
