# 🐷 Perbabian App - Mobile Application

Aplikasi panduan kuliner & pemesanan makanan non-halal terpercaya di area Pantai Indah Kapuk (PIK) dan Jakarta. Dibangun menggunakan **React Native**, **Expo SDK 57**, dan **Expo Router** dengan standar arsitektur modular yang terstruktur, bersih, dan mudah dipahami oleh tim pengembang.

---

## 🏛️ Arsitektur & Pola Desain

Aplikasi ini menggunakan kombinasi dua pola utama:
1. **Route Group Pattern (Expo Router)**: Mengelompokkan alur navigasi (`(tabs)`, `(home)`, `(directory)`, `(saved)`, `(profile)`) tanpa mengotori URL path, serta memisahkan alur stack terpisah seperti `restaurant/[id]` dan `menu/index`.
2. **Modular Section Architecture (`src/sections/`)**: Seluruh komponen tampilan berukuran sedang hingga besar dikelompokkan berdasarkan modul/fitur fungsionalnya (Home, Directory, Restaurant Detail, Menu).
3. **Atomic UI Primitives (`src/components/ui/`)**: Komponen kecil serbaguna yang dapat digunakan berulang kali di seluruh modul.
4. **Strict TypeScript & Design Tokens**: Menggunakan strict type interfaces dan sistem token desain berbasis ritme spacing 4pt/8pt.

---

## 📁 Struktur Direktori Lengkap

```text
perbabian-app/
├── assets/                                 # Asset gambar, ikon splash, dan font native
├── src/
│   ├── app/                                # 🌐 EXPO ROUTER (Hanya file Route / Screen)
│   │   ├── _layout.tsx                     # Root Layout: Stack Navigator, GestureHandler, SafeAreaProvider
│   │   ├── (tabs)/                         # Route Group: Bottom Tab Navigator
│   │   │   ├── _layout.tsx                 # Konfigurasi 4 Tab Utama (Icons, Labels, Colors)
│   │   │   ├── (home)/
│   │   │   │   └── index.tsx               # Screen Beranda Utama
│   │   │   ├── (directory)/
│   │   │   │   └── index.tsx               # Screen Direktori & Pencarian Kedai
│   │   │   ├── (saved)/
│   │   │   │   └── index.tsx               # Screen Daftar Kedai Tersimpan / Bookmark
│   │   │   └── (profile)/
│   │   │       └── index.tsx               # Screen Profil Diner, Riwayat, & Poin VIP
│   │   ├── restaurant/
│   │   │   └── [id].tsx                    # Screen Detail Kedai Dinamis (Sticky Header & Order Bar)
│   │   └── menu/
│   │       └── index.tsx                   # Screen Katalog Menu Lengkap (Categorized SectionList)
│   │
│   ├── sections/                           # 🧩 MODULAR SECTIONS (Komponen UI per Fitur)
│   │   ├── index.ts                        # Master Barrel Export
│   │   ├── home/                           # Seksi tampilan khusus Beranda
│   │   │   ├── index.ts                    # Re-export seluruh seksi home
│   │   │   ├── HeroCarouselSection.tsx     # Carousel banner promosi & diskon
│   │   │   ├── QuickActionsSection.tsx     # Kategori cepat (Bakmi, Samcan, Nasi Campur, dll.)
│   │   │   ├── FlashDealsSection.tsx       # Kartu diskon terbatas dengan countdown badge
│   │   │   ├── FavoritePorkSection.tsx     # Rekomendasi menu terfavorit komunitas
│   │   │   ├── NearbyBranchesSection.tsx   # Daftar cabang kedai terdekat
│   │   │   └── VouchersSection.tsx         # Kupon hemat siap klaim
│   │   ├── directory/                      # Seksi tampilan khusus Direktori
│   │   │   ├── index.ts                    # Re-export seksi direktori
│   │   │   ├── FilterChipsSection.tsx      # Filter kota, kategori olahan, & rating 4.8+
│   │   │   └── RestaurantCardSection.tsx   # Card kedai dengan badge transparansi 100% Lard
│   │   ├── restaurant/                     # Seksi tampilan khusus Detail Kedai
│   │   │   ├── index.ts                    # Re-export seksi detail kedai
│   │   │   ├── LardCertificationSection.tsx# Card komitmen sertifikasi minyak babi murni
│   │   │   ├── FacilitiesSection.tsx       # Grid fasilitas restoran (AC, Parkir, Dapur Terbuka)
│   │   │   └── MenuItemRowSection.tsx      # Baris kartu menu dengan stepper tambah/kurang qty
│   │   └── menu/                           # Seksi tampilan khusus Katalog Menu
│   │       ├── index.ts                    # Re-export seksi katalog menu
│   │       └── CategoryTabsSection.tsx     # Tab horizontal kategori & quick tags
│   │
│   ├── components/
│   │   └── ui/                             # 🧱 SHARED UI PRIMITIVES (Komponen Dasar)
│   │       ├── index.ts                    # Re-export UI primitives
│   │       ├── Badge.tsx                   # Badge diskon, chef pick, bestseller, & tag
│   │       ├── Header.tsx                  # Top App Bar (Variant Merah & Putih)
│   │       ├── RatingBadge.tsx             # Indikator rating bintang & jumlah review
│   │       └── SearchBar.tsx               # Komponen kolom input pencarian interaktif
│   │
│   ├── constants/                          # 🎨 DESIGN SYSTEM & TOKENS
│   │   ├── index.ts                        # Re-export konstanta
│   │   └── theme.ts                        # Colors, Spacing (4pt/8pt), Typography, & Layout
│   │
│   ├── data/                               # 📦 MOCK DATA & FIXTURES
│   │   ├── index.ts                        # Master data barrel export
│   │   ├── restaurants.ts                  # Mock data kedai babi (PIK, Muara Karang, Pluit)
│   │   ├── menus.ts                        # Mock data menu hidangan (samcan, bakmi, dimsum)
│   │   └── promos.ts                       # Mock promo banner, quick actions, voucher
│   │
│   ├── types/                              # 🏷️ STRICT TYPESCRIPT DEFINITIONS
│   │   ├── index.ts                        # Type barrel export
│   │   ├── restaurant.ts                   # Interface Restaurant, Review, Facility
│   │   ├── menu.ts                         # Interface MenuItem
│   │   └── promo.ts                        # Interface PromoBanner, Voucher, QuickAction
│   │
│   └── utils/                              # 🛠️ UTILITIES & FORMATTERS
│       ├── index.ts                        # Util barrel export
│       └── formatters.ts                   # Format mata uang IDR, jarak km, angka ulasan
│
├── .agents/                                # AI Agent guidelines & craftsmanship rules
├── AGENTS.md                               # Petunjuk Expo / React Native dan batas arsitektur
├── app.json                                # Expo App Manifest (Plugins, Scheme, Permissions)
├── package.json                            # Dependensi aplikasi & script build
└── tsconfig.json                           # Konfigurasi TypeScript & Path Alias (@/*)
```

