import "../Header.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdaptive } from "@utils/screenWidth";

export const Navigation = () => {
  const { t } = useTranslation();
  const { isMobile } = useAdaptive();
  return (
    <nav className={`header__nav${isMobile ? "-mobile" : ""}`} role="navigation">
      <NavLink
        to={"/"}
        className={`header__nav-item${isMobile ? "-mobile" : ""}`}
        aria-label={t("header_menu.home_aria")}
      >
        {t("header_menu.home")}
      </NavLink>
      <NavLink
        to={"/extra"}
        className={`header__nav-item${isMobile ? "-mobile" : ""}`}
        aria-label={t("header_menu.extra_aria")}
      >
        {t("header_menu.extra")}
      </NavLink>
    </nav>
  );
};
