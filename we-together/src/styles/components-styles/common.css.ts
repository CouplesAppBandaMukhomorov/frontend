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

export const link = style({
    color: colors.link.primary,
    textDecoration: 'underline',
    textDecorationColor: colors.link.primary,
})