---

## 🎯 Panduan Penempatan File (Kaidah Tim)

| Kebutuhan Kode | Lokasi File | Contoh Penamaan |
| :--- | :--- | :--- |
| **Halaman / Screen Baru** | `src/app/` | `src/app/order/checkout.tsx` |
| **Seksi Tampilan Spesifik Modul** | `src/sections/<module>/` | `src/sections/checkout/PaymentMethodSection.tsx` |
| **Komponen Reusable Serbaguna** | `src/components/ui/` | `src/components/ui/Button.tsx` |
| **Definisi Data / Model TypeScript** | `src/types/` | `src/types/order.ts` |
| **Data Mock / Fixture Pengujian** | `src/data/` | `src/data/orders.ts` |
| **Fungsi Bantu / Helper** | `src/utils/` | `src/utils/date.ts` |
| **Nilai Warna, Spacing, Typography** | `src/constants/theme.ts` | `Spacing.md`, `Colors.primary` |

> ⚠️ **PENTING UNTUK EXPO ROUTER**:
> Jangan pernah membuat folder komponen pembantu di dalam `src/app/` (seperti `src/app/_components` atau `src/app/_sections`). Expo Router membaca semua file di dalam `src/app/` sebagai route/halaman navigasi. Semua komponen visual non-route **wajib** diletakkan di `src/sections/` atau `src/components/`.

---

## 🎨 Standar Desain & Craftsmanship

Sesuai standar yang ditetapkan di [mobile-craftsmanship](.agents/skills/mobile-craftsmanship/SKILL.md):
- **Sistem Spacing**: Mengikuti ritme kelipatan **4pt / 8pt** (`4, 8, 12, 16, 24, 32, 48`). Dilarang menggunakan nilai arbitrer (misal: 13px, 17px).
- **Target Sentuh Minimum**: Semua tombol interaktif memiliki target sentuh minimal **48x48 pt** untuk kenyamanan jempol pengguna.
- **Interaksi Native**: Menggunakan komponen `Pressable` dengan feedback visual (opacity atau ripple).
- **Clean Path Alias**: Gunakan `@/` untuk import (contoh: `@/constants`, `@/components/ui`, `@/sections/home`, `@/types`).

---

## 🚀 Perintah Pengembangan (Scripts)

```bash
# Menjalankan Dev Server Expo
npm start
# atau
npx expo start

# Menjalankan dengan clear cache
npx expo start -c

# Menjalankan via Tunnel (Solusi jika beda WiFi / firewall)
npx expo start --tunnel

# Validasi TypeScript
npx tsc --noEmit

# Validasi Linter Expo
npx expo lint

# Diagnostik kesehatan dependensi Expo
npx expo-doctor
```
