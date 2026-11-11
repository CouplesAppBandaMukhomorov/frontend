import { createThemeContract } from '@vanilla-extract/css';

export const borders = createThemeContract({
  radius: {
    sm: null,
    md: null,
    lg: null,
    full: null,
  },

  width: {
    thin: null,
    medium: null,
    thick: null,
  },

  shadow: {
    sm: null,
    md: null,
    lg: null,
  },
});