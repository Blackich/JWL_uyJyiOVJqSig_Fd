import { FC } from "react";
import { useAppSelector } from "@store/store";
import { useTranslation } from "react-i18next";
import { formatRUB, formatUSD } from "@utils/utils";
import { getSocialAccName } from "@User/auth/_user.slice";

type Props = {
  count: number;
  serviceId: number;
  priceRUB: number;
  priceUSD: number;
  countComment?: number;
  selectItems: { ru: string[]; en: string[] };
};

export const SummaryExtra: FC<Props> = ({
  count,
  priceRUB,
  priceUSD,
  serviceId,
  selectItems,
  countComment,
}) => {
  const { t, i18n } = useTranslation();
  const pickedAccName = useAppSelector(getSocialAccName);

  return (
    <div className="payment-modal__info-list">
      <p>
        {t("modal.payment_dialog_service")}:{" "}
        <span>
          {i18n.language === "ru"
            ? selectItems.ru[serviceId - 1]
            : selectItems.en[serviceId - 1]}
        </span>
      </p>
      <p>
        {t("modal.payment_dialog_acc")}: <span>{pickedAccName}</span>
      </p>
      <p>
        {t("modal.payment_dialog_q")}:{" "}
        <span>{serviceId === 4 && countComment ? countComment : count}</span>
      </p>
      <p>
        {t("modal.payment_dialog_price")}:{" "}
        <span>
          {i18n.language === "ru" ? formatRUB(priceRUB) : formatUSD(priceUSD)}
        </span>
      </p>
    </div>
  );
};
