import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Spacing, BorderRadius } from '@/constants';

interface ExploreCategory {
  id: string;
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const CATEGORIES: ExploreCategory[] = [
  { id: 'c-1', name: 'Pilihan', iconName: 'bag-handle' },
  { id: 'c-2', name: 'Kukus', iconName: 'restaurant' },
  { id: 'c-3', name: 'Hotpot', iconName: 'flame' },
  { id: 'c-4', name: 'Pencuci mulut', iconName: 'ice-cream' },
  { id: 'c-5', name: 'Panggang', iconName: 'bonfire' },
];

interface ExploreDish {
  id: string;
  name: string;
  rating: number;
  reviewCountText: string;
  priceText: string;
  imageUrl: string;
}

const FEATURED_DISHES: ExploreDish[] = [
  {
    id: 'ed-1',
    name: 'Kaki babi saus Lu Mi',
    rating: 4.8,
    reviewCountText: '(1.2k)',
    priceText: 'Rp 78.000',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-2',
    name: 'Ayam BBQ Long Đình',
    rating: 4.8,
    reviewCountText: '(1.2k)',
    priceText: 'Rp 98.000',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-3',
    name: 'Bakpao Telur Asin',
    rating: 4.8,
    reviewCountText: '(850)',
    priceText: 'Rp 50.000',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'ed-4',
    name: 'Siomay Babi Udang',
    rating: 4.9,
    reviewCountText: '(1.5k)',
    priceText: 'Rp 42.000',
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80',
  },
];

export const SearchExploreMenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('c-1');

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Jelajahi menu</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/menu')}
            hitSlop={8}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.seeAllText}>lihat semua</Text>
          </Pressable>
        </View>

        {/* Category Icons Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <Pressable
                key={cat.id}
                accessibilityRole="button"
                onPress={() => setActiveCategory(cat.id)}
                style={styles.categoryItem}
              >
                <View
                  style={[
                    styles.iconBox,
                    isActive && styles.activeIconBox,
                  ]}
                >
                  <Ionicons
                    name={cat.iconName}
                    size={22}
                    color={isActive ? '#BC1D1D' : '#991B1B'}
                  />
                </View>
                <Text style={styles.categoryLabel} numberOfLines={2}>
                  {cat.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured Dishes with Circular Overlap Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dishesRow}
        >
          {FEATURED_DISHES.map((dish) => (
            <Pressable
              key={dish.id}
              accessibilityRole="button"
              onPress={() => router.push('/menu')}
              style={({ pressed }) => [
                styles.dishCardWrapper,
                { opacity: pressed ? 0.95 : 1 },
              ]}
            >
              {/* White card container */}
              <View style={styles.dishCard}>
                <Text style={styles.dishName} numberOfLines={2}>
                  {dish.name}
                </Text>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>
                    {dish.rating} {dish.reviewCountText}
                  </Text>
                </View>

                <Text style={styles.priceText}>{dish.priceText}</Text>
              </View>

              {/* Floating circular image positioned on top edge */}
              <View style={styles.dishImageCircleWrapper}>
                <Image
                  source={{ uri: dish.imageUrl }}
                  style={styles.dishImageCircle}
                  resizeMode="cover"
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  cardContainer: {
    backgroundColor: '#8B1111',
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#B91C1C',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md + 1,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: Typography.sizes.xs + 2,
    color: '#FDE68A',
    fontWeight: Typography.weights.medium,
  },
  categoryRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.lg + 4,
  },
  categoryItem: {
    alignItems: 'center',
    width: 62,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.md,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  activeIconBox: {
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weights.semiBold,
    marginTop: 6,
    textAlign: 'center',
  },
  dishesRow: {
    paddingHorizontal: Spacing.md,
    paddingTop: 36, // space for circular overlapping image
    gap: Spacing.md,
  },
  dishCardWrapper: {
    width: 140,
    position: 'relative',
  },
  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    paddingTop: 46, // spacing below overlapping circle image
    paddingHorizontal: Spacing.sm + 2,
    paddingBottom: Spacing.sm + 4,
    minHeight: 148,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dishImageCircleWrapper: {
    position: 'absolute',
    top: -34,
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  dishImageCircle: {
    width: '100%',
    height: '100%',
  },
  dishName: {
    fontSize: Typography.sizes.xs + 2,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: Typography.weights.medium,
  },
  priceText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.extraBold,
    color: '#BC1D1D',
    textAlign: 'center',
    marginTop: 6,
  },
});
