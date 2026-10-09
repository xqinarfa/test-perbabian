import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { Header, SearchBar } from '@/components/ui';
import { FilterChipsSection, RestaurantCardSection } from '@/sections/directory';
import { MOCK_RESTAURANTS } from '@/data/restaurants';
import { Restaurant } from '@/types';

export default function DirectoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Semua Kota');
  const [selectedCategory, setSelectedCategory] = useState('Semua 124');
  const [activeFilterTag, setActiveFilterTag] = useState('Rating 4.8+');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const handleBookmarkToggle = useCallback((id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const filteredRestaurants = useMemo(() => {
    return MOCK_RESTAURANTS.filter((r) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        r.area.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'Semua 124' ||
        r.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchCity =
        selectedCity === 'Semua Kota' ||
        r.area.toLowerCase().includes('jakarta') ||
        r.area.toLowerCase().includes('pik');

      return matchSearch && matchCategory && matchCity;
    });
  }, [searchQuery, selectedCategory, selectedCity]);

  const renderHeader = useCallback(
    () => (
      <FilterChipsSection
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        activeFilterTag={activeFilterTag}
        onToggleFilterTag={(tag) =>
          setActiveFilterTag((curr) => (curr === tag ? '' : tag))
        }
        totalSelected={filteredRestaurants.length}
      />
    ),
    [selectedCity, selectedCategory, activeFilterTag, filteredRestaurants.length]
  );

  const renderFooter = useCallback(
    () => (
      <View style={styles.communityCard}>
        <Ionicons name="shield-checkmark-outline" size={24} color={Colors.primary} />
        <View style={styles.communityContent}>
          <Text style={styles.communityTitle}>Audit Transparansi Komunitas</Text>
          <Text style={styles.communityDesc}>
            Setiap kedai di direktori Perbabian diverifikasi langsung melalui inspeksi dapur, pelabelan jenis minyak, dan keterbukaan resep tradisi. Punya rekomendasi kuliner baru? Laporkan ke tim kurator kami.
          </Text>
        </View>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  return (
    <View style={styles.container}>
      <Header
        locationText="Pantai Indah Kapuk, Jakarta"
        variant="red"
      />

      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari samcan, babi panggang, resto terdekat..."
          showFilterButton={false}
        />
      </View>

      <FlatList
        data={filteredRestaurants}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <RestaurantCardSection
            restaurant={item}
            isBookmarked={!!bookmarkedIds[item.id]}
            onBookmarkToggle={handleBookmarkToggle}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingBottom: Spacing.xl,
  },
  communityCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    padding: Spacing.sm + 2,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  communityContent: {
    flex: 1,
  },
  communityTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
    marginBottom: 4,
  },
  communityDesc: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
});
