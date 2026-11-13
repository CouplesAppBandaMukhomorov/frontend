import { theme } from 'antd';
import { colorValues } from './tokens/color-values';

export const antdTheme = {
  algorithm: theme.defaultAlgorithm,

  token: {
    colorLink: colorValues.link.primary,
    colorLinkHover: colorValues.link.hover,

    colorPrimary: colorValues.button.primary,
    colorSuccess: colorValues.status.success,
    colorError: colorValues.status.error,
    colorWarning: colorValues.status.warning,

    colorText: colorValues.text.primary,
    colorTextSecondary: colorValues.text.secondary,

    colorBgBase: colorValues.background.primary,
    colorBgContainer: colorValues.background.primary,

    colorBorder: colorValues.border.primary,

    borderRadius: 8,
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  components: {
    Button: {
      // Основная кнопка
      colorPrimary: colorValues.button.primary,
      colorPrimaryHover: colorValues.button.primaryHover,
      colorTextLightSolid: colorValues.button.text,

      // Outline-кнопка
      defaultColor: colorValues.button.pinkText,
      defaultBorderColor: colorValues.button.outlineBorder,
      defaultHoverColor: colorValues.button.outlineText,
      defaultHoverBorderColor: colorValues.button.outlineBorder,
      defaultHoverBg: colorValues.button.outlineHover,
    },
  },
};