# Web Resto Perbabian

Direktori & Portal Pendaftaran Restoran Kuliner Non-Halal / Olahan Babi di Seluruh Indonesia.  
Project ini dibangun dengan **Next.js (App Router)**, **React**, **TypeScript**, dan **Tailwind CSS**.

---

## 📁 Struktur Folder

```text
web_resto/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (Google Fonts Fredoka & Plus Jakarta Sans)
│   │   ├── globals.css               # Styling global & token warna brand
│   │   ├── page.tsx                  # Landing Page / Beranda (Hero, 14 Kategori, Kota Populer, Iklan)
│   │   ├── jelajah/page.tsx          # Halaman pencarian & filter direktori restoran
│   │   ├── daftar-restoran/page.tsx  # Halaman pendaftaran restoran mandiri (3 langkah)
│   │   ├── pasang-iklan/page.tsx     # Informasi & paket iklan 5 slot teratas per kota
│   │   └── masuk/page.tsx            # Portal login akun pemilik / pengunjung
│   ├── components/
│   │   ├── Navbar.tsx                # Navigasi atas dengan menu dan CTA
│   │   ├── Footer.tsx                # Footer lengkap & disclaimer panduan halal
│   │   └── RegisterForm.tsx          # Form pendaftaran interaktif + cek kemiripan resto & upload bukti
│   ├── data/
│   │   ├── categories.ts             # 14 Kategori kuliner babi baku
│   │   └── provinces.ts              # Data 38 provinsi & kota-kota di Indonesia
│   └── types/
│       └── resto.ts                  # Type definitions & skema form pendaftaran
├── package.json
└── tsconfig.json
```

---

## 🌟 Fitur-Fitur Utama

1. **Beranda & Pencarian Kota**:
   - Hero banner interaktif dengan filter cepat kota populer.
   - 14 Kategori kuliner babi baku (BPK, Babi Guling, Se'i Babi, Bakmi Bangka, Saksang, Tinorangsak, Char Siu & Siobak, dll.).
   - Disclaimer panduan untuk pengunjung muslim.

2. **Formulir Pendaftaran Restoran (`/daftar-restoran`)**:
   - **Data Pemilik**: Nama pemilik, nomor WhatsApp, email, kata sandi.
   - **Data Restoran**: Nama restoran, dropdown provinsi & kota bertingkat, alamat lengkap, kontak reservasi WhatsApp, pilihan maksimal 3 kategori, dan deskripsi toko.
   - **Cek Duplikasi Restoran**: Mendeteksi nama resto serupa dengan opsi klaim atau checklist bukan duplikat.
   - **Bukti Kepemilikan**: Unggah foto papan nama, foto di lokasi, dan NIB/surat izin usaha.

3. **Paket Iklan Kota (`/pasang-iklan`)**:
   - Sistem slot iklan terbatas (5 slot teratas per kota).
   - Penanda resmi label `IKLAN` pada card restoran.
   - Direct link order iklan via WhatsApp tim admin.

4. **Katalog & Filter (`/jelajah`)**:
   - Filter berdasarkan nama resto, alamat, provinsi, dan kategori kuliner.
   - Direct call/order ke WhatsApp restoran dan tautan petunjuk arah Google Maps.

---

## 🚀 Cara Menjalankan

Masuk ke folder `web_resto` dan jalankan:

```bash
cd web_resto
npm install
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3002**
