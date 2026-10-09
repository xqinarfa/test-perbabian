import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

interface CategoryTabsSectionProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  tags?: string[];
  activeTag?: string;
  onSelectTag?: (tag: string) => void;
}

const getTagIcon = (tag: string) => {
  if (tag.includes('Terlaris')) return '🔥 ';
  if (tag.includes('Chef') || tag.includes('Rekomendasi')) return '⭐ ';
  if (tag.includes('Pedas')) return '🌶️ ';
  if (tag.includes('Lard')) return '💧 ';
  return '';
};

export const CategoryTabsSection: React.FC<CategoryTabsSectionProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  tags = ['Terlaris', 'Rekomendasi Chef', 'Pedas', '100% Lard'],
  activeTag = '',
  onSelectTag,
}) => {
  return (
    <View style={styles.container}>
      {/* Category Tabs Row */}
      <View style={styles.categoryTabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Pressable
                key={cat}
                accessibilityRole="button"
                onPress={() => onSelectCategory(cat)}
                style={({ pressed }) => [
                  styles.tabItem,
                  { opacity: pressed ? 0.75 : 1 },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive && styles.activeTabText,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Filter Tags Row with 4pt/8pt rhythm breathing space */}
      {tags.length > 0 && onSelectTag && (
        <View style={styles.tagsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsScroll}
          >
            {tags.map((tag) => {
              const isTagActive = activeTag === tag;
              const icon = getTagIcon(tag);
              return (
                <Pressable
                  key={tag}
                  accessibilityRole="button"
                  onPress={() => onSelectTag(isTagActive ? '' : tag)}
                  style={({ pressed }) => [
                    styles.tagPill,
                    isTagActive ? styles.tagPillActive : styles.tagPillInactive,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      isTagActive ? styles.tagTextActive : styles.tagTextInactive,
                    ]}
                  >
                    {icon}
                    {tag}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryTabsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  tabItem: {
    paddingVertical: Spacing.sm + 2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: Colors.primary,
    borderRadius: 1.5,
  },
  tabText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semiBold,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#111827',
    fontWeight: Typography.weights.bold,
  },
  tagsContainer: {
    paddingVertical: Spacing.sm + 4, // 12pt breathing space on 4pt/8pt grid
  },
  tagsScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs + 4, // 8pt gap
  },
  tagPill: {
    paddingHorizontal: Spacing.sm + 4, // 12pt padding
    paddingVertical: 7,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  tagPillActive: {
    backgroundColor: '#FEE2E2',
    borderColor: Colors.primary,
  },
  tagPillInactive: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  tagText: {
    fontSize: 12,
    fontWeight: Typography.weights.medium,
  },
  tagTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  tagTextInactive: {
    color: '#374151',
  },
});
