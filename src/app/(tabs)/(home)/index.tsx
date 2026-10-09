import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants';
import { Header, SearchBar } from '@/components/ui';

// Modular sections
import {
  HeroCarouselSection,
  QuickActionsSection,
  FlashDealsSection,
  FavoritePorkSection,
  NearbyBranchesSection,
  VouchersSection,
} from '@/sections/home';

// Data fixtures
import { MOCK_PROMO_BANNERS, QUICK_ACTIONS, MOCK_VOUCHERS } from '@/data/promos';
import { MOCK_MENUS } from '@/data/menus';
import { MOCK_RESTAURANTS } from '@/data/restaurants';
import { MenuItem } from '@/types';

export default function HomeScreen() {
  const flashDealItems = MOCK_MENUS.filter((m: MenuItem) => m.discountPercent);

  return (
    <View style={styles.container}>
      {/* Brand Red Header */}
      <Header
        locationText="Pantai Indah Kapuk, Jakarta"
        onNotificationPress={() => {}}
        variant="red"
      />

      {/* Search Bar on Red Background */}
      <View style={styles.searchContainer}>
        <SearchBar
          value=""
          onPress={() => router.push('/search')}
          placeholder="Cari samcan, babi panggang, resto terdekat..."
          onFilterPress={() => router.push('/(tabs)/(directory)')}
        />
      </View>

      {/* Main Content Sections */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroCarouselSection banners={MOCK_PROMO_BANNERS} />
        <QuickActionsSection actions={QUICK_ACTIONS} />
        <FlashDealsSection items={flashDealItems} />
        <FavoritePorkSection />
        <NearbyBranchesSection branches={MOCK_RESTAURANTS} />
        <VouchersSection vouchers={MOCK_VOUCHERS} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm + 2,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
});
