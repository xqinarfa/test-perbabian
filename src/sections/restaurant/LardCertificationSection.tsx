import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';

export const LardCertificationSection: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleWithShield}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
          <View>
            <Text style={styles.title}>Standar Minyak & Bahan 100% Lard</Text>
            <Text style={styles.subtitle}>KOMITMEN RASA OTENTIK PERBABIAN</Text>
          </View>
        </View>
        <View style={styles.pureBadge}>
          <Text style={styles.pureText}>100% MURNI</Text>
        </View>
      </View>

      <View style={styles.featuresRow}>
        <View style={styles.featureBox}>
          <Ionicons name="water" size={16} color={Colors.primary} />
          <Text style={styles.featTitle}>Lard Murni</Text>
          <Text style={styles.featDesc}>Olahan Harian</Text>
        </View>

        <View style={styles.featureBox}>
          <Ionicons name="flame" size={16} color="#EA580C" />
          <Text style={styles.featTitle}>Cast Iron</Text>
          <Text style={styles.featDesc}>Suhu 220°C Crispy</Text>
        </View>

        <View style={styles.featureBox}>
          <Ionicons name="restaurant" size={16} color="#0D9488" />
          <Text style={styles.featTitle}>Daging Segar</Text>
          <Text style={styles.featDesc}>Bukan Beku Impor</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        style={({ pressed }) => [
          styles.expandRow,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.expandText}>
          Lihat Spesifikasi & Sertifikat Dapur
        </Text>
        <Ionicons name="chevron-down" size={14} color="#6B7280" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF5F5',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md - 2,
    borderWidth: 1,
    borderColor: '#FECDD3',
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs + 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleWithShield: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  title: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#111827',
  },
  subtitle: {
    fontSize: 9,
    color: '#9CA3AF',
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  pureBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  pureText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  featureBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },
  featTitle: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: '#1F2937',
    marginTop: 4,
  },
  featDesc: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  expandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#FFE4E6',
  },
  expandText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: Typography.weights.medium,
  },
});
