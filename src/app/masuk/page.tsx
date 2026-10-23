'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MasukPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Simulasi login berhasil!');
  };

  return (
    <div className="flex min-h-screen flex-wrap bg-white">
      <aside className="flex flex-[1_1_380px] flex-col gap-8 bg-blush p-8 sm:p-12">
        <Link aria-label="Perbabian beranda" className="flex shrink-0" href="/">
          <img src="/brand/logo-panjang-warna.png" alt="Perbabian" className="h-10 w-auto" />
        </Link>
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-[34px] font-bold leading-[1.05] sm:text-[40px] text-ink">
            Temukan restoran menu babi di seluruh Indonesia
          </h2>
          <p className="leading-relaxed text-[#5A2E27]">
            Simpan restoran favorit, tulis ulasan, atau kelola halaman restoran Anda sendiri.
          </p>
        </div>
        <img
          src="/brand/logo-icon-warna.png"
          alt=""
          className="mt-auto hidden w-40 self-center sm:block"
        />
      </aside>

      <main className="flex flex-[999_1_480px] items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[420px] flex-col gap-4">
          <h1 className="font-display text-4xl font-bold text-ink">Masuk</h1>
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
            <span className="flex items-baseline justify-between">
              Kata sandi
              <Link className="text-sm font-semibold text-ink hover:text-brand" href="/lupa-sandi">
                Lupa kata sandi?
              </Link>
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="field font-normal"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="btn mt-1">
            Masuk
          </button>
          <p className="text-sm text-muted">
            Belum punya akun?{' '}
            <Link className="font-bold text-ink hover:text-brand" href="/daftar?lanjut=%2Fakun">
              Daftar
            </Link>{' '}
            · Pemilik restoran?{' '}
            <Link className="font-bold text-ink hover:text-brand" href="/daftar-restoran">
              Daftarkan restoran
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
