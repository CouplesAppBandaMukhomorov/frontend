import { style } from '@vanilla-extract/css';

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

export const footerProfileButton = style([
  outlinedButton,
  {
    alignSelf: 'center',
  },
]);