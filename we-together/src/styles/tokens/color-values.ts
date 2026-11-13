const accent = '#EA006B';
const error = '#FF4D4F';

export const colorValues = {
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
    secondary: accent,
    error,
    focus: '#E83BB7',
  },

  button: {
    primary: '#E83BB7',
    primaryHover: '#D72AA6',
    text: '#FFFFFF',
    pinkText: '#EB016C',
    outlineText: '#EB016C',
    outlineBorder: accent,
    outlineHover: '#FDF0F7',
  },

  link: {
    primary: accent,
    hover: '#c20059',
  },

  status: {
    success: '#36A76A',
    error,
    errorHover: '#FF7875',
    warning: '#F5A623',
  },

  gradient: {
    background: 'radial-gradient(66.72% 430.1% at 66.72% 49.67%, #EA006B 0%, #DD95F3 90.38%)',
    primary: 'linear-gradient(90deg, #D98AF0, #EB35B8)',
  },

  boxShadow: {
    primary: '#29293533',
  },
} as const;
