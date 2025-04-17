import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminNavbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steem - Admin",
  description: "CTF Steem | @YuriRDev (hehe, parabens, esse CVE do next é muito doido né?)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminNavbar />
        {children}
      </body>
    </html>
  );
}
