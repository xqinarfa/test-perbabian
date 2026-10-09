import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Spacing, BorderRadius, Layout } from '@/constants';
import { QuickAction } from '@/types';

interface QuickActionsSectionProps {
  actions: QuickAction[];
  onActionPress?: (action: QuickAction) => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  actions,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          onPress={() => onActionPress?.(action)}
          style={({ pressed }) => [
            styles.item,
            { opacity: pressed ? 0.75 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
        >
          <View style={styles.iconBox}>
            <Ionicons
              name={action.icon as keyof typeof Ionicons.glyphMap}
              size={22}
              color={action.color}
            />
          </View>
          <Text style={styles.title}>{action.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
  },
  item: {
    alignItems: 'center',
    width: 72,
    minHeight: Layout.minTouchTarget,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: Spacing.xxs,
  },
  title: {
    fontSize: Typography.sizes.xs,
    color: '#374151',
    fontWeight: Typography.weights.medium,
    textAlign: 'center',
  },
});
