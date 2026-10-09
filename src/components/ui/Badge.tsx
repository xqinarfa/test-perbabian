import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography } from '../../constants';

interface BadgeProps {
  label: string;
  variant?: 'discount' | 'chef' | 'legend' | 'neutral' | 'success' | 'outline' | 'spicy';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  style,
  textStyle,
}) => {
  const getBadgeStyle = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'discount':
        return {
          container: { backgroundColor: Colors.badgeDiscountBg },
          text: { color: Colors.badgeDiscountText, fontWeight: Typography.weights.bold },
        };
      case 'chef':
        return {
          container: { backgroundColor: Colors.badgeChefBg },
          text: { color: Colors.badgeChefText, fontWeight: Typography.weights.bold },
        };
      case 'legend':
        return {
          container: { backgroundColor: Colors.badgeLegendBg },
          text: { color: Colors.badgeLegendText, fontWeight: Typography.weights.bold },
        };
      case 'spicy':
        return {
          container: { backgroundColor: Colors.badgeSpicyBg },
          text: { color: Colors.badgeSpicyText, fontWeight: Typography.weights.bold },
        };
      case 'success':
        return {
          container: { backgroundColor: Colors.successLight },
          text: { color: Colors.success, fontWeight: Typography.weights.semiBold },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Colors.primary,
          },
          text: { color: Colors.primary, fontWeight: Typography.weights.medium },
        };
      default:
        return {
          container: { backgroundColor: Colors.borderLight },
          text: { color: Colors.textSecondary, fontWeight: Typography.weights.medium },
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[styles.container, badgeStyle.container, style]}>
      <Text style={[styles.text, badgeStyle.text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Typography.sizes.xs,
  },
});
