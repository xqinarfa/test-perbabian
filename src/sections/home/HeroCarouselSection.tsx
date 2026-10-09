import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { Typography, Spacing, BorderRadius } from '@/constants';
import { PromoBanner } from '@/types';

interface HeroCarouselSectionProps {
  banner?: PromoBanner;
  banners?: PromoBanner[];
}

export const HeroCarouselSection: React.FC<HeroCarouselSectionProps> = ({
  banner,
  banners,
}) => {
  const { width } = useWindowDimensions();
  // Card width matches screen width minus horizontal padding
  const cardWidth = width - Spacing.md * 2;

  // Normalize list of banners
  const bannerList: PromoBanner[] = banners && banners.length > 0
    ? banners
    : banner
    ? [banner]
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<PromoBanner>>(null);
  const isInteracting = useRef(false);

  // Auto-slide every 3.8 seconds like Tokopedia
  useEffect(() => {
    if (bannerList.length <= 1) return;

    const interval = setInterval(() => {
      if (!isInteracting.current) {
        setActiveIndex((prev) => {
          const nextIndex = (prev + 1) % bannerList.length;
          flatListRef.current?.scrollToOffset({
            offset: nextIndex * cardWidth,
            animated: true,
          });
          return nextIndex;
        });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [bannerList.length, cardWidth]);

  // Sync active index when user manually swipes
  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / cardWidth);
      if (index >= 0 && index < bannerList.length) {
        setActiveIndex(index);
      }
      isInteracting.current = false;
    },
    [bannerList.length, cardWidth]
  );

  const onScrollBeginDrag = useCallback(() => {
    isInteracting.current = true;
  }, []);

  const renderBannerItem = ({ item }: { item: PromoBanner }) => (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push('/menu')}
      style={({ pressed }) => [
        { width: cardWidth },
        { opacity: pressed ? 0.96 : 1 },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.topBadgeRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>Perbabian</Text>
          </View>
          <View style={styles.festBadge}>
            <Text style={styles.festText}>{item.badge}</Text>
          </View>
        </View>

        <View style={styles.contentRow}>
          {/* Circular dish preview with fiery tag */}
          <View style={styles.imageCircleWrapper}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.imageCircle}
              resizeMode="cover"
            />
            <View style={styles.krispiBadge}>
              <Text style={styles.krispiText}>🔥 {item.tag}</Text>
            </View>
          </View>

          {/* Banner Promo Info */}
          <View style={styles.infoCol}>
            <Text style={styles.subTitle}>{item.title}</Text>
            <Text style={styles.mainTitle}>{item.subtitle}</Text>
            <Text style={styles.priceNote}>Mulai dari</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.priceUnit}>{item.priceNote}</Text>
            </View>
            <Text style={styles.termsText} numberOfLines={2}>
              {item.terms}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  if (bannerList.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Swipeable & Auto-scrolling list */}
      <FlatList
        ref={flatListRef}
        data={bannerList}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        getItemLayout={(_, index) => ({
          length: cardWidth,
          offset: cardWidth * index,
          index,
        })}
      />

      {/* Dynamic Interactive Dot Indicators */}
      {bannerList.length > 1 && (
        <View style={styles.dotsRow}>
          {bannerList.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Pressable
                key={idx}
                accessibilityRole="button"
                accessibilityLabel={`Banner ${idx + 1}`}
                onPress={() => {
                  setActiveIndex(idx);
                  flatListRef.current?.scrollToOffset({
                    offset: idx * cardWidth,
                    animated: true,
                  });
                }}
                hitSlop={6}
              >
                <View style={[styles.dot, isActive && styles.activeDot]} />
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  card: {
    backgroundColor: '#7A0C0C',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#D97706',
    overflow: 'hidden',
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  logoBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  logoText: {
    color: '#BC1D1D',
    fontSize: 10,
    fontWeight: Typography.weights.extraBold,
  },
  festBadge: {
    backgroundColor: '#260404',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  festText: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  imageCircleWrapper: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: '#F59E0B',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  krispiBadge: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: '#D97706',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  krispiText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  infoCol: {
    flex: 1,
  },
  subTitle: {
    color: '#FDE68A',
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extraBold,
    marginVertical: 2,
  },
  priceNote: {
    color: '#FCA5A5',
    fontSize: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    color: '#FDE68A',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extraBold,
  },
  priceUnit: {
    color: '#FEE2E2',
    fontSize: 10,
  },
  termsText: {
    color: '#E5E7EB',
    fontSize: 9,
    marginTop: 2,
    opacity: 0.85,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    width: 20,
    borderRadius: 4,
    backgroundColor: '#D97706',
  },
});
