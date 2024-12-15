import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@store/store";
import { getSocialAccName } from "@User/auth/_user.slice";
import { formatRUB, formatUSD } from "@utils/utils";

type Props = {
  likes: number;
  priceRUB: number;
  priceUSD: number;
  countPosts: number;
};

export const SummaryPackage: FC<Props> = ({
  likes,
  priceRUB,
  priceUSD,
  countPosts,
}) => {
  const { t, i18n } = useTranslation();
  const pickedAccName = useAppSelector(getSocialAccName);

  return (
    <div className="payment-modal__info-list">
      <p>
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
          {i18n.language === "ru" ? formatRUB(priceRUB) : formatUSD(priceUSD)}
        </span>
      </p>
    </div>
  );
};
