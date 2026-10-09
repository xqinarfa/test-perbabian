import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants';
import { formatReviewCount } from '../../utils';

interface RatingBadgeProps {
  rating: number;
  reviewsCount?: number;
  textColor?: string;
  style?: ViewStyle;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  reviewsCount,
  textColor = '#1F2937',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="star" size={13} color="#F59E0B" />
      <Text style={[styles.ratingText, { color: textColor }]}>
        {rating.toFixed(1)}
      </Text>
      {reviewsCount !== undefined && (
        <Text style={styles.reviewsCountText}>
          ({formatReviewCount(reviewsCount)})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
  reviewsCountText: {
    fontSize: Typography.sizes.xs,
    color: '#6B7280',
  },
});
