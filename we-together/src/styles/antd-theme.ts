import { theme } from 'antd';
import { colors } from './tokens/colors.css';

export const antdTheme = {
  algorithm: theme.defaultAlgorithm,

  token: {
    colorPrimary: colors.button.primary,
    colorSuccess: colors.status.success,
    colorError: colors.status.error,
    colorWarning: colors.status.warning,

    colorText: colors.text.primary,
    colorTextSecondary: colors.text.secondary,

    colorBgBase: colors.background.primary,
    colorBgContainer: colors.background.primary,

    colorBorder: colors.border.primary,

    borderRadius: 8,
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  components: {
    Button: {
        // Основная кнопка
        colorPrimary: colors.button.primary,
        colorPrimaryHover: colors.button.primaryHover,
        colorTextLightSolid: colors.button.text,

        // Outline-кнопка
        defaultColor: colors.button.pinkText,
        defaultBorderColor: colors.button.outlineBorder,
        defaultHoverColor: colors.button.outlineText,
        defaultHoverBorderColor: colors.button.outlineBorder,
        defaultHoverBg: colors.button.outlineHover,
    },
  },
};