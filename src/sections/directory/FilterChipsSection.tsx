import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

interface FilterChipsSectionProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  activeFilterTag: string;
  onToggleFilterTag: (tag: string) => void;
  totalSelected: number;
}

const CITIES = ['Semua Kota', 'Jakarta (PIK, Muara Karang, Mangga Besar)'];
const CATEGORIES = ['Semua 124', 'Samcan & Panggang', 'Bakmi & Nasi'];
const TAGS = ['Rating 4.8+', 'Terpopuler', 'Dapur Terbuka'];

export const FilterChipsSection: React.FC<FilterChipsSectionProps> = ({
  selectedCity,
  onSelectCity,
  selectedCategory,
  onSelectCategory,
  activeFilterTag,
  onToggleFilterTag,
  totalSelected,
}) => {
  return (
    <View>
      {/* City Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {CITIES.map((city) => {
          const isActive = selectedCity === city;
          return (
            <Pressable
              key={city}
              accessibilityRole="button"
              onPress={() => onSelectCity(city)}
              style={({ pressed }) => [
                styles.filterPill,
                isActive ? styles.filterPillActive : styles.filterPillInactive,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isActive ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                {city}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <Pressable
              key={cat}
              accessibilityRole="button"
              onPress={() => onSelectCategory(cat)}
              style={({ pressed }) => [
                styles.filterPill,
                isActive ? styles.filterPillActiveRed : styles.filterPillInactive,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isActive ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Standar Transparansi Bahan Banner */}
      <View style={styles.transparencyBanner}>
        <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
        <View style={styles.transparencyTextCol}>
          <Text style={styles.transparencyTitle}>
            Standar Transparansi Bahan
          </Text>
          <Text style={styles.transparencyDesc}>
            Bukan sekadar makan, jaminan kejelasan dapur & minyak
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          style={({ pressed }) => [styles.infoLink, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.infoLinkText}>Info &gt;</Text>
        </Pressable>
      </View>

      {/* Quick Tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsRow}
      >
        {TAGS.map((tag) => {
          const isActive = activeFilterTag === tag;
          return (
            <Pressable
              key={tag}
              accessibilityRole="button"
              onPress={() => onToggleFilterTag(tag)}
              style={({ pressed }) => [
                styles.quickTag,
                isActive ? styles.quickTagActive : styles.quickTagInactive,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text
                style={[
                  styles.quickTagText,
                  isActive ? styles.quickTagTextActive : styles.quickTagTextInactive,
                ]}
              >
                {tag === 'Rating 4.8+' ? '⭐ ' : tag === 'Terpopuler' ? '🔥 ' : '🍳 '}
                {tag}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Directory Title and Sort */}
      <View style={styles.titleRow}>
        <Text style={styles.listTitle}>
          Direktori Kuliner ({totalSelected} Terpilih)
        </Text>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          style={({ pressed }) => [styles.sortBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Ionicons name="swap-vertical" size={14} color="#4B5563" />
          <Text style={styles.sortText}>Jarak Terdekat</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  filterPill: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  filterPillActive: {
    backgroundColor: '#1E293B',
  },
  filterPillActiveRed: {
    backgroundColor: Colors.primary,
  },
  filterPillInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterPillText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semiBold,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  filterPillTextInactive: {
    color: '#4B5563',
  },
  transparencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#FECDD3',
    gap: Spacing.xs,
  },
  transparencyTextCol: {
    flex: 1,
  },
  transparencyTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  transparencyDesc: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  infoLink: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  infoLinkText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  tagsRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    marginTop: Spacing.xs + 2,
    marginBottom: 4,
  },
  quickTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  quickTagActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  quickTagInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  quickTagText: {
    fontSize: 11,
    fontWeight: Typography.weights.medium,
  },
  quickTagTextActive: {
    color: '#92400E',
    fontWeight: Typography.weights.bold,
  },
  quickTagTextInactive: {
    color: '#4B5563',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  listTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: Typography.sizes.xs,
    color: '#4B5563',
    fontWeight: Typography.weights.medium,
  },
});
