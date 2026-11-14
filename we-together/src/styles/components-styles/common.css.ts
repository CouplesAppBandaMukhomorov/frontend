import { style } from "@vanilla-extract/css";
import { colors } from "../tokens/colors.css";

export const input = style({
    border: `1px solid ${colors.border.primary}`,
    borderRadius: '16px',

    selectors: {
        '&:global(.ant-input-status-error)': {
            borderColor: colors.status.error,
        },

        '&:global(.ant-input-affix-wrapper-status-error)': {
            borderColor: colors.status.error,
        },

        '&:global(.ant-input-affix-wrapper-status-error:hover)': {
            borderColor: colors.status.errorHover,
        },

        '&:global(.ant-input-status-error:hover)': {
            borderColor: colors.status.errorHover,
        },
    },
});

export const datePicker = style({
    border: `1px solid ${colors.border.primary}`,
    borderRadius: '16px',

    width: '100%',

    selectors: {
        '&:global(.ant-input-status-error)': {
            borderColor: colors.status.error,
        },

        '&:global(.ant-input-affix-wrapper-status-error)': {
            borderColor: colors.status.error,
        },

        '&:global(.ant-input-affix-wrapper-status-error:hover)': {
            borderColor: colors.status.errorHover,
        },

        '&:global(.ant-input-status-error:hover)': {
            borderColor: colors.status.errorHover,
        },
    },
});

export const link = style({
    color: colors.link.primary,
    textDecoration: 'underline',
    textDecorationColor: colors.link.primary,
})

export const footer = style({
    height: '64px',
    minHeight: '64px',
    width: '100%',
    background: '#FDC4E7',
    borderTopRightRadius: '16px',
    borderTopLeftRadius: '16px',

    position: 'fixed',
    bottom: '0',
    left: '0',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const header = style({
    height: '40px',
    width: '100%',
    background: 'transparent',
    position: 'sticky',
    top: '0',

    padding: '6px',

    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '10px',
});