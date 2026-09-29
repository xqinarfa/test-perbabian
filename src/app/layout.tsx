import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perbabian — Direktori Kuliner Non-Halal Terkurasi di Indonesia",
  description:
    "Panduan lengkap restoran, kedai, dan street food dengan olahan daging serta minyak babi (lard) di seluruh Indonesia. Transparansi bahan dan status non-halal terpercaya.",
  keywords: [
    "perbabian",
    "kuliner non halal",
    "babi guling",
    "samcan crispy",
    "bakmi babi",
    "minyak babi",
    "lard",
    "direktori kuliner indonesia",
  ],
  authors: [{ name: "Perbabian" }],
  openGraph: {
    title: "Perbabian — Direktori Kuliner Non-Halal Terkurasi di Indonesia",
    description:
      "Panduan lengkap restoran, kedai, dan street food dengan olahan daging serta minyak babi di seluruh Indonesia.",
    type: "website",
    locale: "id_ID",
    siteName: "Perbabian",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${inter.variable}`}>
      <body className="antialiased text-[#11140f] bg-[#0b0e0c] font-sans selection:bg-[#bef227] selection:text-black">
        {children}
      </body>
    </html>
  );
}
