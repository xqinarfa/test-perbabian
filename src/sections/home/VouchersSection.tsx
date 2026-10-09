import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants';
import { Voucher } from '@/types';

interface VouchersSectionProps {
  vouchers: Voucher[];
}

export const VouchersSection: React.FC<VouchersSectionProps> = ({
  vouchers,
}) => {
  const [claimedIds, setClaimedIds] = useState<Record<string, boolean>>({});

  const handleClaim = (id: string) => {
    setClaimedIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Voucher Hemat Hari Ini</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/menu')}
          hitSlop={8}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.seeAllText}>Lihat Semua &gt;</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {vouchers.map((voucher) => {
          const isClaimed = claimedIds[voucher.id];
          return (
            <View key={voucher.id} style={styles.voucherCard}>
              <View style={styles.topRow}>
                <View
                  style={[
                    styles.badge,
                    voucher.type === 'discount'
                      ? styles.badgeDiscount
                      : styles.badgeCashback,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      voucher.type === 'discount'
                        ? styles.badgeDiscountText
                        : styles.badgeCashbackText,
                    ]}
                  >
                    {voucher.badge}
                  </Text>
                </View>
                {voucher.type === 'discount' && <Text style={styles.fireIcon}>🔥</Text>}
              </View>

              <Text style={styles.voucherTitle}>{voucher.title}</Text>
              <Text style={styles.expiryText}>⏰ {voucher.expiryText}</Text>

              <View style={styles.dashedLine} />

              <View style={styles.bottomRow}>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{voucher.code}</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => handleClaim(voucher.id)}
                  disabled={isClaimed}
                  style={({ pressed }) => [
                    styles.claimBtn,
                    isClaimed && styles.claimedBtn,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={styles.claimText}>
                    {isClaimed ? 'Terklaim' : 'Klaim'}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
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
  seeAllText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semiBold,
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  voucherCard: {
    width: 250,
    backgroundColor: '#FFFBEB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  badgeDiscount: {
    backgroundColor: '#FEE2E2',
  },
  badgeCashback: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
  },
  badgeDiscountText: {
    color: '#DC2626',
  },
  badgeCashbackText: {
    color: '#D97706',
  },
  fireIcon: {
    fontSize: 14,
  },
  voucherTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginTop: 6,
  },
  expiryText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginVertical: Spacing.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
  },
  codeText: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    color: '#4B5563',
  },
  claimBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  claimedBtn: {
    backgroundColor: '#10B981',
  },
  claimText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: Typography.weights.bold,
  },
});
