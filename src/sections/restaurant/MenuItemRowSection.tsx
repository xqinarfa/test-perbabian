import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/utils';

interface MenuItemRowSectionProps {
  item: MenuItem;
}

export const MenuItemRowSection: React.FC<MenuItemRowSectionProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Dish Image with badges */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        {item.discountPercent && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.discountPercent}%</Text>
          </View>
        )}
        {item.isChefPick && (
          <View style={styles.chefBadge}>
            <Text style={styles.chefText}>Chef Pick</Text>
          </View>
        )}
        {item.isBestseller && (
          <View style={styles.bestsellerBadge}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )}
        {item.isSpicy && (
          <View style={styles.spicyBadge}>
            <Text style={styles.spicyText}>🌶️ Pedas</Text>
          </View>
        )}
      </View>

      {/* Info Col */}
      <View style={styles.infoCol}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceCol}>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatCurrency(item.originalPrice)}
              </Text>
            )}
            <View style={styles.priceWithUnit}>
              <Text style={styles.price}>{formatCurrency(item.price)}</Text>
              {item.unit && (
                <Text style={styles.unitText}>/{item.unit}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    gap: Spacing.sm,
  },
  imageContainer: {
    width: 95,
    height: 95,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  chefBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  chefText: {
    color: '#B45309',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#1E293B',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  bestsellerText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: Typography.weights.bold,
  },
  spicyBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  spicyText: {
    color: '#B91C1C',
    fontSize: 8,
    fontWeight: Typography.weights.bold,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  priceCol: {
    flex: 1,
  },
  originalPrice: {
    fontSize: 10,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  priceWithUnit: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  price: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.extraBold,
    color: Colors.primary,
  },
  unitText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});
