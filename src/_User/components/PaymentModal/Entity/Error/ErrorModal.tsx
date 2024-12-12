import "./ErrorModal.css";
import { t } from "i18next";
import { FC } from "react";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { NoUserSVG, ServicesUnavailableSVG } from "@User/utils/svg/HomeSvg";

type Props = {
  shown: boolean;
  onClose: VoidFunction;
};

export const NoUserError: FC<Props> = ({ shown, onClose }) => {
  return (
    <ModalWrapper shown={shown} onClose={onClose}>
      <div className="payment-modal__error">
        <div className="payment-modal__error-image">
          <NoUserSVG />
        </div>
        <div className="payment-modal__title">
          {t("modal.payment_package_no_acc_title")}
          <div className="payment-modal__text">
            {t("modal.payment_package_no_acc_text")}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export const TechnicalProblems: FC<Props> = ({ shown, onClose }) => {
  return (
    <ModalWrapper shown={shown} onClose={onClose}>
      <div className="payment-modal__error">
        <div className="payment-modal__error-image">
          <ServicesUnavailableSVG />
        </div>
        <div className="payment-modal__title">
          {t("modal.payment_package_no_services_title")}
          <div className="payment-modal__text">
            {t("modal.payment_package_no_services_text")}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
