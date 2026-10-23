import React from 'react';
import Link from 'next/link';
import RegisterForm from '../../components/RegisterForm';

export default function DaftarRestoranPage() {
  return (
    <div className="flex min-h-screen flex-wrap bg-white">
      {/* ASIDE INFO */}
      <aside className="flex flex-[1_1_380px] flex-col gap-9 bg-blush p-8 sm:p-12">
        <Link aria-label="Perbabian beranda" className="flex shrink-0" href="/">
          <img src="/brand/logo-panjang-warna.png" alt="Perbabian" className="h-10 w-auto" />
        </Link>
        <div className="flex flex-col gap-3.5">
          <h1 className="font-display text-[38px] font-bold leading-[1.05] sm:text-[44px] text-ink">
            Daftarkan restoran Anda
          </h1>
          <p className="leading-relaxed text-[#5A2E27]">
            Gratis. Setelah diverifikasi, Anda bisa mengubah menu, foto, dan jam buka sendiri, serta memasang iklan kota.
          </p>
        </div>
        <ol className="flex flex-col">
          <li className="flex items-start gap-3.5 border-t border-[#F6C2B8] py-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full font-display font-bold bg-brand text-white">
              1
            </span>
            <div className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[15px] font-bold text-ink">Isi formulir</span>
              <span className="text-sm text-[#5A2E27]">Data pemilik, restoran, dan bukti.</span>
            </div>
          </li>
          <li className="flex items-start gap-3.5 border-t border-[#F6C2B8] py-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full font-display font-bold bg-white text-ink">
              2
            </span>
            <div className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[15px] font-bold text-ink">Verifikasi admin</span>
              <span className="text-sm text-[#5A2E27]">Dicek manual oleh tim Perbabian.</span>
            </div>
          </li>
          <li className="flex items-start gap-3.5 border-t border-[#F6C2B8] py-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full font-display font-bold bg-white text-ink">
              3
            </span>
            <div className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[15px] font-bold text-ink">Restoran tayang</span>
              <span className="text-sm text-[#5A2E27]">Lengkapi menu, foto, dan jam buka dari akun Anda.</span>
            </div>
          </li>
        </ol>
        <div className="mt-auto rounded-2xl bg-white p-4.5 text-sm leading-normal text-ink-soft">
          <strong className="text-ink">Kenapa perlu verifikasi?</strong> Supaya hanya pemilik asli yang bisa mengelola halaman restoran. Dokumen Anda hanya dilihat admin dan tidak ditampilkan ke publik.
        </div>
      </aside>

      {/* FORM CONTAINER */}
      <main className="flex min-w-0 flex-[999_1_560px] justify-center p-6 sm:p-12 bg-white">
        <RegisterForm />
      </main>
    </div>
  );
}
