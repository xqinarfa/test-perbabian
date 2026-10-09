export interface RestaurantFacility {
  id: string;
  name: string;
  iconName: 'snow' | 'ban' | 'car' | 'wifi' | 'card' | 'people';
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar?: string;
  userBadge?: string;
  rating: number;
  timeAgo: string;
  content: string;
}

export type RestaurantReview = ReviewItem;

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge?: 'LEGENDARIS' | 'SEJAK 1968' | 'BALI OTENTIK' | 'BBQ GRILL' | 'BANDUNG ICON' | string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  area: string;
  address: string;
  pricePerPerson: number;
  priceRange: string;
  isOpen: boolean;
  openHoursText: string;
  tablesAvailable?: number;
  queueStatus?: string;
  is100PercentLard: boolean;
  lardDescription?: string;
  imageUrl: string;
  specialties: string[];
  facilities?: RestaurantFacility[];
  openingSchedule?: {
    days: string;
    hours: string;
  }[];
  reviews?: ReviewItem[];
}
