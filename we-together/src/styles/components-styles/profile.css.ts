import { style } from "@vanilla-extract/css";
import { typography } from "../tokens/typography.css";
import presentIcon from "../../assets/present-icon.svg";

export const profileHeader = style({
    height: '64px',
    width: '100%',
    maxWidth: '343px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
});

export const profileContent = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    minHeight: 'calc(100vh - 52px)',
    boxSizing: 'border-box',
    padding: '24px 16px 96px',
});

export const profileDetails = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    maxWidth: '343px',
});

export const profileDetailRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minHeight: '24px',
});

export const profileDetailIcon = style({
    display: 'block',
    width: '24px',
    height: '24px',
    flexShrink: 0,
    backgroundColor: '#EA006B',
    maskImage: `url("${presentIcon}")`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: `url("${presentIcon}")`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
});

export const profilePartnerDetailIcon = style([profileDetailIcon, {
    backgroundColor: '#7B0038',
}]);

export const profileMailIcon = style({
    width: '24px',
    fontSize: '24px',
    color: '#EA006B',
    flexShrink: 0,
});

export const profilePartnerMailIcon = style([profileMailIcon, {
    color: '#7B0038',
}]);

export const profileDetailValue = style({
    minWidth: 0,
    overflowWrap: 'anywhere',
});

export const profileDivider = style({
    width: '100%',
    maxWidth: '343px',
    margin: 0,
});

export const spaceTitle = style({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '343px',
    margin: 0,
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: '24px',
    overflowWrap: 'anywhere',
});

export const spaceDetails = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    maxWidth: '343px',
});

export const spaceDetailRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    minHeight: '40px',
});

export const spaceDetailIcon = style({
    width: '24px',
    flexShrink: 0,
    color: '#7B0038',
    fontSize: '24px',
    lineHeight: 1,
});

export const spaceDetailText = style({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
});

export const spaceDetailValue = style({
    fontSize: '14px',
    lineHeight: '20px',
    overflowWrap: 'anywhere',
});

export const spaceDetailLabel = style({
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '12px',
    lineHeight: '18px',
});

export const profileAvatar = style({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#EA006B',
    color: '#FFFFFF',
    fontSize: '28px',
    fontWeight: typography.fontWeight.bold,
});

export const profileAvatarInvitee = style([profileAvatar, {
    backgroundColor: '#FAAD14',
}]);

export const profileName = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const profileSettingsLink = style({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    color: '#EA006B',
    fontSize: '32px',
    lineHeight: 1,
    selectors: {
        '&:hover': { color: '#EA006B' },
        '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: '4px', borderRadius: '4px' },
    },
});

export const profileSettingsLinkInvitee = style([profileSettingsLink, {
    color: '#FAAD14',
    selectors: {
        '&:hover': { color: '#FAAD14' },
    },
}]);

export const card = style({
  width: 343,
  minHeight: 80,
  padding: 16,
  boxSizing: 'border-box',

  background: '#fff',
  borderRadius: 16,

  boxShadow: `
    0 9px 28px rgba(0, 0, 0, 0.05),
    0 3px 6px rgba(0, 0, 0, 0.12),
    0 6px 16px rgba(0, 0, 0, 0.08)
  `,

  cursor: 'pointer',
});

export const icon = style({
  flex: '0 0 32px',
  width: 32,
  height: 32,

  color: '#EA006B',
  fontSize: 24,
});

export const content = style({
  flex: 1,
  minWidth: 0,
});

export const title = style({
  fontSize: 16,
  lineHeight: '20px',
  fontWeight: 600,
  color: '#000',
});

export const description = style({
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.45)',
});

export const arrow = style({
  flex: '0 0 auto',
  fontSize: 12,
  color: 'rgba(0, 0, 0, 0.45)',
});
