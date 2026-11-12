import { createTheme } from '@vanilla-extract/css';

import { colors } from '../tokens/colors.css';
import { typography } from '../tokens/typography.css';
import { spacing } from '../tokens/spacing.css';
import { borders } from '../tokens/borders.css';

export const themeClass = createTheme({
  ...colors,
  ...typography,
  ...spacing,
  ...borders,
}, {
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
  },

  text: {
    primary: '#292936',
    secondary: '#777780',
    disabled: '#B5B5B5',
    inverse: '#FFFFFF',
  },

  border: {
    primary: '#E5E5E5',
    secondary: '#EA006B',
    error: '#FF4D4F',
    focus: '#E83BB7',
  },

  button: {
    primary: '#E83BB7',
    primaryHover: '#D72AA6',
    text: '#FFFFFF',
    pinkText: '#EB016C',
    outlineText: '#EB016C',
    outlineBorder: '#EA006B',
    outlineHover: '#FDF0F7',
  },

  status: {
    success: '#36A76A',
    error: '#FF4D4F',
    warning: '#F5A623',
  },

  gradient: {
    background: 'radial-gradient(66.72% 430.1% at 66.72% 49.67%, #EA006B 0%, #DD95F3 90.38%)',
    primary: 'linear-gradient(90deg, #D98AF0, #EB35B8)',
  },

  boxShadow: {
    primary: '#29293533'
  },

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