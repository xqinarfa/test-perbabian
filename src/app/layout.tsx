import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Perbabian · Temukan Restoran Menu Babi di Seluruh Indonesia',
  description: 'Direktori restoran menu babi dan kuliner non-halal di seluruh Indonesia. Cari per provinsi dan kota, lihat menu, ulasan, jam buka, dan kontak langsung.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400..700&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
