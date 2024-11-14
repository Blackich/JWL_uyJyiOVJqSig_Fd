import { Dispatch, useEffect, useState } from 'react';
import { applyLocale, getSavedLocale } from './utils';
import { Locale } from './types';

export const useLocale = (): {
  locale: Locale;
  setLocale: Dispatch<Locale>;
} => {
  const [locale, setLocale] = useState(getSavedLocale());

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return { locale, setLocale };
};
