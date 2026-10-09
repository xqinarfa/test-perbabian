import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Typography, Spacing, BorderRadius } from '@/constants';

export const SearchBannerSection: React.FC = () => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Promo Spesial San Fu Lou Spring Collection"
      onPress={() => router.push('/menu')}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.95 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
      ]}
    >
      <View style={styles.bannerCard}>
        {/* Banner background / illustration */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
          }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.badgeRow}>
            <View style={styles.springBadge}>
              <Text style={styles.badgeText}>SAN FU LOU • LIMITED SPRING COLLECTION</Text>
            </View>
          </View>
          <Text style={styles.taglineText}>Eat With Joy</Text>
          <Text style={styles.subTaglineText}>Dimsum &amp; Samcan Tradisi Spesial Musim Ini</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  bannerCard: {
    height: 140,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#3B0909',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(50, 8, 8, 0.45)',
    padding: Spacing.md,
    justifyContent: 'center',
  },
  badgeRow: {
    marginBottom: 4,
  },
  springBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  badgeText: {
    color: '#FDE68A',
    fontSize: 9,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  taglineText: {
    color: '#FDE68A',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extraBold,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subTaglineText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.medium,
    marginTop: 2,
    opacity: 0.95,
  },
});
