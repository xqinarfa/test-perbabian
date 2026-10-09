import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { Restaurant, MenuItem } from '@/types';
import { formatCurrency } from '@/utils';

interface SearchResultsSectionProps {
  query: string;
  restaurants: Restaurant[];
  menus: MenuItem[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onClearQuery?: () => void;
}

export const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  query,
  restaurants,
  menus,
  isLoading = false,
  error = null,
  onRetry,
  onClearQuery,
}) => {
  // 1. Error State
  if (error) {
    return (
      <View style={styles.stateContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.danger} />
        <Text style={styles.errorTitle}>Terjadi Kesalahan</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        {onRetry && (
          <Pressable
            accessibilityRole="button"
            onPress={onRetry}
            style={({ pressed }) => [
              styles.actionButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={styles.actionButtonText}>Coba Lagi</Text>
          </Pressable>
        )}
      </View>
    );
  }

  // 2. Loading State (Skeleton)
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonHeader} />
        {[1, 2, 3].map((key) => (
          <View key={key} style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonTextCol}>
              <View style={styles.skeletonLineLong} />
              <View style={styles.skeletonLineShort} />
              <View style={styles.skeletonLinePrice} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  const hasNoResults = restaurants.length === 0 && menus.length === 0;

  // 3. Empty State
  if (hasNoResults) {
    return (
      <View style={styles.stateContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="search" size={32} color={Colors.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>Tidak Ditemukan</Text>
        <Text style={styles.emptyMessage}>
          Tidak ada resto atau hidangan babi yang cocok dengan &quot;{query}&quot;. Coba gunakan kata kunci lain seperti &quot;samcan&quot;, &quot;siomay&quot;, atau &quot;bakmi&quot;.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onClearQuery || (() => router.push('/(tabs)/(directory)'))}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.actionButtonText}>Jelajahi Semua Resto</Text>
        </Pressable>
      </View>
    );
  }

  // 4. Ideal State
  return (
    <View style={styles.container}>
      <Text style={styles.resultsSummary}>
        Menemukan {restaurants.length + menus.length} hasil untuk &quot;{query}&quot;
      </Text>

      {/* Restoran yang Cocok */}
      {restaurants.length > 0 && (
        <View style={styles.sectionGroup}>
          <Text style={styles.groupTitle}>Restoran Terkait</Text>
          {restaurants.map((resto) => (
            <Pressable
              key={resto.id}
              accessibilityRole="button"
              onPress={() => router.push(`/restaurant/${resto.id}`)}
              style={({ pressed }) => [
                styles.itemCard,
                { opacity: pressed ? 0.95 : 1 },
              ]}
            >
              <Image
                source={{ uri: resto.imageUrl }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {resto.name}
                  </Text>
                  {resto.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{resto.badge}</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.itemTagline} numberOfLines={1}>
                  {resto.tagline}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={styles.ratingText}>{resto.rating}</Text>
                  </View>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.metaText}>{resto.area}</Text>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.metaText}>{resto.distanceKm} km</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      {/* Menu / Hidangan yang Cocok */}
      {menus.length > 0 && (
        <View style={styles.sectionGroup}>
          <Text style={styles.groupTitle}>Hidangan Babi</Text>
          {menus.map((dish) => (
            <Pressable
              key={dish.id}
              accessibilityRole="button"
              onPress={() => router.push('/menu')}
              style={({ pressed }) => [
                styles.itemCard,
                { opacity: pressed ? 0.95 : 1 },
              ]}
            >
              <Image
                source={{ uri: dish.imageUrl }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {dish.name}
                </Text>

                <Text style={styles.itemTagline} numberOfLines={1}>
                  {dish.description}
                </Text>

                <View style={styles.dishFooterRow}>
                  <Text style={styles.dishPrice}>
                    {formatCurrency(dish.price)}
                  </Text>
                  {dish.discountPercent && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        Hemat {dish.discountPercent}%
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  resultsSummary: {
    fontSize: Typography.sizes.xs + 2,
    color: '#6B7280',
    marginBottom: Spacing.sm,
  },
  sectionGroup: {
    marginBottom: Spacing.md,
  },
  groupTitle: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    marginBottom: Spacing.xs + 2,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.xs + 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    gap: Spacing.sm,
  },
  itemImage: {
    width: 68,
    height: 68,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F3F4F6',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    flexShrink: 1,
  },
  badge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  itemTagline: {
    fontSize: Typography.sizes.xs,
    color: '#6B7280',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
  },
  dotSeparator: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  metaText: {
    fontSize: 10,
    color: '#6B7280',
  },
  dishFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  dishPrice: {
    fontSize: Typography.sizes.xs + 2,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  discountBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
  },

  // State Containers
  stateContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    marginBottom: 4,
  },
  emptyMessage: {
    fontSize: Typography.sizes.xs + 2,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.md,
    maxWidth: 280,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
  errorTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.danger,
    marginTop: Spacing.sm,
  },
  errorMessage: {
    fontSize: Typography.sizes.xs + 2,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: Spacing.sm,
  },

  // Skeletons
  skeletonHeader: {
    width: 140,
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: Spacing.md,
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  skeletonImage: {
    width: 68,
    height: 68,
    borderRadius: BorderRadius.md,
    backgroundColor: '#E5E7EB',
  },
  skeletonTextCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  skeletonLineLong: {
    width: '80%',
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  skeletonLineShort: {
    width: '50%',
    height: 11,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  skeletonLinePrice: {
    width: '30%',
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
});
