'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PROVINCES, CITIES_BY_PROVINCE } from '../data/provinces';

export default function HomePage() {
  const [selectedProvinsi, setSelectedProvinsi] = useState('');
  const [selectedKota, setSelectedKota] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = selectedProvinsi ? CITIES_BY_PROVINCE[selectedProvinsi] || [] : [];

  const categories = [
    {
      slug: 'babi-panggang-karo',
      name: 'Babi Panggang Karo',
      desc: 'Khas Karo, Sumatera Utara',
      img: '/media/photos/5878f7b4-124d-4186-b619-cf5ebe16c390_t.webp',
    },
    {
      slug: 'babi-guling',
      name: 'Babi Guling',
      desc: 'Khas Bali',
      img: '/media/photos/5bf92093-2255-43d6-b189-6186af6eb1ba_t.webp',
    },
    {
      slug: 'sei-babi',
      name: "Se'i Babi",
      desc: 'Khas Kupang, NTT',
      img: '/media/photos/9dcf4feb-681c-4cc2-83be-b8567228bb49_t.webp',
    },
    {
      slug: 'bakmi-bangka',
      name: 'Bakmi Bangka',
      desc: 'Khas Bangka Belitung',
      img: '/media/photos/2c99d719-2f14-4c38-8aca-580756d50007_t.webp',
    },
    {
      slug: 'rica-tinorangsak',
      name: 'Rica-rica & Tinorangsak',
      desc: 'Khas Manado',
      img: '/media/photos/c4b5e187-fd56-44db-a51c-f5674e0aa3d3_t.webp',
    },
    {
      slug: 'char-siu-siobak',
      name: 'Char Siu & Siobak',
      desc: 'Chinese-Indonesia',
      img: '/media/photos/c557bef2-6f65-4386-a4bb-7321875b1732_t.webp',
    },
    {
      slug: 'bakmi-nasi-campur',
      name: 'Bakmi & Nasi Campur',
      desc: 'Chinese-Indonesia',
      img: '/media/photos/15006061-480d-4b5c-9939-c112732a36cf_t.webp',
    },
    {
      slug: 'ramen',
      name: 'Ramen Tonkotsu',
      desc: 'Jepang',
      img: '/media/photos/562c103f-5d06-4fa7-9985-01b90fd6b1fe_t.webp',
    },
  ];

  const popularCities = [
    {
      slug: 'jakarta-barat',
      name: 'Jakarta Barat',
      prov: 'Daerah Khusus Ibukota Jakarta',
      img: '/media/photos/fb7dff92-c234-450d-8abb-3e697d420a54.webp',
    },
    {
      slug: 'medan',
      name: 'Medan',
      prov: 'Sumatera Utara',
      img: '/media/photos/2b70b19d-8ecf-47e8-b123-be2990a47691.webp',
    },
    {
      slug: 'denpasar',
      name: 'Denpasar',
      prov: 'Bali',
      img: '/media/photos/5c28f967-7f4d-47ea-8e1d-b634d2ba4d6a.webp',
    },
    {
      slug: 'manado',
      name: 'Manado',
      prov: 'Sulawesi Utara',
      img: '/media/photos/f25a0def-9044-4251-ae38-3d644641c012.webp',
    },
    {
      slug: 'bekasi',
      name: 'Bekasi',
      prov: 'Jawa Barat',
      img: '/media/photos/38e4ab15-95f6-4e60-a27e-b8cbff2b1abb.webp',
    },
    {
      slug: 'pangkal-pinang',
      name: 'Pangkal Pinang',
      prov: 'Kepulauan Bangka Belitung',
      img: '/media/photos/744b081b-9082-4e17-9e0f-0cc2d3e750f2.webp',
    },
    {
      slug: 'kupang',
      name: 'Kupang',
      prov: 'Nusa Tenggara Timur',
      img: '/media/photos/8650bf1f-7d62-48e6-927a-ca0842a043dd.webp',
    },
    {
      slug: 'pontianak',
      name: 'Pontianak',
      prov: 'Kalimantan Barat',
      img: '/media/photos/07ee90ec-79ac-47d5-a961-8a40445fd3cb.webp',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Navbar />

        {/* HERO SECTION */}
        <div className="hero-bg w-full">
          <section className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-[104px]">
            <div className="flex min-w-0 max-w-[680px] flex-[0_1_680px] flex-col gap-5">
              <p className="text-sm font-bold uppercase tracking-[.08em] text-coral">
                Direktori restoran non-halal se-Indonesia
              </p>
              <h1 className="font-display text-[44px] font-bold leading-[1.02] tracking-[-0.01em] text-white sm:text-[64px]">
                Mau makan <span className="text-brand-bright">babi</span> di mana hari ini?
              </h1>
              <p className="max-w-[560px] text-lg leading-relaxed text-[#EBDDD7]">
                Cari restoran menu babi per provinsi dan kota. Lihat foto, daftar menu, ulasan, dan kontaknya, lalu datang langsung ke tempatnya.
              </p>

              {/* SEARCH FORM */}
              <form
                action="/jelajah"
                method="GET"
                className="mt-2 flex flex-wrap gap-2.5 rounded-[20px] border border-line bg-white p-3.5 shadow-[0_8px_24px_rgba(43,27,21,.06)]"
              >
                <label className="flex flex-1 basis-[170px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
                  <span className="text-xs font-bold text-muted">Provinsi</span>
                  <select
                    name="provinsi"
                    className="border-0 bg-transparent py-0.5 text-[15px] font-semibold text-ink outline-none cursor-pointer"
                    value={selectedProvinsi}
                    onChange={(e) => {
                      setSelectedProvinsi(e.target.value);
                      setSelectedKota('');
                    }}
                  >
                    <option value="">Semua provinsi</option>
                    {PROVINCES.map((p) => (
                      <option key={p.kode} value={p.kode}>
                        {p.nama}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-1 basis-[170px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
                  <span className="text-xs font-bold text-muted">Kota / Kabupaten</span>
                  <select
                    name="kota"
                    disabled={!selectedProvinsi}
                    className="border-0 bg-transparent py-0.5 text-[15px] font-semibold text-ink outline-none cursor-pointer disabled:text-muted"
                    value={selectedKota}
                    onChange={(e) => setSelectedKota(e.target.value)}
                  >
                    <option value="">{selectedProvinsi ? 'Semua kota' : 'Pilih provinsi dulu'}</option>
                    {cities.map((c) => (
                      <option key={c.kode} value={c.slug}>
                        {c.namaPendek}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-[2_1_220px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
                  <span className="text-xs font-bold text-muted">Menu atau nama restoran</span>
                  <input
                    type="search"
                    placeholder="mis. babi panggang, se'i, bakmi"
                    className="border-0 bg-transparent py-0.5 text-[15px] text-ink outline-none"
                    name="q"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>

                <button type="submit" className="btn min-h-14 flex-none px-6 text-base max-sm:w-full">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  {' '}Cari
                </button>
              </form>

              {/* SERING DICARI */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="mr-1 text-[#EBDDD7]">Sering dicari:</span>
                {['jakarta-barat', 'medan', 'denpasar', 'manado', 'bekasi', 'pangkal-pinang'].map((slug) => {
                  const cityObj = popularCities.find((c) => c.slug === slug);
                  return (
                    <Link
                      key={slug}
                      href={`/jelajah?kota=${slug}`}
                      className="rounded-full border border-white/45 bg-white/10 px-3.5 py-1.5 font-semibold text-white no-underline hover:border-white hover:bg-white/20 hover:text-white"
                    >
                      {cityObj ? cityObj.name : slug}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* DISCLAIMER PENGUNJUNG MUSLIM */}
        <section className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
          <div className="card flex flex-wrap items-center gap-x-4.5 gap-y-3.5 rounded-2xl px-5 py-4.5 bg-white">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5" />
                <path d="M12 7.5h.01" />
              </svg>
            </div>
            <p className="flex-[1_1_400px] text-[15px] leading-relaxed text-ink">
              <strong>Untuk pengunjung muslim:</strong> semua restoran di Perbabian menyajikan menu tidak halal. Daftar ini juga bisa dipakai sebagai panduan tempat makan yang perlu dihindari di kota Anda.
            </p>
          </div>
        </section>

        {/* SECTION KATEGORI */}
        <section id="kategori" className="mx-auto max-w-[1200px] scroll-mt-6 px-4 pt-[72px] sm:px-6">
          <h2 className="mb-6 font-display text-4xl font-semibold text-ink">Mau makan apa?</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/jelajah?kategori=${cat.slug}`}
                className="card flex items-center gap-3.5 rounded-2xl p-3.5 text-ink no-underline transition hover:-translate-y-0.5 hover:text-ink hover:shadow-[0_12px_28px_rgba(43,27,21,.10)] bg-white"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="size-[60px] shrink-0 rounded-[14px] bg-blush object-cover"
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-display text-lg font-semibold text-ink">{cat.name}</span>
                  <span className="text-[13px] text-muted">{cat.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION JELAJAH PER KOTA */}
        <section className="mx-auto max-w-[1200px] px-4 pt-14 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-[32px] font-semibold leading-tight sm:text-4xl text-ink">
                Jelajah per kota
              </h2>
            </div>
            <Link className="text-[15px] font-bold text-ink hover:text-brand" href="/jelajah">
              Semua kota
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
            {popularCities.map((city) => (
              <Link
                key={city.slug}
                href={`/jelajah?kota=${city.slug}`}
                style={{ '--city-img': `url(${city.img})` } as React.CSSProperties}
                className="city-photo flex h-[140px] flex-col justify-end gap-0.5 rounded-[18px] p-4.5 text-white no-underline transition hover:-translate-y-0.5 hover:text-white"
              >
                <span className="font-display text-2xl font-bold">{city.name}</span>
                <span className="text-[13px] font-semibold text-white/85">{city.prov}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION UNTUK PEMILIK RESTORAN & IKLAN */}
        <section id="pemilik" className="mx-auto max-w-[1200px] px-4 py-[72px] sm:px-6">
          <div className="flex flex-wrap gap-10 rounded-[28px] bg-ink p-7 text-white sm:p-12">
            <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-4.5">
              <p className="text-sm font-bold uppercase tracking-[.08em] text-coral">
                Untuk pemilik restoran
              </p>
              <h2 className="font-display text-[34px] font-semibold leading-[1.08] sm:text-[44px]">
                Restoran Anda belum ada di sini? Daftarkan, gratis.
              </h2>
              <ol className="mt-2 flex flex-col gap-3.5">
                <li className="flex items-start gap-3.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-display font-bold text-white">
                    1
                  </span>
                  <span className="pt-1 leading-normal">Buat akun pemilik dan isi data restoran.</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-display font-bold text-white">
                    2
                  </span>
                  <span className="pt-1 leading-normal">
                    Unggah bukti kepemilikan: foto papan nama atau foto Anda di lokasi. NIB tidak wajib.
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-display font-bold text-white">
                    3
                  </span>
                  <span className="pt-1 leading-normal">
                    Tim kami memverifikasi secara manual, lalu restoran Anda tayang.
                  </span>
                </li>
              </ol>
              <div className="mt-2">
                <Link className="btn px-5 py-3.5 text-base" href="/daftar-restoran">
                  Daftarkan restoran
                </Link>
              </div>
            </div>

            <div className="flex flex-[1_1_300px] flex-col gap-3.5 self-start rounded-[20px] bg-white p-7 text-ink">
              <span className="chip self-start tracking-wider">PAKET IKLAN KOTA</span>
              <h3 className="font-display text-[26px] font-semibold leading-tight text-ink">
                Tampil di 5 teratas pencarian kota Anda
              </h3>
              <p className="leading-relaxed text-muted">
                Slot terbatas, hanya 5 restoran per kota, selalu diberi tanda iklan agar pengunjung tetap percaya.
              </p>
              <Link className="font-bold text-ink hover:text-brand" href="/pasang-iklan">
                Lihat paket dan slot kosong
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
