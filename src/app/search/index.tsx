import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants';
import {
  SearchHeaderSection,
  SearchHistorySection,
  SearchBannerSection,
  SearchHolidayPromoSection,
  SearchExploreMenuSection,
  SearchResultsSection,
} from '@/sections/search';
import { MOCK_RESTAURANTS } from '@/data/restaurants';
import { MOCK_MENUS } from '@/data/menus';
import { Restaurant, MenuItem } from '@/types';

const INITIAL_HISTORY: string[] = [
  'Siomai',
  'Hotpot Sichuan',
  'Samcan Panggang',
  'Bakmi Khek',
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>(INITIAL_HISTORY);
  const [isSearching] = useState(false);

  // Filter restaurants & menus based on query
  const filteredRestaurants = useMemo<Restaurant[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return MOCK_RESTAURANTS.filter(
      (resto) =>
        resto.name.toLowerCase().includes(q) ||
        resto.tagline.toLowerCase().includes(q) ||
        resto.category.toLowerCase().includes(q) ||
        resto.area.toLowerCase().includes(q) ||
        resto.specialties.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredMenus = useMemo<MenuItem[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return MOCK_MENUS.filter(
      (dish) =>
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        dish.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelectHistoryItem = useCallback((item: string) => {
    setQuery(item);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleClearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const handleSubmitSearch = useCallback(() => {
    if (query.trim() && !history.includes(query.trim())) {
      setHistory((prev) => [query.trim(), ...prev.slice(0, 7)]);
    }
  }, [query, history]);

  const isQueryActive = query.trim().length > 0;

  return (
    <View style={styles.container}>
      {/* 1. Sticky Red Search Header with Back & Figma Pill Actions */}
      <SearchHeaderSection
        query={query}
        onChangeQuery={setQuery}
        onClearQuery={handleClearQuery}
        onSubmit={handleSubmitSearch}
      />

      {/* 2. Main Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {isQueryActive ? (
          // Active Search Results with 4-state UI
          <SearchResultsSection
            query={query}
            restaurants={filteredRestaurants}
            menus={filteredMenus}
            isLoading={isSearching}
            onClearQuery={handleClearQuery}
          />
        ) : (
          // Default Discovery View (Figma Pencarian.png)
          <>
            <SearchHistorySection
              history={history}
              onSelectQuery={handleSelectHistoryItem}
              onClearHistory={handleClearHistory}
            />
            <SearchBannerSection />
            <SearchHolidayPromoSection />
            <SearchExploreMenuSection />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
