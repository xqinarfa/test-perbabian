import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { RestaurantFacility } from '@/types';

interface FacilitiesSectionProps {
  facilities?: RestaurantFacility[];
}

const DEFAULT_FACILITIES: RestaurantFacility[] = [
  { id: 'f-1', name: 'Ruang Full AC Dingin', iconName: 'snow' },
  { id: 'f-2', name: 'Area Bebas Rokok', iconName: 'ban' },
  { id: 'f-3', name: 'Parkir Ruko Luas', iconName: 'car' },
  { id: 'f-4', name: 'Wi-Fi Cepat 100 Mbps', iconName: 'wifi' },
  { id: 'f-5', name: 'QRIS, Debit & CC', iconName: 'card' },
  { id: 'f-6', name: 'Kursi Balita (Baby Chair)', iconName: 'people' },
];

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ facilities }) => {
  const displayFacilities =
    facilities && facilities.length > 0 ? facilities : DEFAULT_FACILITIES;

  // Split into left column (AC, Parkir, QRIS) & right column (Bebas Rokok, Wi-Fi, Kursi Balita)
  const leftItemKeys: RestaurantFacility['iconName'][] = ['snow', 'car', 'card'];
  const rightItemKeys: RestaurantFacility['iconName'][] = ['ban', 'wifi', 'people'];

  const leftItems = leftItemKeys
    .map((key) => displayFacilities.find((f) => f.iconName === key))
    .filter(Boolean) as RestaurantFacility[];

  const rightItems = rightItemKeys
    .map((key) => displayFacilities.find((f) => f.iconName === key))
    .filter(Boolean) as RestaurantFacility[];

  // Fallback if custom facilities are passed that don't match the standard keys
  const renderedLeft = leftItems.length > 0 ? leftItems : displayFacilities.slice(0, 3);
  const renderedRight = rightItems.length > 0 ? rightItems : displayFacilities.slice(3, 6);

  const renderFacilityIcon = (iconName: RestaurantFacility['iconName']) => {
    switch (iconName) {
      case 'snow':
        return (
          <Ionicons
            name="snow"
            size={19}
            color="#475569"
            style={styles.iconCenter}
          />
        );
      case 'ban':
        return (
          <MaterialCommunityIcons
            name="smoking-off"
            size={20}
            color="#991B1B"
            style={styles.iconCenter}
          />
        );
      case 'car':
        return (
          <View style={styles.parkingLetterBox}>
            <Text style={styles.parkingLetter}>P</Text>
          </View>
        );
      case 'wifi':
        return (
          <Ionicons
            name="wifi"
            size={19}
            color="#3B82F6"
            style={styles.iconCenter}
          />
        );
      case 'card':
        return (
          <Ionicons
            name="card-outline"
            size={19}
            color="#1F2937"
            style={styles.iconCenter}
          />
        );
      case 'people':
        return (
          <MaterialCommunityIcons
            name="human-male-female-child"
            size={21}
            color="#991B1B"
            style={styles.iconCenter}
          />
        );
      default:
        return (
          <Ionicons
            name="checkmark-circle-outline"
            size={19}
            color={Colors.primary}
            style={styles.iconCenter}
          />
        );
    }
  };

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Ionicons name="storefront-outline" size={20} color="#991B1B" />
        <Text style={styles.headerTitle}>Fasilitas Restoran & Kenyamanan</Text>
      </View>

      {/* Two Balanced Columns */}
      <View style={styles.columnsContainer}>
        {/* Left Column: AC, Parkir, QRIS */}
        <View style={styles.column}>
          {renderedLeft.map((item) => (
            <View key={item.id} style={styles.facilityItem}>
              {renderFacilityIcon(item.iconName)}
              <Text numberOfLines={1} style={styles.facilityText}>
                {item.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Right Column: Bebas Rokok, Wi-Fi, Kursi Balita */}
        <View style={styles.column}>
          {renderedRight.map((item) => (
            <View key={item.id} style={styles.facilityItem}>
              {renderFacilityIcon(item.iconName)}
              <Text numberOfLines={1} style={styles.facilityText}>
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 10,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 12,
    paddingVertical: 13,
    minHeight: 48,
    gap: 10,
  },
  iconCenter: {
    width: 22,
    textAlign: 'center',
  },
  parkingLetterBox: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parkingLetter: {
    fontSize: 17,
    fontWeight: '900',
    color: '#991B1B',
    lineHeight: 20,
  },
  facilityText: {
    fontSize: 12.5,
    color: '#1F2937',
    fontWeight: Typography.weights.semiBold,
    flex: 1,
  },
});
