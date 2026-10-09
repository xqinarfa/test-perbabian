import { PromoBanner, Voucher, QuickAction } from '../types/promo';

export const MOCK_PROMO_BANNER: PromoBanner = {
  id: 'banner-1',
  badge: 'FESTIVAL KULINER NON-HALAL',
  title: 'PESTA SAMCAN & DIMSUM',
  subtitle: 'ALL YOU CAN EAT',
  price: 'Rp 88.000',
  priceNote: '/pax net',
  tag: 'Krispi',
  terms: '*Berlaku di seluruh outlet Perbabian Jakarta & Tangerang',
  imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
};

export const MOCK_PROMO_BANNERS: PromoBanner[] = [
  MOCK_PROMO_BANNER,
  {
    id: 'banner-2',
    badge: 'PROMO SPESIAL AKHIR TAHUN',
    title: 'BEBEK & BABI PANGGANG MADU',
    subtitle: 'DISKON HINGGA 30%',
    price: 'Rp 65.000',
    priceNote: '/porsi',
    tag: 'Best Seller',
    terms: '*Khusus dine-in & takeaway area PIK & Gading Serpong',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'banner-3',
    badge: 'COMBO SARAPAN PUAS',
    title: 'BAKMI KHEK & SIOMAY TELUR ASIN',
    subtitle: 'PAKET KENYANG HEMAT',
    price: 'Rp 48.000',
    priceNote: '/paket lengkap',
    tag: 'Favorit',
    terms: '*Berlaku setiap hari pukul 07:00 - 14:00 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'banner-4',
    badge: 'RESEP LEGENDA 1968',
    title: 'KAKI BABI SAUS LU MI',
    subtitle: 'REBUS SLOW-COOKED 8 JAM',
    price: 'Rp 78.000',
    priceNote: '/porsi besar',
    tag: 'Otentik',
    terms: '*Dibuat dari 100% lard dan kaldu babi segar harian',
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=80',
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'qa-1', title: 'Flash Deals', icon: 'flash', color: '#F59E0B' },
  { id: 'qa-2', title: 'Lucky Wheel', icon: 'color-palette', color: '#EF4444' },
  { id: 'qa-3', title: 'Member VIP', icon: 'ribbon', color: '#F59E0B' },
  { id: 'qa-4', title: 'Bantuan CS', icon: 'chatbubbles', color: '#3B82F6' },
];

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: 'v-1',
    type: 'discount',
    title: 'Diskon 20% Min. 250rb',
    code: 'PESTABABI20',
    expiryText: 'Berakhir dalam 2 hari',
    badge: 'KUPON SAMCAN',
  },
  {
    id: 'v-2',
    type: 'cashback',
    title: 'Cashback 30% No Min.',
    code: 'CASHBACK30',
    expiryText: 'Berakhir dalam 3 hari',
    badge: 'CASHBACK QRIS',
  },
];
