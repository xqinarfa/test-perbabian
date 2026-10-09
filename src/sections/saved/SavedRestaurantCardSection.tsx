import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Layout } from '@/constants';
import { Restaurant } from '@/types';
import { formatDistance, formatReviewCount } from '@/utils';

interface SavedRestaurantCardSectionProps {
  restaurant: Restaurant;
  quote?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
  onRoutePress?: (restaurant: Restaurant) => void;
}

export const SavedRestaurantCardSection: React.FC<SavedRestaurantCardSectionProps> = ({
  restaurant,
  quote,
  isBookmarked = true,
  onBookmarkToggle,
  onRoutePress,
}) => {
  // Determine note banner: custom quote or lard description
  const displayNote =
    quote ||
    (restaurant.id === 'resto-1'
      ? '"Wajib pesan Samcan Panggang Garing + Sambal Matah"'
      : restaurant.id === 'resto-3'
      ? '"Kulit babi krispi super renyah"'
      : restaurant.lardDescription);

  const isQuote =
    displayNote &&
    (displayNote.startsWith('"') || quote !== undefined);

  return (
    <View style={styles.card}>
      {/* Banner Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />

        {/* Status Pill Badge (Top-Left) */}
        <View style={styles.statusBadge}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: restaurant.isOpen ? '#10B981' : '#F59E0B' },
            ]}
          />
          <Text style={styles.statusText}>
            {restaurant.isOpen
              ? restaurant.id === 'resto-1'
                ? 'BUKA SEKARANG (TUTUP 22:00)'
                : 'BUKA SEKARANG'
              : restaurant.openHoursText.toUpperCase()}
          </Text>
        </View>

        {/* Bookmark Button (Top-Right) */}
        <Pressable
          accessibilityRole="button"
          onPress={() => onBookmarkToggle?.(restaurant.id)}
          style={({ pressed }) => [
            styles.bookmarkBtn,
            { opacity: pressed ? 0.75 : 1 },
          ]}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={isBookmarked ? Colors.primary : '#374151'}
          />
        </Pressable>

        {/* Bottom Overlay (Rating & Price Range) */}
        <View style={styles.imageBottomOverlay}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.ratingNum}>{restaurant.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsCount}>
              ({formatReviewCount(restaurant.reviewsCount)} ulasan)
            </Text>
          </View>
          <Text style={styles.priceRangeText}>{restaurant.priceRange}</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.info}>
        {/* Category Badge & Location Subtitle */}
        <View style={styles.subRow}>
          {restaurant.badge && (
            <>
              <Text style={styles.badgeText}>{restaurant.badge}</Text>
              <Text style={styles.subDot}>•</Text>
            </>
          )}
          <Ionicons name="location-outline" size={12} color="#4B5563" />
          <Text numberOfLines={1} style={styles.locationText}>
            {restaurant.area.split('/')[0].trim()} ({formatDistance(restaurant.distanceKm)})
          </Text>
        </View>

        {/* Restaurant Name */}
        <Text numberOfLines={1} style={styles.restaurantName}>
          {restaurant.name}
        </Text>

        {/* Community Note / Recommendation Banner */}
        {displayNote && (
          <View style={isQuote ? styles.quoteBanner : styles.lardBanner}>
            <Ionicons
              name={isQuote ? 'chatbox-ellipses-outline' : 'water'}
              size={14}
              color={isQuote ? '#6B7280' : Colors.primary}
            />
            <Text
              numberOfLines={1}
              style={isQuote ? styles.quoteText : styles.lardText}
            >
              {displayNote}
            </Text>
          </View>
        )}

        {/* Action Buttons Row: Rute/Peta & Lihat Kedai */}
        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => onRoutePress?.(restaurant)}
            style={({ pressed }) => [
              styles.routeBtn,
              { opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <Ionicons name="compass-outline" size={16} color={Colors.primary} />
            <Text style={styles.routeBtnText}>Rute / Peta</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
            style={({ pressed }) => [
              styles.detailBtn,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.detailBtnText}>Lihat Kedai</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md - 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 175,
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: Spacing.xs + 2,
    left: Spacing.xs + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    color: '#1F2937',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: Spacing.xs + 2,
    right: Spacing.xs + 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  imageBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNum: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: Typography.weights.bold,
  },
  reviewsCount: {
    color: '#D1D5DB',
    fontSize: 10,
  },
  priceRangeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: Typography.weights.bold,
  },
  info: {
    padding: Spacing.md - 2,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: Typography.weights.bold,
  },
  subDot: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  locationText: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: Typography.weights.medium,
    flex: 1,
  },
  restaurantName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  quoteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 7,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quoteText: {
    fontSize: 11,
    color: '#4B5563',
    fontStyle: 'italic',
    flex: 1,
  },
  lardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF1F2',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 7,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  lardText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
  },
  routeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    height: 42,
    minHeight: Layout.minTouchTarget - 6,
    borderRadius: BorderRadius.md,
  },
  routeBtnText: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
  },
  detailBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    height: 42,
    minHeight: Layout.minTouchTarget - 6,
    borderRadius: BorderRadius.md,
  },
  detailBtnText: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
});
