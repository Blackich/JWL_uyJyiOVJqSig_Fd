import { FC } from "react";
import { t } from "i18next";
import { PaymentTypeYooKassa } from "@/_User/Payment/YooKassa/type";
import { CreditCardSVG, SbpSVG } from "@User/utils/svg/HomeSvg";

type Props = {
  type: PaymentTypeYooKassa;
  onClick: (type: PaymentTypeYooKassa) => void;
};

export const YooKassa: FC<Props> = ({ onClick, type }) => {
  return (
    <button
      onClick={() => onClick(type)}
      className="payment-modal__btn"
      aria-label={
        type === "bank_card"
          ? t("modal.payment_dialog_YooKassa_bc_aria")
          : t("modal.payment_dialog_YooKassa_sbp_aria")
      }
    >
      {type === "bank_card" ? <CreditCardSVG /> : <SbpSVG />}
      <span>
        {type === "bank_card"
          ? t("modal.payment_dialog_YooKassa_bc")
          : t("modal.payment_dialog_YooKassa_sbp")}
      </span>
    </button>
  );
};
