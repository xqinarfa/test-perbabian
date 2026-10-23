'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROVINCES, CITIES_BY_PROVINCE } from '../data/provinces';
import { RESTAURANT_CATEGORIES } from '../data/categories';

export default function RegisterForm() {
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [address, setAddress] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [setuju, setSetuju] = useState(false);

  // Files
  const [docSignage, setDocSignage] = useState<File | null>(null);
  const [docSelfie, setDocSelfie] = useState<File | null>(null);
  const [docNib, setDocNib] = useState<File | null>(null);

  // Status
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [similarResto, setSimilarResto] = useState<string | null>(null);
  const [bukanDuplikat, setBukanDuplikat] = useState(false);

  const cities = provinsi ? CITIES_BY_PROVINCE[provinsi] || [] : [];

  const handleCategoryChange = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== slug));
    } else {
      if (selectedCategories.length >= 3) {
        alert('Maksimal memilih 3 kategori.');
        return;
      }
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const handleNameBlur = () => {
    if (name.toLowerCase().includes('karo') || name.toLowerCase().includes('guling') || name.toLowerCase().includes('bpk')) {
      setSimilarResto(`Restoran serupa ditemukan: "${name}".`);
    } else {
      setSimilarResto(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      alert('Pilih minimal 1 kategori menu.');
      return;
    }
    if (!docSignage && !docSelfie) {
      alert('Wajib mengunggah minimal satu bukti kepemilikan (Foto papan nama atau Foto Anda di lokasi).');
      return;
    }
    if (!setuju) {
      alert('Harap setujui Syarat & ketentuan.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand text-white font-display text-2xl font-bold">
          ✓
        </div>
        <h2 className="font-display text-3xl font-bold text-ink">Pengajuan Berhasil Dikirim</h2>
        <p className="leading-relaxed text-muted text-sm max-w-md mx-auto">
          Terima kasih telah mendaftarkan <strong>{name}</strong>. Berkas dan bukti kepemilikan Anda akan diverifikasi secara manual oleh tim admin Perbabian.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/" className="btn">
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-3 rounded-xl border border-line font-bold text-ink hover:bg-ground text-sm cursor-pointer"
          >
            Daftarkan Restoran Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[680px] flex-col gap-8">
      {/* 1. DATA PEMILIK */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 p-0 font-display text-2xl font-semibold text-ink">
          1. Data pemilik
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="label">
            Nama lengkap
            <input
              required
              maxLength={80}
              autoComplete="name"
              className="field font-normal"
              name="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </label>
          <label className="label">
            Nomor WhatsApp
            <input
              type="tel"
              required
              placeholder="08xx xxxx xxxx"
              autoComplete="tel"
              className="field font-normal"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="label">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              className="field font-normal"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label">
            Kata sandi
            <input
              type="password"
              required
              minLength={8}
              placeholder="Minimal 8 karakter"
              autoComplete="new-password"
              className="field font-normal"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      {/* 2. DATA RESTORAN */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 p-0 font-display text-2xl font-semibold text-ink">
          2. Data restoran
        </legend>

        <label className="label">
          Nama restoran
          <input
            required
            maxLength={100}
            placeholder="mis. BPK Pak Ginting"
            className="field font-normal"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
          />
        </label>

        {similarResto && (
          <div className="flex flex-col gap-2 rounded-xl bg-blush px-4 py-3 text-sm text-[#5A2E27]">
            <strong>{similarResto}</strong>
            <label className="flex items-center gap-2 font-semibold cursor-pointer">
              <input
                type="checkbox"
                className="size-4 accent-brand"
                checked={bukanDuplikat}
                onChange={(e) => setBukanDuplikat(e.target.checked)}
              />
              Bukan, restoran saya berbeda. Lanjutkan pendaftaran.
            </label>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="label">
            Provinsi
            <select
              name="provinsi"
              required
              className="field cursor-pointer"
              value={provinsi}
              onChange={(e) => {
                setProvinsi(e.target.value);
                setKota('');
              }}
            >
              <option value="">Pilih provinsi</option>
              {PROVINCES.map((p) => (
                <option key={p.kode} value={p.kode}>
                  {p.nama}
                </option>
              ))}
            </select>
          </label>

          <label className="label">
            Kota / Kabupaten
            <select
              name="kota"
              required
              disabled={!provinsi}
              className="field cursor-pointer disabled:bg-ground disabled:text-muted"
              value={kota}
              onChange={(e) => setKota(e.target.value)}
            >
              <option value="">{provinsi ? 'Pilih kota' : 'Pilih provinsi dulu'}</option>
              {cities.map((c) => (
                <option key={c.kode} value={c.kode}>
                  {c.namaPendek}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="label">
          Alamat lengkap
          <textarea
            name="address"
            rows={3}
            required
            placeholder="Jalan, nomor, kelurahan, kecamatan"
            className="field resize-y font-normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label className="label">
          WhatsApp restoran <span className="font-normal text-muted">(kosongkan bila sama dengan nomor Anda)</span>
          <input
            type="tel"
            placeholder="08xx xxxx xxxx"
            className="field font-normal"
            name="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </label>

        <fieldset>
          <legend className="mb-2 text-sm font-bold text-ink">Kategori menu (maks. 3)</legend>
          <div className="flex flex-wrap gap-2">
            {RESTAURANT_CATEGORIES.map((c) => {
              const isChecked = selectedCategories.includes(c.slug);
              return (
                <label
                  key={c.slug}
                  className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition ${
                    isChecked
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-white text-ink hover:border-line-strong'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    name="kategori"
                    value={c.slug}
                    checked={isChecked}
                    onChange={() => handleCategoryChange(c.slug)}
                  />
                  {c.name}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="label">
          Deskripsi singkat <span className="font-normal text-muted">(opsional)</span>
          <textarea
            name="description"
            rows={3}
            maxLength={1500}
            placeholder="Menu andalan, suasana, sejak kapan berjualan."
            className="field resize-y font-normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </fieldset>

      {/* 3. BUKTI KEPEMILIKAN */}
      <fieldset className="flex flex-col gap-3.5">
        <legend className="mb-1.5 p-0 font-display text-2xl font-semibold text-ink">
          3. Bukti kepemilikan
        </legend>
        <p className="text-sm leading-normal text-muted">
          Wajib minimal satu foto: papan nama atau Anda di lokasi. NIB tidak wajib. Format JPG, PNG, atau PDF, maksimal 8 MB.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
          {/* Foto Papan Nama */}
          <label className={`relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4.5 text-center transition hover:border-brand hover:bg-[#FFF3F0] ${docSignage ? 'border-ok bg-ok-bg/40' : 'border-line-strong bg-white'}`}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={docSignage ? 'text-ok' : 'text-brand'}>
              <path d="M12 16V4" />
              <path d="M7 9l5-5 5 5" />
              <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
            </svg>
            <span className="text-sm font-bold text-ink">Foto papan nama</span>
            <span className="text-xs text-muted truncate max-w-[180px]">
              {docSignage ? docSignage.name : 'Tampak depan, nama terbaca jelas'}
            </span>
            <input
              type="file"
              accept="image/*,application/pdf"
              className="absolute inset-0 cursor-pointer opacity-0"
              name="doc_signage"
              onChange={(e) => setDocSignage(e.target.files?.[0] || null)}
            />
          </label>

          {/* Foto Anda di Lokasi */}
          <label className={`relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4.5 text-center transition hover:border-brand hover:bg-[#FFF3F0] ${docSelfie ? 'border-ok bg-ok-bg/40' : 'border-line-strong bg-white'}`}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={docSelfie ? 'text-ok' : 'text-brand'}>
              <path d="M12 16V4" />
              <path d="M7 9l5-5 5 5" />
              <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
            </svg>
            <span className="text-sm font-bold text-ink">Foto Anda di lokasi</span>
            <span className="text-xs text-muted truncate max-w-[180px]">
              {docSelfie ? docSelfie.name : 'Di dalam atau depan restoran'}
            </span>
            <input
              type="file"
              accept="image/*,application/pdf"
              className="absolute inset-0 cursor-pointer opacity-0"
              name="doc_selfie"
              onChange={(e) => setDocSelfie(e.target.files?.[0] || null)}
            />
          </label>

          {/* NIB / Izin Usaha */}
          <label className={`relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4.5 text-center transition hover:border-brand hover:bg-[#FFF3F0] ${docNib ? 'border-ok bg-ok-bg/40' : 'border-line-strong bg-white'}`}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={docNib ? 'text-ok' : 'text-brand'}>
              <path d="M12 16V4" />
              <path d="M7 9l5-5 5 5" />
              <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
            </svg>
            <span className="text-sm font-bold text-ink">NIB / izin usaha (opsional)</span>
            <span className="text-xs text-muted truncate max-w-[180px]">
              {docNib ? docNib.name : 'Kalau ada, verifikasi lebih cepat'}
            </span>
            <input
              type="file"
              accept="image/*,application/pdf"
              className="absolute inset-0 cursor-pointer opacity-0"
              name="doc_nib"
              onChange={(e) => setDocNib(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <label className="label">
          Catatan untuk admin <span className="font-normal text-muted">(opsional)</span>
          <textarea
            name="message"
            rows={2}
            maxLength={1000}
            className="field resize-y font-normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </fieldset>

      {/* Persetujuan */}
      <label className="flex items-start gap-3 text-sm leading-normal text-ink-soft cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 accent-brand cursor-pointer"
          name="setuju"
          checked={setuju}
          onChange={(e) => setSetuju(e.target.checked)}
        />
        <span>
          Saya pemilik atau pengelola sah restoran ini, restoran ini menyajikan menu non-halal, dan saya menyetujui{' '}
          <Link href="/syarat" className="font-bold underline text-ink hover:text-brand">
            Syarat &amp; ketentuan
          </Link>{' '}
          serta{' '}
          <Link href="/kebijakan-privasi" className="font-bold underline text-ink hover:text-brand">
            Kebijakan privasi
          </Link>{' '}
          Perbabian.
        </span>
      </label>

      {/* Button Submit */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn px-6 py-4 text-base cursor-pointer"
        >
          {loading ? 'Mengirim…' : 'Kirim untuk verifikasi'}
        </button>
        <span className="text-sm text-muted">
          Sudah punya akun?{' '}
          <Link className="font-bold text-ink hover:text-brand" href="/masuk?lanjut=/daftar-restoran">
            Masuk
          </Link>
        </span>
      </div>
    </form>
  );
}
