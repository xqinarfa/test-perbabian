'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PROVINCES, CITIES_BY_PROVINCE } from '../../data/provinces';
import { RESTAURANT_CATEGORIES } from '../../data/categories';

export default function JelajahPage() {
  const [selectedProvinsi, setSelectedProvinsi] = useState('');
  const [selectedKota, setSelectedKota] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('');
  const [query, setQuery] = useState('');

  const cities = selectedProvinsi ? CITIES_BY_PROVINCE[selectedProvinsi] || [] : [];

  const sampleResto = [
    {
      id: '1',
      name: 'BPK Pak Ginting',
      slug: 'bpk-pak-ginting',
      category: 'Babi Panggang Karo',
      kota: 'Jakarta Barat',
      provinsi: 'Daerah Khusus Ibukota Jakarta',
      address: 'Jl. Daan Mogot No. 45, Kebon Jeruk',
      phone: '081234567890',
      rating: 4.8,
      reviews: 142,
      isIklan: true,
      img: '/media/photos/5878f7b4-124d-4186-b619-cf5ebe16c390_t.webp',
    },
    {
      id: '2',
      name: 'Warung Babi Guling Bu Dayu',
      slug: 'babi-guling-bu-dayu',
      category: 'Babi Guling',
      kota: 'Denpasar',
      provinsi: 'Bali',
      address: 'Jl. Raya Kuta No. 88, Kuta',
      phone: '082198765432',
      rating: 4.9,
      reviews: 230,
      isIklan: true,
      img: '/media/photos/5bf92093-2255-43d6-b189-6186af6eb1ba_t.webp',
    },
    {
      id: '3',
      name: "Se'i Babi Kupang Baun Asli",
      slug: 'sei-babi-baun',
      category: "Se'i Babi",
      kota: 'Kupang',
      provinsi: 'Nusa Tenggara Timur',
      address: 'Jl. Timor Raya Km. 10, Oesapa',
      phone: '081345678912',
      rating: 4.7,
      reviews: 98,
      isIklan: false,
      img: '/media/photos/9dcf4feb-681c-4cc2-83be-b8567228bb49_t.webp',
    },
    {
      id: '4',
      name: 'Bakmi Bangka Asli 88',
      slug: 'bakmi-bangka-asli',
      category: 'Bakmi Bangka',
      kota: 'Jakarta Barat',
      provinsi: 'Daerah Khusus Ibukota Jakarta',
      address: 'Jl. Mangga Besar Raya No. 70',
      phone: '085211223344',
      rating: 4.6,
      reviews: 84,
      isIklan: false,
      img: '/media/photos/2c99d719-2f14-4c38-8aca-580756d50007_t.webp',
    },
  ];

  const filtered = sampleResto.filter((r) => {
    const matchQ = !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.address.toLowerCase().includes(query.toLowerCase());
    const matchKat = !selectedKategori || r.category.toLowerCase().includes(selectedKategori.toLowerCase());
    return matchQ && matchKat;
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1">
        <Navbar />

        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-[32px] font-bold text-ink sm:text-4xl">
              Jelajah per kota
            </h1>
            <p className="text-[15px] text-muted">
              Direktori restoran menu babi dan non-halal di seluruh Indonesia.
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="mt-6 flex flex-wrap gap-3 rounded-[20px] border border-line bg-white p-3.5 shadow-[0_8px_24px_rgba(43,27,21,.04)]">
            <label className="flex flex-1 basis-[180px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
              <span className="text-xs font-bold text-muted">Provinsi</span>
              <select
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

            <label className="flex flex-1 basis-[180px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
              <span className="text-xs font-bold text-muted">Kota / Kabupaten</span>
              <select
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

            <label className="flex flex-1 basis-[180px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
              <span className="text-xs font-bold text-muted">Kategori Kuliner</span>
              <select
                className="border-0 bg-transparent py-0.5 text-[15px] font-semibold text-ink outline-none cursor-pointer"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
              >
                <option value="">Semua kategori</option>
                {RESTAURANT_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-[2_1_220px] flex-col gap-1 rounded-xl bg-ground px-3 py-1.5">
              <span className="text-xs font-bold text-muted">Pencarian</span>
              <input
                type="search"
                placeholder="Nama resto atau jalan..."
                className="border-0 bg-transparent py-0.5 text-[15px] text-ink outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          {/* LIST RESTORAN */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Menampilkan {filtered.length} restoran</span>
              <span>Urutan: slot iklan dulu, lalu rating tertinggi</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className="card flex flex-col overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(43,27,21,.08)]"
                >
                  <div className="relative h-44 w-full bg-blush">
                    <img src={r.img} alt={r.name} className="h-full w-full object-cover" />
                    {r.isIklan && (
                      <span className="chip absolute left-3 top-3 bg-brand text-white font-bold tracking-wider">
                        IKLAN
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                      {r.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-ink">{r.name}</h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-star">
                          ★ <span>{r.rating}</span>
                          <span className="text-muted font-normal">({r.reviews})</span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-muted line-clamp-2">
                        {r.address}, {r.kota}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
                      <a
                        href={`https://wa.me/${r.phone}`}
                        target="_blank"
                        rel="noopener"
                        className="font-bold text-ok hover:underline"
                      >
                        Hubungi WhatsApp
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name} ${r.address}`)}`}
                        target="_blank"
                        rel="noopener"
                        className="font-bold text-brand hover:underline"
                      >
                        Petunjuk Arah →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
