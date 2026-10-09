import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { Restaurant } from '@/types';

interface LocationScheduleSectionProps {
  restaurant: Restaurant;
  onOpenMap?: () => void;
}

export const LocationScheduleSection: React.FC<LocationScheduleSectionProps> = ({
  restaurant,
  onOpenMap,
}) => {
  const handleMapPress = () => {
    if (onOpenMap) {
      onOpenMap();
    } else {
      const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`);
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    }
  };

  return (
    <View style={styles.card}>
      {/* Header with Title & Peta Link */}
      <View style={styles.headerRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title}>Lokasi & Jam Operasional</Text>
          <Text style={styles.address}>{restaurant.address}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={handleMapPress}
          style={({ pressed }) => [styles.mapLinkBtn, { opacity: pressed ? 0.75 : 1 }]}
        >
          <Text style={styles.mapLinkText}>Peta</Text>
          <Ionicons name="open-outline" size={13} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Styled Map Preview Card */}
      <View style={styles.mapCard}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
          }}
          style={styles.mapImage}
        />
        {/* Floating Resto Pin Pill */}
        <View style={styles.pinPill}>
          <Ionicons name="restaurant" size={14} color={Colors.primary} />
          <Text style={styles.pinText}>{restaurant.name}</Text>
        </View>
      </View>

      {/* Operating Hours Table */}
      <View style={styles.hoursCard}>
        <View style={styles.hourRow}>
          <Text style={styles.hourDay}>Senin - Jumat</Text>
          <Text style={styles.hourTime}>10:00 - 21:30 WIB</Text>
        </View>
        <View style={[styles.hourRow, styles.weekendRow]}>
          <Text style={styles.weekendDay}>Sabtu - Minggu</Text>
          <Text style={styles.weekendTime}>09:00 - 22:00 WIB</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleCol: {
    flex: 1,
    marginRight: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  address: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  mapLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: BorderRadius.md,
  },
  mapLinkText: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  mapCard: {
    height: 140,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinPill: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pinText: {
    fontSize: 11,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
  },
  hoursCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  hourDay: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: Typography.weights.medium,
  },
  hourTime: {
    fontSize: 11,
    color: '#111827',
    fontWeight: Typography.weights.bold,
  },
  weekendRow: {
    backgroundColor: '#FFF5F5',
    borderBottomWidth: 0,
  },
  weekendDay: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  weekendTime: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
});
