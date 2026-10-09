import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

interface SearchHeaderSectionProps {
  query: string;
  onChangeQuery: (text: string) => void;
  onClearQuery: () => void;
  onSubmit?: () => void;
}

export const SearchHeaderSection: React.FC<SearchHeaderSectionProps> = ({
  query,
  onChangeQuery,
  onClearQuery,
  onSubmit,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + (Platform.OS === 'ios' ? 4 : 8) }]}>
      <View style={styles.headerRow}>
        {/* Back Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>

        {/* Search Input Box */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Cari"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            returnKeyType="search"
            autoFocus
            onSubmitEditing={onSubmit}
          />
          {query.length > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Hapus pencarian"
              onPress={onClearQuery}
              hitSlop={8}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons name="close-circle" size={17} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        {/* Capsule Action [ ••• | ✕ ] matching Figma design */}
        <View style={styles.capsuleActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Opsi lainnya"
            onPress={() => {}}
            hitSlop={4}
            style={({ pressed }) => [styles.capsuleBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="ellipsis-horizontal" size={15} color="#FFFFFF" />
          </Pressable>
          <View style={styles.capsuleDivider} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tutup pencarian"
            onPress={() => router.back()}
            hitSlop={4}
            style={({ pressed }) => [styles.capsuleBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="close" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm + 4,
    paddingBottom: Spacing.sm + 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    height: 38,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.sm + 1,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  capsuleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 18,
    paddingHorizontal: 6,
    height: 32,
  },
  capsuleBtn: {
    paddingHorizontal: 6,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capsuleDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 1,
  },
});
