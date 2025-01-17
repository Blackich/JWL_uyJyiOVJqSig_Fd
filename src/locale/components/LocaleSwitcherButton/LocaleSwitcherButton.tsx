import "./LocaleSwitcherButton.css";
import { ForwardedRef, forwardRef, MouseEvent } from "react";
import { Locale } from "../../types";
import { useTranslation } from "react-i18next";

const Arrow = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1077 13.4516C10.3437 13.4289 10.5669 13.3336 10.7465 13.179L15.5698 9.0447C15.8125 8.8502 15.9658 8.56548 15.995 8.25582C16.024 7.94613 15.9263 7.6379 15.7239 7.40173C15.5217 7.16542 15.2322 7.02123 14.9219 7.00216C14.6114 6.9831 14.3065 7.09076 14.0768 7.30048L10 10.796L5.92324 7.30048C5.69349 7.09076 5.38861 6.98309 5.07813 7.00216C4.7678 7.02123 4.47829 7.16542 4.27609 7.40173C4.07374 7.63789 3.97601 7.94612 4.00501 8.25582C4.03417 8.56551 4.18749 8.8502 4.43021 9.0447L9.25352 13.179C9.48951 13.3818 9.79778 13.4802 10.1076 13.4516H10.1077Z"
        fill="currentColor"
      />
    </svg>
  );
};

type Props = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  locale: Locale;
  opened?: boolean;
};

export const LocaleSwitcherButton = forwardRef(function LocaleSwitcherButton(
  { onClick, locale, opened }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { t } = useTranslation();
  return (
    <button
      className={`locale-switcher-button ${
        opened ? "locale-switcher-button--opened" : ""
      }`}
      ref={ref}
      onClick={onClick}
      aria-label={t("header.locale_switcher_btn_aria")}
    >
      <span className="locale-switcher-button__text">
        {locale === "en" && "ENG"}
        {locale === "ru" && "RU"}
      </span>
      <span className="locale-switcher-button__icon">
        <Arrow />
      </span>
    </button>
  );
});
