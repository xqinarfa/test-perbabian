import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { Restaurant } from '@/types';

interface NearbyBranchesSectionProps {
  branches: Restaurant[];
}

export const NearbyBranchesSection: React.FC<NearbyBranchesSectionProps> = ({
  branches,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Cabang & Kedai Terdekat</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/(tabs)/(directory)')}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.seeMapText}>Lihat di Peta &gt;</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {branches.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            onPress={() => router.push(`/restaurant/${item.id}`)}
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.95 : 1 },
            ]}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.openBadge}>
                <Text style={styles.openText}>Buka</Text>
              </View>
            </View>

            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <View style={styles.addressRow}>
                <Ionicons name="location-outline" size={12} color="#6B7280" />
                <Text numberOfLines={1} style={styles.address}>
                  {item.address}
                </Text>
              </View>

              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Status Meja:</Text>
                <View style={styles.tableBadge}>
                  <Text style={styles.tableText}>
                    Tersedia {item.tablesAvailable || 6} Meja
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  seeMapText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semiBold,
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  card: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  openBadge: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: '#10B981',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  openText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weights.bold,
  },
  info: {
    padding: Spacing.xs + 2,
  },
  name: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    marginBottom: Spacing.xs,
  },
  address: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statusLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  tableBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  tableText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: Typography.weights.bold,
  },
});
