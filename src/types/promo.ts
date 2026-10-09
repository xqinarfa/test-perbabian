export interface PromoBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  tag: string;
  terms: string;
  imageUrl: string;
}

export interface Voucher {
  id: string;
  type: 'discount' | 'cashback';
  title: string;
  code: string;
  expiryText: string;
  badge: string;
  isClaimed?: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
}
