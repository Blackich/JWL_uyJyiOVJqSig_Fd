import "./LocaleSwitcherMenu.css";
import { FC } from "react";
import { Locale } from "../../types";
import { useTranslation } from "react-i18next";

interface Props {
  onChangeLocale: (value: Locale) => void;
  className?: string;
}

export const LocaleSwitcherMenu: FC<Props> = ({
  onChangeLocale,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`locale-switcher-menu ${className}`}>
      <button
        className="locale-switcher-menu__option"
        onClick={() => onChangeLocale(Locale.en)}
        aria-label={t("header.locale_switcher_btn_en_aria")}
      >
        <span className="locale-switcher-menu__text">English</span>
      </button>
      <button
        className="locale-switcher-menu__option"
        onClick={() => onChangeLocale(Locale.ru)}
        aria-label={t("header.locale_switcher_btn_ru_aria")}
      >
        <span className="locale-switcher-menu__text">Русский</span>
      </button>
    </div>
  );
};
