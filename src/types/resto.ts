export interface Province {
  kode: string;
  nama: string;
  slug: string;
}

export interface City {
  kode: string;
  kodeProvinsi: string;
  nama: string;
  namaPendek: string;
  slug: string;
  count?: number;
}

export interface Category {
  slug: string;
  name: string;
  origin?: string;
  image?: string;
  description?: string;
}

export interface DocField {
  name: 'doc_signage' | 'doc_selfie' | 'doc_nib';
  title: string;
  desc: string;
  required: boolean;
}

export interface RestaurantRegistrationInput {
  // 1. Data Pemilik
  ownerName: string;
  phone: string;
  email: string;
  password?: string;

  // 2. Data Restoran
  name: string;
  provinsi: string;
  kota: string;
  address: string;
  whatsapp?: string;
  kategori: string[]; // Maksimal 3
  description?: string;

  // 3. Bukti Kepemilikan & Dokumen
  docSignage?: File | string;
  docSelfie?: File | string;
  docNib?: File | string;
  message?: string;
  setuju: boolean;
  bukanDuplikat?: boolean;
}

export interface RestaurantItem {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  province: string;
  phone?: string;
  whatsapp?: string;
  mapsUrl?: string;
  rating?: number;
  reviewCount?: number;
  categories: string[];
  isSponsored?: boolean;
  coverImage?: string;
  description?: string;
  openingHours?: string;
}
