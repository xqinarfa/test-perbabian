import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Layout } from '@/constants';
import {
  LardCertificationSection,
  FacilitiesSection,
  LocationScheduleSection,
  ReviewsSection,
  MenuItemRowSection,
} from '@/sections/restaurant';
import { MOCK_RESTAURANTS } from '@/data/restaurants';
import { MOCK_MENUS } from '@/data/menus';
import { formatCompactPrice, formatDistance, formatReviewCount } from '@/utils';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const restaurant =
    MOCK_RESTAURANTS.find((r) => r.id === id) || MOCK_RESTAURANTS[0];

  const [activeTab, setActiveTab] = useState<'menu' | 'fasilitas' | 'lokasi' | 'ulasan'>('menu');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAllMenus, setShowAllMenus] = useState(false);

  const displayedMenus = showAllMenus
    ? MOCK_MENUS
    : [MOCK_MENUS[0], MOCK_MENUS[7], MOCK_MENUS[4]];

  return (
    <View style={styles.container}>
      {/* Sticky Top Navbar */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 12) }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </Pressable>

        <View style={styles.topBarTitleRow}>
          <Text numberOfLines={1} style={styles.topBarTitle}>
            {restaurant.name}
          </Text>
        </View>

        <View style={styles.topBarActions}>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons name="search-outline" size={20} color={Colors.textPrimary} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons name="share-social-outline" size={20} color={Colors.textPrimary} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isBookmarked ? Colors.primary : Colors.textPrimary}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Photo with overlay info */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: restaurant.imageUrl }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <View style={styles.heroAddressRow}>
              <Ionicons name="location-sharp" size={12} color="#FFFFFF" />
              <Text style={styles.heroAddressText}>{restaurant.address}</Text>
            </View>
            <View style={styles.heroTitleRow}>
              <Text style={styles.heroTitle}>{restaurant.name}</Text>
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.heroSubtitle}>{restaurant.tagline}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <View style={styles.statValRow}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.statVal}>{restaurant.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.statLabel}>
              {formatReviewCount(restaurant.reviewsCount)}+ Ulasan
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <View style={styles.statValRow}>
              <Ionicons name="navigate-outline" size={16} color={Colors.primary} />
              <Text style={styles.statVal}>{formatDistance(restaurant.distanceKm)}</Text>
            </View>
            <Text style={styles.statLabel}>Pantai Indah Kapuk</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <View style={styles.statValRow}>
              <Text style={styles.statVal}>
                {formatCompactPrice(restaurant.pricePerPerson)}
              </Text>
            </View>
            <Text style={styles.statLabel}>Perkiraan / orang</Text>
          </View>
        </View>

        {/* Action Buttons: Petunjuk Arah, Hubungi, Bagikan, Favorit */}
        <View style={styles.actionButtonsRow}>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.quickActionItem, { opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={styles.quickActionIconBox}>
              <Ionicons name="compass-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.quickActionLabel}>Petunjuk Arah</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.quickActionItem, { opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={styles.quickActionIconBox}>
              <Ionicons name="call-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.quickActionLabel}>Hubungi</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.quickActionItem, { opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={styles.quickActionIconBox}>
              <Ionicons name="share-social-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.quickActionLabel}>Bagikan</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={({ pressed }) => [styles.quickActionItem, { opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={styles.quickActionIconBox}>
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.quickActionLabel}>Favorit</Text>
          </Pressable>
        </View>

        {/* Standar Minyak & Bahan 100% Lard */}
        <LardCertificationSection />

        {/* Section Navigation Tabs */}
        <View style={styles.tabsRow}>
          {[
            { id: 'menu', label: 'Menu Unggulan' },
            { id: 'fasilitas', label: 'Fasilitas' },
            { id: 'lokasi', label: 'Lokasi & Jam' },
            { id: 'ulasan', label: 'Ulasan (1.2k)' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                accessibilityRole="button"
                onPress={() => setActiveTab(tab.id as typeof activeTab)}
                style={({ pressed }) => [
                  styles.sectionTab,
                  isActive && styles.activeSectionTab,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTabText,
                    isActive && styles.activeSectionTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Tab 1: Menu Unggulan / Semua Menu */}
        {activeTab === 'menu' && (
          <View>
            <View style={styles.menuSectionHeader}>
              <View>
                <Text style={styles.menuSectionTitle}>
                  {showAllMenus ? 'Seluruh Menu Restoran' : 'Pilihan Menu Andalan'}
                </Text>
                <Text style={styles.menuSectionSubtitle}>
                  {showAllMenus
                    ? `Menampilkan ${displayedMenus.length} hidangan lezat non-halal`
                    : 'Kelezatan babi paling sering dipesan minggu ini'}
                </Text>
              </View>
              <Ionicons name="restaurant-outline" size={18} color={Colors.primary} />
            </View>

            {displayedMenus.map((item) => (
              <MenuItemRowSection
                key={item.id}
                item={item}
              />
            ))}

            <Pressable
              accessibilityRole="button"
              onPress={() => setShowAllMenus(!showAllMenus)}
              style={({ pressed }) => [
                styles.openCatalogBtn,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={styles.openCatalogText}>
                {showAllMenus
                  ? 'Tampilkan Lebih Sedikit (Menu Andalan)'
                  : `Buka Katalog Lengkap (${MOCK_MENUS.length} Menu Non-Halal)`}
              </Text>
              <Ionicons
                name={showAllMenus ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={Colors.primary}
              />
            </Pressable>
          </View>
        )}

        {/* Tab 2: Fasilitas */}
        {activeTab === 'fasilitas' && (
          <FacilitiesSection facilities={restaurant.facilities} />
        )}

        {/* Tab 3: Lokasi & Jam */}
        {activeTab === 'lokasi' && (
          <LocationScheduleSection restaurant={restaurant} />
        )}

        {/* Tab 4: Ulasan */}
        {activeTab === 'ulasan' && (
          <ReviewsSection reviews={restaurant.reviews} />
        )}
      </ScrollView>

      {/* Sticky Bottom Actions Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.bottomIconBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#10B981" />
          <Text style={styles.bottomIconText}>Chat</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.bottomDirectionBtn, { opacity: pressed ? 0.8 : 1 }]}
        >
          <Ionicons name="navigate-outline" size={18} color="#1F2937" />
          <Text style={styles.bottomDirectionText}>Petunjuk Arah</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert(
              'Reservasi Meja',
              `Silakan hubungi ${restaurant.name} di area ${restaurant.area} untuk reservasi meja.`
            )
          }
          style={({ pressed }) => [styles.orderBtn, { opacity: pressed ? 0.9 : 1 }]}
        >
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
          <Text style={styles.orderBtnText}>Reservasi Meja</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  topBarTitleRow: {
    flex: 1,
    paddingHorizontal: Spacing.xs,
  },
  topBarTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    minWidth: Layout.minTouchTarget - 8,
    minHeight: Layout.minTouchTarget - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    height: 240,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  heroAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  heroAddressText: {
    color: '#E5E7EB',
    fontSize: 11,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extraBold,
    color: '#FFFFFF',
  },
  heroSubtitle: {
    color: '#F3F4F6',
    fontSize: 12,
    marginTop: 2,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statVal: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.extraBold,
    color: '#111827',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.sm + 2,
  },
  quickActionItem: {
    alignItems: 'center',
    width: '23%',
    minHeight: Layout.minTouchTarget,
  },
  quickActionIconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECDD3',
    marginBottom: 4,
  },
  quickActionLabel: {
    fontSize: 11,
    color: '#374151',
    fontWeight: Typography.weights.medium,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    marginVertical: Spacing.xs + 2,
  },
  sectionTab: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F3F4F6',
  },
  activeSectionTab: {
    backgroundColor: Colors.primary,
  },
  sectionTabText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: Typography.weights.semiBold,
  },
  activeSectionTabText: {
    color: '#FFFFFF',
  },
  menuSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xs + 2,
    marginBottom: Spacing.xxs + 2,
  },
  menuSectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  menuSectionSubtitle: {
    fontSize: 11,
    color: '#6B7280',
  },
  openCatalogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFF5F5',
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#FECDD3',
    minHeight: Layout.minTouchTarget,
  },
  openCatalogText: {
    color: Colors.primary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  bottomIconBtn: {
    alignItems: 'center',
    paddingHorizontal: 6,
    minHeight: Layout.minTouchTarget - 4,
    justifyContent: 'center',
  },
  bottomIconText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: Typography.weights.bold,
    marginTop: 2,
  },
  bottomDirectionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    minHeight: Layout.minTouchTarget - 4,
  },
  bottomDirectionText: {
    fontSize: 12,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
  },
  orderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 11,
    borderRadius: BorderRadius.md,
    minHeight: Layout.minTouchTarget - 4,
  },
  orderBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
  },
});
