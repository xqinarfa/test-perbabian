import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Layout } from '@/constants';
import { Restaurant } from '@/types';
import { formatDistance, formatReviewCount } from '@/utils';

interface RestaurantCardSectionProps {
  restaurant: Restaurant;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
}

export const RestaurantCardSection: React.FC<RestaurantCardSectionProps> = ({
  restaurant,
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Banner Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
        
        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            restaurant.isOpen ? styles.statusBadgeOpen : styles.statusBadgeClosed,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: restaurant.isOpen ? '#10B981' : '#F59E0B' },
            ]}
          />
          <Text style={styles.statusText}>
            {restaurant.isOpen ? 'BUKA SEKARANG' : restaurant.openHoursText}
          </Text>
        </View>

        {/* Distance Badge */}
        <View style={styles.distanceBadge}>
          <Ionicons name="location-sharp" size={12} color="#FFFFFF" />
          <Text style={styles.distanceText}>
            {restaurant.area} • {formatDistance(restaurant.distanceKm)}
          </Text>
        </View>

        {/* Bookmark Button */}
        <Pressable
          accessibilityRole="button"
          onPress={() => onBookmarkToggle?.(restaurant.id)}
          style={({ pressed }) => [
            styles.bookmarkBtn,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={isBookmarked ? Colors.primary : '#374151'}
          />
        </Pressable>
      </View>

      {/* Info Section */}
      <View style={styles.info}>
        {/* Title and Category Badge */}
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.name}>
            {restaurant.name}
          </Text>
          {restaurant.badge && (
            <View style={styles.legendBadge}>
              <Text style={styles.legendText}>{restaurant.badge}</Text>
            </View>
          )}
        </View>

        {/* Rating and Price */}
        <View style={styles.metaRow}>
          <Ionicons name="star" size={13} color="#F59E0B" />
          <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
          <Text style={styles.reviewsText}>
            ({formatReviewCount(restaurant.reviewsCount)} ulasan)
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
        </View>

        {/* 100% Lard Banner */}
        {restaurant.is100PercentLard && (
          <View style={styles.lardBanner}>
            <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
            <View style={styles.lardTextCol}>
              <Text style={styles.lardTitle}>100% Minyak Babi (Lard) Murni</Text>
              <Text style={styles.lardSubtitle} numberOfLines={1}>
                {restaurant.lardDescription || 'Dapur Terbuka • Sterilisasi Terpisah'}
              </Text>
            </View>
          </View>
        )}

        {/* Specialties Tags */}
        <View style={styles.specialtiesSection}>
          <Text style={styles.specialtiesLabel}>MENU ANDALAN:</Text>
          <View style={styles.specialtiesTagsRow}>
            {restaurant.specialties.map((s, idx) => (
              <View key={idx} style={styles.specialtyTag}>
                <Text style={styles.specialtyTagText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
            style={({ pressed }) => [
              styles.detailBtn,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.detailBtnText}>Lihat Menu & Detail</Text>
            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
            style={({ pressed }) => [
              styles.mapBtn,
              { opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <Ionicons name="navigate-outline" size={15} color="#374151" />
            <Text style={styles.mapBtnText}>Peta</Text>
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
    borderColor: Colors.border,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 165,
    position: 'relative',
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
    paddingHorizontal: Spacing.xs,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  statusBadgeOpen: {
    borderColor: '#10B981',
    borderWidth: 1,
  },
  statusBadgeClosed: {
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weights.bold,
  },
  distanceBadge: {
    position: 'absolute',
    bottom: Spacing.xs,
    left: Spacing.xs + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weights.medium,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: Spacing.xs + 2,
    right: Spacing.xs + 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: Spacing.md - 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  legendBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    marginLeft: 6,
  },
  legendText: {
    color: '#B91C1C',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  reviewsText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  dot: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
  priceRange: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semiBold,
    color: Colors.textSecondary,
  },
  lardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: '#FEF2F2',
    padding: Spacing.xs,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs + 2,
  },
  lardTextCol: {
    flex: 1,
  },
  lardTitle: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  lardSubtitle: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  specialtiesSection: {
    marginBottom: Spacing.sm,
  },
  specialtiesLabel: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  specialtiesTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialtyTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  specialtyTagText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'center',
  },
  detailBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    minHeight: Layout.minTouchTarget - 4,
    borderRadius: BorderRadius.md,
  },
  detailBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    height: 44,
    minHeight: Layout.minTouchTarget - 4,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F3F4F6',
  },
  mapBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semiBold,
    color: Colors.textSecondary,
  },
});
