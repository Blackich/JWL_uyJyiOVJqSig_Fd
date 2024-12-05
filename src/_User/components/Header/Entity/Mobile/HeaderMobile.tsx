import "./HeaderMoblie.css";
import { FC } from "react";
import { Button } from "@ui/Button/Button";
import { Navigation } from "../Navigation";
import { useTranslation } from "react-i18next";
import { LocaleSwitcher } from "@/locale/components/LocaleSwitcher/LocaleSwitcher";

type Props = {
  userId?: number;
  onClickLogout: () => void;
};

export const HeaderMobile: FC<Props> = ({ userId, onClickLogout }) => {
  const { t } = useTranslation();
  return (
    <header className="header header__mobile">
      <div className="container header_container">
        <div className="header__logo">
          <div className="header__logo-img"></div>
          <LocaleSwitcher />
        </div>
        <div
          className="menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.currentTarget.firstChild as HTMLDivElement).click()
          }
        >
          <input
            type="checkbox"
            id="burger-checkbox"
            className="burger-checkbox"
          />
          <label htmlFor="burger-checkbox" className="burger"></label>

          <div className="menu-list">
            <div className="header__user-cred__mobile">
              id: {userId && <span>{` ${userId}`}</span>}
            </div>
            <Navigation />
            <Button
              onClick={onClickLogout}
              aria-label={t("header.exit_btn_aria")}
              className="header__exit-btn-mobile"
              style={{ backgroundColor: "#8e8ed0" }}
            >
              {t("header.exit_btn")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
