import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Layout } from '../../constants';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  locationText?: string;
  onNotificationPress?: () => void;
  rightAction?: React.ReactNode;
  variant?: 'red' | 'white';
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  locationText,
  onNotificationPress,
  rightAction,
  variant = 'red',
}) => {
  const insets = useSafeAreaInsets();
  const isRed = variant === 'red';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 12) },
        isRed ? styles.containerRed : styles.containerWhite,
      ]}
    >
      <StatusBar
        barStyle={isRed ? 'light-content' : 'dark-content'}
        backgroundColor={isRed ? Colors.primary : Colors.surface}
      />
      <View style={styles.contentRow}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={handleBack}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isRed ? Colors.textLight : Colors.textPrimary}
            />
          </Pressable>
        ) : null}

        {locationText ? (
          <View style={styles.locationContainer}>
            <View style={styles.locationHeaderRow}>
              <Ionicons
                name="location-sharp"
                size={14}
                color={isRed ? '#FCA5A5' : Colors.primary}
              />
              <Text
                style={[
                  styles.locationLabel,
                  { color: isRed ? '#FEE2E2' : Colors.textMuted },
                ]}
              >
                LOKASI ANTAR
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.locationRow,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.locationValue,
                  { color: isRed ? Colors.textLight : Colors.textPrimary },
                ]}
              >
                {locationText}
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={isRed ? Colors.textLight : Colors.textPrimary}
              />
            </Pressable>
          </View>
        ) : title ? (
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: isRed ? Colors.textLight : Colors.textPrimary },
            ]}
          >
            {title}
          </Text>
        ) : (
          <View style={styles.flex1} />
        )}

        <View style={styles.actionsRow}>
          {rightAction ? (
            rightAction
          ) : (
            <>
              {onNotificationPress && (
                <Pressable
                  accessibilityRole="button"
                  onPress={onNotificationPress}
                  style={({ pressed }) => [
                    styles.iconButton,
                    styles.iconBtnBg,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={isRed ? Colors.textLight : Colors.textPrimary}
                  />
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  containerRed: {
    backgroundColor: Colors.primary,
  },
  containerWhite: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  locationContainer: {
    flex: 1,
    paddingRight: 12,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationValue: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    maxWidth: '85%',
  },
  title: {
    flex: 1,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    minWidth: Layout.minTouchTarget,
    minHeight: Layout.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
});
