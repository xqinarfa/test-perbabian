import React from 'react';
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
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/utils';

interface FlashDealsSectionProps {
  items: MenuItem[];
}

export const FlashDealsSection: React.FC<FlashDealsSectionProps> = ({
  items,
}) => {
  return (
    <View style={styles.container}>
      {/* Header with Countdown */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Diskon Hari Ini</Text>
          <View style={styles.timerBadge}>
            <Ionicons name="time" size={13} color="#FFFFFF" />
            <Text style={styles.timerText}>02:45:12</Text>
          </View>
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

      {/* Horizontal Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            onPress={() => router.push('/menu')}
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.95 : 1 },
            ]}
          >
            {/* Image with Badges */}
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              {item.discountPercent && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    Hemat {item.discountPercent}%
                  </Text>
                </View>
              )}
              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                style={({ pressed }) => [
                  styles.favoriteBtn,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Ionicons name="heart-outline" size={16} color="#4B5563" />
              </Pressable>
            </View>

            {/* Details */}
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.name}>
                {item.name}
              </Text>

              <View style={styles.metaRow}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.ratingText}>
                  {item.rating ? item.rating.toFixed(1) : '4.9'}
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.distanceText}>1.2 km</Text>
              </View>

              <View style={styles.priceRow}>
                <View>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>
                      {formatCurrency(item.originalPrice)}
                    </Text>
                  )}
                  <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  seeAllText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semiBold,
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  card: {
    width: 200,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 125,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weights.bold,
  },
  favoriteBtn: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: Spacing.xs + 2,
  },
  name: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    minHeight: 36,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  dot: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  distanceText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  originalPrice: {
    fontSize: 10,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.extraBold,
    color: Colors.primary,
  },
});
