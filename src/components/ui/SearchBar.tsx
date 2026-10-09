import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Layout } from '../../constants';

interface SearchBarProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  onPress?: () => void;
  editable?: boolean;
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Cari samcan, babi panggang, resto terdekat...',
  showFilterButton = true,
  onFilterPress,
  onPress,
  editable = true,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={styles.inputWrapper}
      >
        <Ionicons
          name="search-outline"
          size={18}
          color={Colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          style={styles.input}
          returnKeyType="search"
          editable={editable && !onPress}
          pointerEvents={onPress ? 'none' : 'auto'}
        />
        {value.length > 0 && onChangeText && (
          <Pressable
            accessibilityRole="button"
            onPress={() => onChangeText('')}
            hitSlop={8}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
          </Pressable>
        )}
      </Pressable>

      {showFilterButton && (
        <Pressable
          accessibilityRole="button"
          onPress={onFilterPress}
          style={({ pressed }) => [
            styles.filterButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  filterButton: {
    paddingHorizontal: 14,
    height: 44,
    minWidth: Layout.minTouchTarget,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semiBold,
    color: Colors.textSecondary,
  },
});
