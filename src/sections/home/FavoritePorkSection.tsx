import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Spacing, BorderRadius } from '@/constants';
import { formatCurrency } from '@/utils';

interface CategoryItem {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'spesial', name: 'Spesial', icon: 'ribbon' },
  { id: 'kukus', name: 'Kukus & Bao', icon: 'fast-food' },
  { id: 'bakmi', name: 'Bakmi Babi', icon: 'restaurant' },
  { id: 'panggang', name: 'Panggang', icon: 'bonfire' },
  { id: 'sate', name: 'Sate Babi', icon: 'flame' },
  { id: 'sup', name: 'Sup & Kuah', icon: 'water' },
];

interface FavoriteDish {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCountText: string;
  imageUrl: string;
}

const FAVORITE_DISHES: FavoriteDish[] = [
  {
    id: 'fav-1',
    name: 'Kaki Babi Kecap Lù Mì Spesial',
    price: 78000,
    rating: 4.9,
    reviewsCountText: '1.4k',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'fav-2',
    name: 'Babi Panggang Karo Rempah',
    price: 95000,
    rating: 4.8,
    reviewsCountText: '1.1k',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'fav-3',
    name: 'Baozi Babi Cincang Salted Egg',
    price: 45000,
    rating: 4.9,
    reviewsCountText: '890',
    imageUrl:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'fav-4',
    name: 'Samcan Goreng Crispy Garing',
    price: 88000,
    rating: 4.9,
    reviewsCountText: '2.3k',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'fav-5',
    name: 'Sate Babi Manis Khas Solo',
    price: 55000,
    rating: 4.9,
    reviewsCountText: '1.8k',
    imageUrl:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=80',
  },
];

export const FavoritePorkSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('spesial');

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.lanternIcon}>🏮</Text>
          <Text style={styles.title}>Jelajahi Menu Favorit Perbabian</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/menu')}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.seeAllText}>Lihat Semua &gt;</Text>
        </Pressable>
      </View>

      {/* Category Icons Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat.id;
          return (
            <Pressable
              key={cat.id}
              accessibilityRole="button"
              onPress={() => setSelectedCat(cat.id)}
              style={({ pressed }) => [
                styles.catItem,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <View
                style={[
                  styles.catIconBox,
                  isSelected ? styles.catIconBoxActive : styles.catIconBoxInactive,
                ]}
              >
                <Ionicons
                  name={cat.icon}
                  size={24}
                  color={isSelected ? '#F59E0B' : '#B91C1C'}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.catLabel,
                  isSelected && styles.catLabelActive,
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Dish Items Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dishScroll}
      >
        {FAVORITE_DISHES.map((dish) => (
          <Pressable
            key={dish.id}
            accessibilityRole="button"
            onPress={() => router.push('/menu')}
            style={({ pressed }) => [
              styles.dishCard,
              { opacity: pressed ? 0.95 : 1 },
            ]}
          >
            {/* Circular Floating Dish Avatar */}
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: dish.imageUrl }} style={styles.avatarImage} />
            </View>

            {/* Dish Name */}
            <Text numberOfLines={2} style={styles.dishName}>
              {dish.name}
            </Text>

            {/* Rating Row */}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}>{dish.rating.toFixed(1)}</Text>
              <Text style={styles.reviewsText}>({dish.reviewsCountText})</Text>
            </View>

            {/* Price (No plus button) */}
            <Text style={styles.priceText}>{formatCurrency(dish.price)}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B91C1C',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    marginVertical: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  lanternIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
    flex: 1,
  },
  seeAllText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: '#FBBF24',
  },
  categoryScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm + 4,
    marginBottom: Spacing.sm,
  },
  catItem: {
    alignItems: 'center',
    width: 60,
  },
  catIconBox: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg + 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  catIconBoxActive: {
    backgroundColor: '#7A0C0C',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  catIconBoxInactive: {
    backgroundColor: '#FFFFFF',
  },
  catLabel: {
    fontSize: 11,
    fontWeight: Typography.weights.medium,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  catLabelActive: {
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },
  dishScroll: {
    paddingHorizontal: Spacing.md,
    paddingTop: 36, // Room for top floating circular image
    gap: Spacing.md - 2,
  },
  dishCard: {
    width: 142,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl + 4,
    paddingTop: 40, // Space below avatar
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.xs + 2,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -30,
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  dishName: {
    fontSize: 12,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 16,
    minHeight: 32,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: '#D97706',
  },
  reviewsText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: Typography.weights.medium,
  },
  priceText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.extraBold,
    color: '#B91C1C',
    textAlign: 'center',
  },
});
