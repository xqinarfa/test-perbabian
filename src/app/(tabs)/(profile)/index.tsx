import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { Header } from '@/components/ui';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title="Profil Saya" variant="white" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>HW</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Hendry Wijaya</Text>
            <View style={styles.badgeRow}>
              <View style={styles.vipBadge}>
                <Ionicons name="ribbon" size={12} color="#D97706" />
                <Text style={styles.vipText}>Member VIP Gold</Text>
              </View>
              <Text style={styles.pointsText}>1.450 Poin</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {[
            { icon: 'receipt-outline', label: 'Riwayat Pesanan' },
            { icon: 'pricetag-outline', label: 'Voucher & Kupon Saya' },
            { icon: 'shield-checkmark-outline', label: 'Standar & Sertifikasi Lard' },
            { icon: 'heart-outline', label: 'Favorit & Ulasan' },
            { icon: 'settings-outline', label: 'Pengaturan Akun' },
            { icon: 'help-circle-outline', label: 'Bantuan & FAQ' },
          ].map((item, idx) => (
            <Pressable
              key={idx}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.menuRow,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: Spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: 4,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  vipText: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: '#B45309',
  },
  pointsText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: Typography.weights.medium,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  menuLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
});
