export type MenuCategoryType = 
  | 'samcan' 
  | 'bakmi' 
  | 'dimsum' 
  | 'sup' 
  | 'sate' 
  | 'all';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  category: MenuCategoryType;
  categoryLabel: string;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  isBestseller?: boolean;
  isChefPick?: boolean;
  isSpicy?: boolean;
  unit?: string;
}
