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
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

interface HolidayPromoItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isBookmarked?: boolean;
}

const HOLIDAY_PROMOS: HolidayPromoItem[] = [
  {
    id: 'hp-1',
    title: 'Jelajahi kuliner Tiongkok – Dimsum gratis',
    subtitle: 'Makan enak tanpa khawatir harga',
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'hp-2',
    title: 'Diskon 30% bebek akhir tahun',
    subtitle: 'Diskon 30% bebek panggang madu',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'hp-3',
    title: 'Pesta Samcan Garing Spesial Imlek',
    subtitle: 'Bonus sambal matah & sup kaldu babi',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
  },
];

export const SearchHolidayPromoSection: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({
    'hp-1': true,
  });

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Promo musim liburan</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {HOLIDAY_PROMOS.map((promo) => {
          const isBookmarked = !!bookmarks[promo.id];

          return (
            <Pressable
              key={promo.id}
              accessibilityRole="button"
              onPress={() => router.push('/menu')}
              style={({ pressed }) => [
                styles.promoCard,
                { opacity: pressed ? 0.95 : 1 },
              ]}
            >
              {/* Image with Bookmark Badge */}
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: promo.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Simpan promo"
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleBookmark(promo.id);
                  }}
                  hitSlop={6}
                  style={styles.bookmarkBadge}
                >
                  <Ionicons
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={16}
                    color={isBookmarked ? Colors.primary : '#374151'}
                  />
                </Pressable>
              </View>

              {/* Promo Details */}
              <View style={styles.detailsCol}>
                <Text style={styles.promoTitle} numberOfLines={2}>
                  {promo.title}
                </Text>
                <Text style={styles.promoSubtitle} numberOfLines={1}>
                  {promo.subtitle}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push('/menu')}
                  hitSlop={6}
                  style={styles.detailLinkRow}
                >
                  <Text style={styles.detailLinkText}>Detail</Text>
                </Pressable>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  promoCard: {
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageWrapper: {
    width: '100%',
    height: 125,
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsCol: {
    padding: Spacing.sm + 2,
  },
  promoTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    lineHeight: 18,
  },
  promoSubtitle: {
    fontSize: Typography.sizes.xs + 1,
    color: '#6B7280',
    marginTop: 3,
    marginBottom: Spacing.xs,
  },
  detailLinkRow: {
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  detailLinkText: {
    fontSize: Typography.sizes.xs + 2,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
});
