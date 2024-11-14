import { initReactI18next } from "react-i18next";
import { translations } from "./index";
import { Locale } from "./types";
import i18n from "i18next";

const LS_LOCALE_KEY = "gram.top:local";

export function applyLocale(locale: Locale): void {
  localStorage.setItem(LS_LOCALE_KEY, locale);

  i18n.changeLanguage(locale);
}

export function getSavedLocale(): Locale {
  const lsLang = localStorage.getItem(LS_LOCALE_KEY) as Locale | null;

  if (lsLang) {
    return lsLang;
  }

  const navigatorLanguage = window.navigator.language.split("-")[0] as Locale;

  if (Object.values(Locale).includes(navigatorLanguage)) {
    return navigatorLanguage;
  }

  return Locale.en;
}

export function initI18n(callback: () => void): void {
  const currentLocale = getSavedLocale();

  i18n.use(initReactI18next).init(
    {
      resources: {
        en: {
          translation: translations.en,
        },
        ru: {
          translation: translations.ru,
        },
      },
      lng: currentLocale,
      fallbackLng: Locale.en,
      keySeparator: false,
      interpolation: {
        escapeValue: false,
        prefix: "{",
        suffix: "}",
      },
    },
    () => {
      applyLocale(currentLocale);
      callback();
    },
  );
}
