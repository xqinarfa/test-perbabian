import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
} from 'react-native';
import { router } from 'expo-router';
import { Typography, Spacing, Layout } from '@/constants';
import { Header, SearchBar } from '@/components/ui';
import { CategoryTabsSection } from '@/sections/menu';
import { MenuItemRowSection } from '@/sections/restaurant';
import { MOCK_MENUS } from '@/data/menus';
import { MenuItem } from '@/types';

const CATEGORY_TABS = [
  'Semua Menu (38)',
  'Samcan & Panggang (8)',
  'Aneka Bakmi & Nasi (10)',
  'Dimsum Babi (12)',
];

export default function MenuCatalogScreen() {
  const [activeTab, setActiveTab] = useState('Semua Menu (38)');
  const [activeTag, setActiveTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenus = useMemo(() => {
    return MOCK_MENUS.filter((item) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab =
        activeTab.includes('Semua') ||
        (activeTab.includes('Samcan') && item.category === 'samcan') ||
        (activeTab.includes('Bakmi') && item.category === 'bakmi') ||
        (activeTab.includes('Dimsum') && item.category === 'dimsum');

      const matchTag =
        !activeTag ||
        (activeTag === 'Terlaris' && item.isBestseller) ||
        (activeTag === 'Rekomendasi Chef' && item.isChefPick) ||
        (activeTag === 'Pedas' && item.isSpicy);

      return matchSearch && matchTab && matchTag;
    });
  }, [activeTab, activeTag, searchQuery]);

  const groupedMenus = useMemo(() => {
    const samcanList = filteredMenus.filter((m) => m.category === 'samcan');
    const bakmiList = filteredMenus.filter((m) => m.category === 'bakmi');
    const dimsumList = filteredMenus.filter((m) => m.category === 'dimsum');
    const supList = filteredMenus.filter((m) => m.category === 'sup');

    return [
      { title: 'Samcan & Spesialis Panggang (Signature)', data: samcanList },
      { title: 'Aneka Bakmi & Nasi Gurih', data: bakmiList },
      { title: 'Dimsum Babi Spesial & Kudapan', data: dimsumList },
      { title: 'Sup, Kuah & Minuman Segar', data: supList },
    ].filter((group) => group.data.length > 0);
  }, [filteredMenus]);

  const renderSectionHeader = useCallback(
    ({ section: { title, data } }: { section: { title: string; data: MenuItem[] } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionCount}>{data.length} Menu</Text>
      </View>
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <MenuItemRowSection item={item} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Header
        title={`Katalog Menu Lengkap (${MOCK_MENUS.length})`}
        showBack
        onBack={() => router.back()}
        variant="white"
      />

      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari di antara 38 menu samcan, bakmi, dimsum"
          showFilterButton={false}
        />
      </View>

      <CategoryTabsSection
        categories={CATEGORY_TABS}
        activeCategory={activeTab}
        onSelectCategory={setActiveTab}
        activeTag={activeTag}
        onSelectTag={setActiveTag}
      />

      <SectionList
        sections={groupedMenus}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSearchBtn: {
    minWidth: Layout.minTouchTarget - 8,
    minHeight: Layout.minTouchTarget - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxs + 2,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    flex: 1,
  },
  sectionCount: {
    fontSize: Typography.sizes.xs,
    color: '#6B7280',
    fontWeight: Typography.weights.medium,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
});
