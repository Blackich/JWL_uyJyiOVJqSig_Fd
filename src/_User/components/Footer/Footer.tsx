import "./Footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MailSVG, TelegramSVG } from "@User/utils/svg/HomeSvg";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__contact">
          <div className="footer__contact-title">
            {t("footer.contact_title")}
          </div>
          <Link
            to="mailto:gram.top.sup@gmail.com"
            className="footer__contact-link"
            aria-label={t("footer.contact_mail_link_aria")}
          >
            <MailSVG />
            gram.top.sup@gmail.com
          </Link>
          <Link
            to="https://t.me/gramtop_help"
            className="footer__contact-link"
            aria-label={t("footer.contact_telegram_link_aria")}
            target="_blank"
          >
            <TelegramSVG />
            gramtop_help
          </Link>
        </div>
      </div>
    </footer>
  );
};
