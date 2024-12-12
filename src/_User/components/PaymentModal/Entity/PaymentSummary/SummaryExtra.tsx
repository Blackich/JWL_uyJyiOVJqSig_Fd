import { FC } from "react";
import { useAppSelector } from "@/store/store";
import { useTranslation } from "react-i18next";
import { formatRUB, formatUSD } from "@utils/utils";
import { getSocialAccName } from "@/_User/auth/_user.slice";

type Props = {
  serviceId: number;
  count: number;
  priceRUB: number;
  priceUSD: number;
};

export const SummaryExtra: FC<Props> = ({
  count,
  serviceId,
  priceRUB,
  priceUSD,
}) => {
  const { i18n } = useTranslation();
  const pickedAccName = useAppSelector(getSocialAccName);

  return (
    <div className="payment-modal__info-list">
      <p>
        Услуга: <span>{serviceId}</span>
      </p>
      <p>
        Аккаунт: <span>{pickedAccName}</span>
      </p>
      <p>
        Количество: <span>{count}</span>
      </p>
      <p>
        Цена:{" "}
        <span>
          {i18n.language === "ru" ? formatRUB(priceRUB) : formatUSD(priceUSD)}
        </span>
      </p>
      {/* <p>
        {t("modal.payment_package_pack")}: <span>{likes}</span>
      </p>
      <p>
        {t("modal.payment_package_acc")}: <span>{pickedAccName}</span>
      </p>
      <p>
        {t("modal.payment_package_posts_q")}: <span>{countPosts}</span>
      </p>
      <p>
        {t("modal.payment_package_days_q")}: <span>30</span>
      </p>
      <p>
        {t("modal.payment_package_price")}:{" "}
        <span>
          {i18n.language === "ru" ? priceRUB : priceUSD}{" "}
          {i18n.language === "ru" ? "₽" : "$"}
        </span>
      </p> */}
    </div>
  );
};
