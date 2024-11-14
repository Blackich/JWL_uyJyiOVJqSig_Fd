import "./Header.css";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocaleSwitcher } from "@/locale/components/LocaleSwitcher/LocaleSwitcher";
import { Button } from "@ui/Button/Button";

type Props = {
  onClickLogout: () => void;
  userId: number;
};

export const Header: FC<Props> = ({ userId, onClickLogout }) => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header__logo">
          LOGO <LocaleSwitcher />
        </div>

        <div className="header__wrapper">
          <div className="header__menu">
            <NavLink
              to={"/"}
              className="header__menu-item"
              aria-label={t("header_menu.home_aria")}
            >
              {t("header_menu.home")}
            </NavLink>
            <NavLink
              to={"/extra"}
              className="header__menu-item"
              aria-label={t("header_menu.extra_aria")}
            >
              {t("header_menu.extra")}
            </NavLink>
          </div>
          <div className="header__user-cred">
            Id: {userId && <span>{` ${userId}`}</span>}
          </div>
          <Button
            onClick={onClickLogout}
            aria-label={t("header.exit_btn_aria")}
          >
            {t("header.exit_btn")}
          </Button>
        </div>
      </div>
    </header>
  );
};
