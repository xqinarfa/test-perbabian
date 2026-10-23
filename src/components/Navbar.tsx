import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-9 gap-y-3 px-4 py-3.5 sm:px-6">
        <Link aria-label="Perbabian beranda" className="flex shrink-0" href="/">
          <img src="/brand/logo-panjang-warna.png" alt="Perbabian" className="h-10 w-auto" />
        </Link>
        <nav aria-label="Menu utama" className="flex flex-auto flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <Link className="font-semibold no-underline hover:text-brand text-ink" href="/jelajah">
            Jelajah kota
          </Link>
          <Link className="font-semibold no-underline hover:text-brand text-ink" href="/#kategori">
            Kategori
          </Link>
          <Link className="font-semibold no-underline hover:text-brand text-ink" href="/pasang-iklan">
            Pasang iklan
          </Link>
        </nav>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link className="px-3 py-2.5 text-[15px] font-semibold text-ink no-underline hover:text-brand" href="/masuk">
            Masuk
          </Link>
          <Link className="btn" href="/daftar-restoran">
            Daftarkan restoran
          </Link>
        </div>
      </div>
    </header>
  );
}
