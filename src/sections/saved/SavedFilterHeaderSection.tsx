import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

interface SavedFilterHeaderSectionProps {
  totalCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedSort: string;
  onSortPress: () => void;
  onCreateCollectionPress: () => void;
}

const TABS = [
  { id: 'restaurants', label: 'Restoran & Kedai (8)', icon: 'restaurant' },
  { id: 'dishes', label: 'Menu Favorit (15)', icon: 'fast-food' },
  { id: 'wishlist', label: 'Wishlist Kunjungan (6)', icon: 'compass' },
];

export const SavedFilterHeaderSection: React.FC<SavedFilterHeaderSectionProps> = ({
  totalCount,
  activeTab,
  onTabChange,
  selectedSort,
  onSortPress,
  onCreateCollectionPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Title & Badge Row */}
      <View style={styles.titleRow}>
        <View style={styles.titleWithBadge}>
          <Text style={styles.titleText}>Tersimpan</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{totalCount} KEDAI</Text>
          </View>
        </View>
        <Text style={styles.subtitleText}>Koleksi Restoran & Kuliner Favoritmu</Text>
      </View>

      {/* Category Pills (Restoran & Kedai, Menu Favorit, Wishlist) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScroll}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              onPress={() => onTabChange(tab.id)}
              style={({ pressed }) => [
                styles.tabPill,
                isActive ? styles.tabPillActive : styles.tabPillInactive,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Ionicons
                name={tab.icon as keyof typeof Ionicons.glyphMap}
                size={14}
                color={isActive ? '#FFFFFF' : '#4B5563'}
              />
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Sort Dropdown & + Buat Koleksi Row */}
      <View style={styles.actionRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onSortPress}
          hitSlop={8}
          style={({ pressed }) => [styles.sortBtn, { opacity: pressed ? 0.75 : 1 }]}
        >
          <Text style={styles.sortText}>{selectedSort}</Text>
          <Ionicons name="chevron-down" size={14} color="#374151" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onCreateCollectionPress}
          style={({ pressed }) => [styles.createBtn, { opacity: pressed ? 0.85 : 1 }]}
        >
          <Ionicons name="folder-outline" size={14} color={Colors.primary} />
          <Text style={styles.createBtnText}>+ Buat Koleksi</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  titleRow: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: Typography.sizes.xl + 2,
    fontWeight: Typography.weights.extraBold,
    color: '#111827',
  },
  countBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  countBadgeText: {
    color: '#B91C1C',
    fontSize: 10,
    fontWeight: Typography.weights.bold,
  },
  subtitleText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  tabScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    marginVertical: Spacing.xs,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  tabPillActive: {
    backgroundColor: Colors.primary,
  },
  tabPillInactive: {
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 12,
    fontWeight: Typography.weights.semiBold,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabTextInactive: {
    color: '#374151',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  createBtnText: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
});
