import "../Header.css";
import { FC } from "react";
import { Navigation } from "./Navigation";
import { useTranslation } from "react-i18next";
import { LocaleSwitcher } from "@/locale/components/LocaleSwitcher/LocaleSwitcher";
import { DropdownBtn } from "@ui/Dropdown/DropdownBtn";

type Props = {
  userId?: number;
  onClickLogout: () => void;
};

export const HeaderDesktop: FC<Props> = ({ userId, onClickLogout }) => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header__logo">
          <div className="header__logo-img"></div>
          <LocaleSwitcher />
        </div>
        <div className="header__wrapper">
          <Navigation />
          <div className="header__user-cred">
            id:&nbsp;
            {userId ? (
              <span>{userId}</span>
            ) : (
              <span className="skeleton"></span>
            )}
          </div>
          <DropdownBtn
            menuItemArray={[t("header.exit_btn")]}
            menuItemOnClick={[onClickLogout]}
            aria-label={t("header.exit_btn_aria")}
          />
        </div>
      </div>
    </header>
  );
};
