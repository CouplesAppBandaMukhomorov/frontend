import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './locales/ru/common.json';
import auth from './locales/ru/auth.json';
import profile from './locales/ru/profile.json';
import cloud from './locales/ru/cloud.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        common,
        auth,
        profile,
        cloud,
      },
    },

    lng: 'ru',
    fallbackLng: 'ru',

    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;