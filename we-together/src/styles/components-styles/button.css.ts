import { style } from '@vanilla-extract/css';
import { typography } from '../tokens/typography.css';

export const filledButton = style({
  background:
    'radial-gradient(66.72% 430.1% at 66.72% 49.67%, #EA006B 0%, #DD95F3 90.38%)',

  color: '#FCFBFA',

  borderTop: '1px solid #FFFFFF',

  boxShadow: '0 1px 0 0 #29293533',

  fontWeight: '700',

  alignSelf: 'stretch',

  selectors: {
    '&:hover': {
        background:
        'radial-gradient(66.72% 430.1% at 66.72% 49.67%, #D72AA6 0%, #DD95F3 90.38%)',
        color: '#FCFBFA !important',
    },

    '&:hover:not(:disabled)': {
        color: '#FCFBFA',
        borderColor: '#FFFFFF',
    },

    '&:focus-visible': {
        color: '#FCFBFA',
    },
  },
});

export const outlinedButton = style({
  background: '#FFFFFF80',
  color: '#EA006B',

  border: '1px solid #EA006B',
  borderTop: '1px solid #EA006B',

  boxShadow: '0 1px 0 0 #29293533',

  fontWeight: '700',

  alignSelf: 'stretch',

  outline: 'none',

  selectors: {
    '&:hover': {
      background: '#FDF0F7',
      color: '#EA006B !important',
      border: '1px solid #EA006B !important',
    },

    '&:active': {
      background: '#FCE4F0',
      color: '#EA006B !important',
      border: '1px solid #EA006B !important',
      outline: 'none',
      boxShadow: '0 1px 0 0 #29293533',
    },

    '&:focus': {
      color: '#EA006B !important',
      border: '1px solid #EA006B !important',
      outline: 'none',
    },

    '&:focus-visible': {
      color: '#EA006B !important',
      border: '1px solid #EA006B !important',
      outline: 'none',
    },
  },
});

const footerInitial = style({
  width: '40px',
  height: '40px',
  boxSizing: 'border-box',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  fontFamily: typography.fontFamily.base,
  fontWeight: typography.fontWeight.bold,
  fontStyle: 'normal',
  fontSize: typography.fontSize.lg,
  lineHeight: '24px',
  letterSpacing: '0',
  textDecoration: 'none',
});

export const footerProfileButton = style([
  footerInitial,
  {
    padding: 0,
    border: 0,
    backgroundColor: '#EA006B',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    selectors: {
      '&:hover': { backgroundColor: '#EA006B', color: '#FFFFFF' },
      '&:focus-visible': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
    },
  },
]);

export const footerYellowProfileButton = style([
  footerProfileButton,
  {
    backgroundColor: '#FAAD14',
    selectors: {
      '&:hover': { backgroundColor: '#FAAD14', color: '#FFFFFF' },
    },
  },
]);

export const footerCoupleLink = style({
  position: 'relative',
  display: 'block',
  width: '87px',
  height: '60px',
  flexShrink: 0,
  filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))',
  selectors: {
    '&:focus-visible': { outline: '2px solid #EA006B', outlineOffset: '2px', borderRadius: '20px' },
  },
});

const footerCoupleCircle = style([
  footerInitial,
  {
    position: 'absolute',
    top: '10px',
  },
]);

export const footerCreatorFrontCircle = style([
  footerCoupleCircle,
  {
    left: '10px',
    zIndex: 2,
    backgroundColor: '#EA006B',
  },
]);

export const footerInviteeBackCircle = style([
  footerCoupleCircle,
  {
    left: '36.6px',
    zIndex: 1,
    border: '1px solid #EA006B',
    backgroundColor: '#FAAD14',
  },
]);

export const footerInviteeFrontCircle = style([
  footerCoupleCircle,
  {
    left: '10px',
    zIndex: 2,
    backgroundColor: '#FAAD14',
  },
]);

export const footerCreatorBackCircle = style([
  footerCoupleCircle,
  {
    left: '36.6px',
    zIndex: 1,
    border: '1px solid #FAAD14',
    backgroundColor: '#EA006B',
  },
]);

export const iconButton = style({
  border: 'none',
  background: 'transparent',
  
  selectors: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});
