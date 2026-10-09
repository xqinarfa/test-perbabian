import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Spacing, BorderRadius } from '@/constants';

interface SearchHistorySectionProps {
  history: string[];
  onSelectQuery: (item: string) => void;
  onClearHistory: () => void;
}

export const SearchHistorySection: React.FC<SearchHistorySectionProps> = ({
  history,
  onSelectQuery,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Riwayat pencarian</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Hapus semua riwayat pencarian"
          onPress={onClearHistory}
          hitSlop={8}
          style={({ pressed }) => [styles.trashBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="trash-outline" size={19} color="#6B7280" />
        </Pressable>
      </View>

      <View style={styles.chipsContainer}>
        {history.map((item, index) => (
          <Pressable
            key={`${item}-${index}`}
            accessibilityRole="button"
            onPress={() => onSelectQuery(item)}
            style={({ pressed }) => [
              styles.chip,
              { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm + 2,
  },
  title: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: Typography.weights.semiBold,
    color: '#1F2937',
  },
  trashBtn: {
    padding: 4,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
  },
  chipText: {
    fontSize: Typography.sizes.xs + 2,
    color: '#374151',
    fontWeight: Typography.weights.medium,
  },
});
