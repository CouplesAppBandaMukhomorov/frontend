import { createThemeContract } from '@vanilla-extract/css';

export const colors = createThemeContract({
  background: {
    primary: null,
    secondary: null,
  },

  text: {
    primary: null,
    secondary: null,
    disabled: null,
    inverse: null,
  },

  border: {
    primary: null,
    secondary: null,
    error: null,
    focus: null,
  },

  button: {
    primary: null,
    primaryHover: null,
    text: null,
    pinkText: null,
    outlineText: null,
    outlineBorder: null,
    outlineHover: null,
  },

  status: {
    success: null,
    error: null,
    warning: null,
  },

  gradient: {
    primary: null,
    background: null,
  },

  boxShadow: {
    primary: null,
  }
});