import { style } from "@vanilla-extract/css";

export const input = style({
    border: '1px solid var(--colorBorder, #D9D9D9)',
    borderRadius: '16px',
});

export const link = style({
    color: '#EA006B',
    textDecoration: 'underline',
    textDecorationColor: '#EA006B',
})