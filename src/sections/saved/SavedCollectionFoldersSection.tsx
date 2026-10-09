import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

interface CollectionFolder {
  id: string;
  name: string;
  count: number;
  emoji: string;
  bgColor: string;
}

const FOLDERS: CollectionFolder[] = [
  {
    id: 'f-1',
    name: 'Samcan Terkrispi',
    count: 4,
    emoji: '🔥',
    bgColor: '#FFF1F2',
  },
  {
    id: 'f-2',
    name: 'Bakmi & Lomie Pagi',
    count: 3,
    emoji: '🍜',
    bgColor: '#EFF6FF',
  },
  {
    id: 'f-3',
    name: 'Kuliner Liburan',
    count: 5,
    emoji: '🏖️',
    bgColor: '#ECFDF5',
  },
  {
    id: 'f-4',
    name: 'Dimsum & Camilan',
    count: 2,
    emoji: '🥟',
    bgColor: '#FEF3C7',
  },
];

interface SavedCollectionFoldersSectionProps {
  onManagePress?: () => void;
  onSelectFolder?: (folderId: string) => void;
}

export const SavedCollectionFoldersSection: React.FC<SavedCollectionFoldersSectionProps> = ({
  onManagePress,
  onSelectFolder,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>FOLDER KOLEKSI SAYA</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onManagePress}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.manageText}>Kelola</Text>
        </Pressable>
      </View>

      {/* Horizontal Folders Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {FOLDERS.map((folder) => (
          <Pressable
            key={folder.id}
            accessibilityRole="button"
            onPress={() => onSelectFolder?.(folder.id)}
            style={({ pressed }) => [
              styles.folderCard,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            {/* Top row: Emoji & folder icon */}
            <View style={styles.cardTopRow}>
              <View style={[styles.emojiBadge, { backgroundColor: folder.bgColor }]}>
                <Text style={styles.emojiText}>{folder.emoji}</Text>
              </View>
              <Ionicons name="folder-outline" size={16} color="#9CA3AF" />
            </View>

            {/* Folder Name & Count */}
            <Text numberOfLines={1} style={styles.folderName}>
              {folder.name}
            </Text>
            <Text style={styles.folderCount}>{folder.count} tempat tersimpan</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.xs + 2,
    marginBottom: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs + 2,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  manageText: {
    fontSize: 12,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  scrollList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs + 2,
  },
  folderCard: {
    width: 146,
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  emojiBadge: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 16,
  },
  folderName: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
    color: '#111827',
    marginBottom: 2,
  },
  folderCount: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: Typography.weights.medium,
  },
});
