import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { RestaurantReview } from '@/types';

interface ReviewsSectionProps {
  reviews?: RestaurantReview[];
  onWriteReviewPress?: () => void;
}

const DEFAULT_REVIEWS: RestaurantReview[] = [
  {
    id: 'rev-1',
    userName: 'Hendry Wijaya',
    userBadge: 'Level 6 Perbabian Foodie',
    rating: 5.0,
    timeAgo: '2 hari lalu',
    content:
      'Garingnya gila! Kulit samcannnya beneran renyah sampai gigitan terakhir. Minyak babinya wangi otentik nggak bikin enek di tenggorokan. Sambal tauconya pasangan yang pas banget.',
  },
  {
    id: 'rev-2',
    userName: 'Clara Lim',
    userBadge: 'Top Contributor',
    rating: 5.0,
    timeAgo: '1 minggu lalu',
    content:
      'Siomay babi udang telur asinnya juara, potongan udangnya utuh kenyal. Tempatnya bersih, AC dingin dan servicenya sigap banget pas jam makan malam ramai.',
  },
];

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews = DEFAULT_REVIEWS,
  onWriteReviewPress,
}) => {
  const displayReviews = reviews && reviews.length > 0 ? reviews : DEFAULT_REVIEWS;

  return (
    <View style={styles.container}>
      {/* Header Row: Title & Tulis Ulasan */}
      <View style={styles.headerRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title}>Komentar Penikmat Kuliner</Text>
          <Text style={styles.subtitle}>Ulasan terverifikasi komunitas Perbabian</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onWriteReviewPress}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}
        >
          <Text style={styles.writeReviewText}>Tulis Ulasan</Text>
        </Pressable>
      </View>

      {/* Review Cards */}
      {displayReviews.map((rev) => (
        <View key={rev.id} style={styles.reviewCard}>
          {/* Top User Info Row */}
          <View style={styles.userRow}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: rev.userName.startsWith('C') ? '#3B49DF' : '#991B1B' },
              ]}
            >
              <Text style={styles.avatarText}>{rev.userName.slice(0, 2).toUpperCase()}</Text>
            </View>

            <View style={styles.userInfoCol}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{rev.userName}</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>Verified Diner</Text>
                </View>
              </View>
              <Text style={styles.metaText}>
                {rev.userBadge} • {rev.timeAgo}
              </Text>
            </View>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={styles.ratingNum}>{rev.rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Review Content */}
          <Text style={styles.content}>&ldquo;{rev.content}&rdquo;</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleCol: {
    flex: 1,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  writeReviewText: {
    fontSize: 12,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs + 2,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs + 2,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
    fontSize: 12,
  },
  userInfoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 13,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  verifiedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: BorderRadius.xs,
  },
  verifiedText: {
    color: '#059669',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  metaText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingNum: {
    fontSize: 12,
    fontWeight: Typography.weights.bold,
    color: '#D97706',
  },
  content: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 17,
  },
});
