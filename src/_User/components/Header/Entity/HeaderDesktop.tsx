import "../Header.css";
import { FC } from "react";
import { Button } from "@ui/Button/Button";
import { Navigation } from "./Navigation";
import { useTranslation } from "react-i18next";
import { LocaleSwitcher } from "@/locale/components/LocaleSwitcher/LocaleSwitcher";

type Props = {
  userId: number;
  onClickLogout: () => void;
};

export const HeaderDesktop: FC<Props> = ({ userId, onClickLogout }) => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header__logo">
          LOGO <LocaleSwitcher />
        </div>
        <div className="header__wrapper">
          <Navigation />
          <div className="header__user-cred">
            id: {userId && <span>{` ${userId}`}</span>}
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
