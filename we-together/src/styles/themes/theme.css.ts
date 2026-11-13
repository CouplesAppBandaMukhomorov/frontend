import { createTheme } from '@vanilla-extract/css';

import { colors } from '../tokens/colors.css';
import { colorValues } from '../tokens/color-values';
import { typography } from '../tokens/typography.css';
import { spacing } from '../tokens/spacing.css';
import { borders } from '../tokens/borders.css';

export const themeClass = createTheme({
  ...colors,
  ...typography,
  ...spacing,
  ...borders,
}, {
  ...colorValues,

  fontFamily: {
    base: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
  },

  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',

  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  width: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
  },

  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.10)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
});