/**
 * Design System & Theme Tokens for Perbabian App
 * Extracted directly from Figma design files:
 * - Brand red: #BC1D1D
 * - Banner burgundy: #7A0C0C
 * - Gold / Star: #F59E0B
 * - Strict 4pt/8pt spacing rhythm (mobile-craftsmanship compliant)
 */

export const Colors = {
  // Brand Red Palette
  primary: '#BC1D1D',
  primaryDark: '#7A0C0C',
  primaryLight: '#FFF5F5',
  primaryBorder: '#FECDD3',
  primaryMuted: '#FEE2E2',

  // Gold & Accent Palette (Stars, VIP, Badges)
  gold: '#F59E0B',
  goldDark: '#B45309',
  goldLight: '#FEF3C7',
  goldBorder: '#FDE68A',

  // Semantic Status Colors
  success: '#10B981',
  successLight: '#ECFDF5',
  successText: '#059669',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  info: '#3B82F6',
  infoLight: '#EFF6FF',

  // Neutrals & Surfaces
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceSubtle: '#F9FAFB',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  // Typography Colors
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  textLight: '#FFFFFF',
  textRed: '#BC1D1D',

  // Badges & Tags (Exact Figma matching)
  badgeDiscountBg: '#BC1D1D',
  badgeDiscountText: '#FFFFFF',
  badgeLegendBg: '#FEE2E2',
  badgeLegendText: '#B91C1C',
  badgeChefBg: '#FEF3C7',
  badgeChefText: '#B45309',
  badgeSpicyBg: '#FEE2E2',
  badgeSpicyText: '#B91C1C',
} as const;

export const Spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  huge: 48,
} as const;

export const Typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  lineHeights: {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
  },
} as const;

export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const Layout = {
  // Mobile craftsmanship minimum interactive touch target
  minTouchTarget: 48,
} as const;
