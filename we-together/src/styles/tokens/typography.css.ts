import { createThemeContract } from '@vanilla-extract/css';

export const typography = createThemeContract({
  fontFamily: {
    base: null,
  },

  fontSize: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    '3xl': null,
  },

  fontWeight: {
    regular: null,
    medium: null,
    semibold: null,
    bold: null,
  },

  lineHeight: {
    tight: null,
    normal: null,
    relaxed: null,
  },
});