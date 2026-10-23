import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PasangIklanPage() {
  const packages = [
    {
      name: 'Kota Besar',
      price: 'Rp250.000',
      duration: '30 hari tayang di satu kota',
    },
    {
      name: 'Paket Hemat 30 Hari',
      price: 'Rp75.000',
      duration: '30 hari tayang di satu kota',
    },
    {
      name: 'Kota Besar 90 Hari',
      price: 'Rp650.000',
      duration: '90 hari tayang di satu kota',
    },
    {
      name: 'Paket Hemat 90 Hari',
      price: 'Rp200.000',
      duration: '90 hari tayang di satu kota',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1">
        <Navbar />

        <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-4 pb-20 pt-10 sm:px-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold uppercase tracking-[.08em] text-brand">
              Untuk pemilik restoran
            </p>
            <h1 className="font-display text-[38px] font-bold leading-[1.05] sm:text-[48px] text-ink">
              Tampil di 5 teratas pencarian kota Anda
            </h1>
            <p className="max-w-[640px] text-lg leading-relaxed text-muted">
              Restoran yang beriklan tampil paling atas saat orang mencari di kota Anda, sebelum daftar rating. Slotnya hanya 5 per kota, dan selalu diberi tanda <strong className="text-ink">IKLAN</strong> supaya pengunjung tetap percaya.
            </p>
          </div>

          {/* PRICING CARDS */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {packages.map((pkg, idx) => (
              <div key={idx} className="card flex flex-col gap-2 rounded-[20px] p-6 bg-white">
                <span className="font-display text-xl font-semibold text-ink">{pkg.name}</span>
                <span className="font-display text-3xl font-bold text-ink">{pkg.price}</span>
                <span className="text-sm text-muted">{pkg.duration}</span>
              </div>
            ))}
          </div>

          {/* CARA MEMASANG */}
          <section className="card flex flex-col gap-4 rounded-[20px] p-6 bg-white">
            <h2 className="font-display text-2xl font-semibold text-ink">Cara memasang</h2>
            <ol className="flex list-decimal flex-col gap-2 pl-5 leading-relaxed text-ink text-[15px]">
              <li>
                Pastikan restoran Anda sudah terdaftar dan terverifikasi. Belum?{' '}
                <Link className="text-brand font-semibold hover:underline" href="/daftar-restoran">
                  Daftarkan dulu
                </Link>
                , gratis.
              </li>
              <li>Hubungi kami lewat WhatsApp, sebutkan nama restoran dan paket yang dipilih.</li>
              <li>Kami cek slot di kota Anda, lalu kirim detail pembayaran.</li>
              <li>Setelah pembayaran diterima, iklan langsung kami aktifkan.</li>
            </ol>
            <a
              href="https://wa.me/6282285522870?text=Halo%20Perbabian%2C%20saya%20ingin%20memasang%20iklan%20untuk%20restoran%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="btn self-start mt-2"
            >
              Hubungi via WhatsApp
            </a>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
