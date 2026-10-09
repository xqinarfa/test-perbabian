import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing } from '@/constants';
import { Header, SearchBar } from '@/components/ui';
import {
  SavedFilterHeaderSection,
  SavedCollectionFoldersSection,
  SavedRestaurantCardSection,
} from '@/sections/saved';
import { MOCK_RESTAURANTS } from '@/data/restaurants';
import { Restaurant } from '@/types';

export default function SavedScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('restaurants');
  const [selectedSort, setSelectedSort] = useState('Terakhir Disimpan');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({
    'resto-1': true,
    'resto-2': true,
    'resto-3': true,
    'resto-4': true,
    'resto-5': true,
  });

  const handleToggle = useCallback((id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const savedList = useMemo(() => {
    return MOCK_RESTAURANTS.filter((r) => {
      const isSaved = bookmarkedIds[r.id] !== false;
      if (!isSaved) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.specialties.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [bookmarkedIds, searchQuery]);

  const renderHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        {/* Title, Badge, Tabs, & Sort */}
        <SavedFilterHeaderSection
          totalCount={savedList.length}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedSort={selectedSort}
          onSortPress={() => {
            setSelectedSort((prev) =>
              prev === 'Terakhir Disimpan' ? 'Rating Tertinggi' : 'Terakhir Disimpan'
            );
          }}
          onCreateCollectionPress={() => {}}
        />

        {/* Collection Folders Carousel */}
        <SavedCollectionFoldersSection
          onManagePress={() => {}}
          onSelectFolder={() => {}}
        />
      </View>
    ),
    [savedList.length, activeTab, selectedSort]
  );

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <SavedRestaurantCardSection
        restaurant={item}
        isBookmarked={bookmarkedIds[item.id] !== false}
        onBookmarkToggle={handleToggle}
        onRoutePress={() => router.push(`/restaurant/${item.id}`)}
      />
    ),
    [bookmarkedIds, handleToggle]
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Brand Red Header */}
      <Header
        locationText="Pantai Indah Kapuk, Jakarta"
        variant="red"
      />

      {/* Search Input on Red Background */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari samcan, babi panggang, resto terdekat..."
          showFilterButton={true}
          onFilterPress={() => {}}
        />
      </View>

      {/* Main List */}
      <FlatList
        data={savedList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Belum ada kedai tersimpan</Text>
            <Text style={styles.emptySubtitle}>
              Simpan kedai favorit Anda untuk akses cepat di sini
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm + 2,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: Spacing.xxl,
    marginTop: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
});
