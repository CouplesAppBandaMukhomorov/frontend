import { style } from '@vanilla-extract/css';

export const page = style({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  isolation: 'isolate',
  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const background = style({
  position: 'fixed',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
  filter: 'blur(45px)',
});

export const ellipse = style({
  position: 'absolute',
  borderRadius: '50%',
  flexShrink: 0,
});

export const ellipseYellowTopLanding = style([
  ellipse,
  {
    width: '313px',
    height: '222px',
    top: '-27px',
    left: '-48px',
    background: '#FFCB3C33',
  },
]);

export const ellipseYellowTopAuth = style([
    ellipse,
    {
        width: '465px',
        height: '120px',
        top: '-7px',
        left: '61px',
        background: '#FFCB3C99',
    },
]);

export const ellipsePurpleTopLanding = style([
  ellipse,
  {
    width: '319px',
    height: '363px',
    top: '-42px',
    left: '148px',
    background: '#DD95F34D',
  },
]);

export const ellipsePurpleBottomAuth = style([
    ellipse,
    {
        width: '420px',
        height: '339px',
        top: '503px',
        left: '101px',
        background: '#DD95F34D',
    },
]);

export const ellipseRedBottomAuth = style([
    ellipse,
    {
        width: '76px',
        height: '121px',
        top: '704px',
        left: '-6px',
        background: '#FF0D00B2',
    }
]);

export const ellipseRedBottomLanding = style([
  ellipse,
  {
    width: '76px',
    height: '63px',
    top: '647px',
    left: '93px',
    background: '#FF0D00B2',
  },
]);

export const ellipseYellowBottomAuth = style([
    ellipse,
    {
        width: '342px',
        height: '132px',
        top: '746px',
        left: '91px',
        background: '#FFCB3C33',
    },
]);

export const ellipseYellowBottomLanding = style([
  ellipse,
  {
    width: '342px',
    height: '234px',
    top: '637px',
    left: '93px',
    background: '#FFCB3C33',
  },
]);