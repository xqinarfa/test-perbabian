import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-10 px-4 pb-8 pt-14 sm:px-6">
        <div className="flex min-w-72 flex-[2] flex-col gap-3.5">
          <Link aria-label="Perbabian beranda" className="flex shrink-0" href="/">
            <img src="/brand/logo-panjang-putih.png" alt="Perbabian" className="h-10 w-auto" />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-[#D9C9C3]">
            Temukan restoran menu babi di Indonesia. Perbabian hanya direktori, pemesanan dan pembayaran makanan dilakukan langsung ke restoran.
          </p>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2.5 text-sm">
          <span className="font-bold text-coral">Jelajah</span>
          <Link className="text-white no-underline hover:text-coral" href="/jelajah">
            Cari per kota
          </Link>
          <Link className="text-white no-underline hover:text-coral" href="/#kategori">
            Kategori menu
          </Link>
          <Link className="text-white no-underline hover:text-coral" href="/cari?urut=rating">
            Rating tertinggi
          </Link>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2.5 text-sm">
          <span className="font-bold text-coral">Pemilik restoran</span>
          <Link className="text-white no-underline hover:text-coral" href="/daftar-restoran">
            Daftarkan restoran
          </Link>
          <Link className="text-white no-underline hover:text-coral" href="/pasang-iklan">
            Pasang iklan
          </Link>
          <Link className="text-white no-underline hover:text-coral" href="/masuk">
            Masuk
          </Link>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2.5 text-sm">
          <span className="font-bold text-coral">Perbabian</span>
          <Link className="text-white no-underline hover:text-coral" href="/tentang">
            Tentang kami
          </Link>
          <Link className="text-white no-underline hover:text-coral" href="/kebijakan-privasi">
            Kebijakan privasi
          </Link>
          <Link className="text-white no-underline hover:text-coral" href="/syarat">
            Syarat &amp; ketentuan
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-[#3A2A23] px-4 pb-7 pt-4 text-[13px] text-[#BFAEA7] sm:px-6">
        © {new Date().getFullYear()} Perbabian · perbabian.com
      </div>
    </footer>
  );
}
