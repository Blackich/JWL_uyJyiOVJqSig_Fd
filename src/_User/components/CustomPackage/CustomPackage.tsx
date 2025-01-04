import "./CustomPackage.css";
import { FC, useState } from "react";
import { CustomPackageDetailsUser } from "@User/utils/types";
import { useTranslation } from "react-i18next";
import { formatRUB, formatUSD } from "@utils/utils";
import { ArrowClickSVG } from "@User/utils/svg/HomeSvg";
import { PaymentModal } from "@User/components/PaymentModal/PaymentModal";

type Props = {
  customPack: CustomPackageDetailsUser[];
};

export const CustomPackage: FC<Props> = ({ customPack }) => {
  const { i18n } = useTranslation();
  const [shownModalPayment, setShownModalPayment] = useState<boolean>(false);

  const paymentModalData = {
    likes: customPack[0].likes,
    countPosts: customPack[0].countPosts,
    priceRUB: Number(customPack[0].price_rub),
    priceUSD: Number(customPack[0].price_usd),
    customPackageId: customPack[0].id,
  };

  return (
    <div className="custom-package-user">
      {customPack.map((pack) => (
        <div key={pack.likes}>
          <span className="custom-package-user__title">
            Кастомный пакет только для вас
          </span>
          <span>
            {pack.likes}&nbsp;<p>лайков</p>
          </span>
          <span>
            {pack.videoViews}&nbsp;<p>просмотров</p>
          </span>
          <span>
            {pack.countPosts}&nbsp;<p>постов</p>
          </span>
          <span>
            {i18n.language === "ru"
              ? formatRUB(+pack.price_rub)
              : formatUSD(+pack.price_usd)}
          </span>
        </div>
      ))}
      <div
        className="custom-package-user__img"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShownModalPayment(true)}
        onClick={() => setShownModalPayment(true)}
      ></div>
      <div className="custom-package-user__svg">
        <ArrowClickSVG />
      </div>
      <PaymentModal
        shownModal={shownModalPayment}
        onClose={() => setShownModalPayment(false)}
        modalId={0}
        modalData={paymentModalData}
      />
    </div>
  );
};
