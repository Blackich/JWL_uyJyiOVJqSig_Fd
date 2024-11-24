import "./CustomPackage.css";
import { FC, useState } from "react";
import { CustomPackageUser } from "@User/utils/types";
import { useTranslation } from "react-i18next";
import { formatRUB, formatUSD } from "@/utils/utils";
import { ArrowClickSVG } from "@User/utils/svg/HomeSvg";
import { PaymentModal } from "@User/components/PaymentModal/PaymentModal";

type Props = {
  customPack: CustomPackageUser[];
};

export const CustomPackage: FC<Props> = ({ customPack }) => {
  const [shownModalPayment, setShownModalPayment] = useState<boolean>(false);

  const { i18n } = useTranslation();

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
              ? formatRUB(pack.price_rub)
              : formatUSD(pack.price_usd)}
          </span>
        </div>
      ))}
      <div
        className="custom-package-user__img"
        onClick={() => setShownModalPayment(true)}
      ></div>
      <div className="custom-package-user__svg">
        <ArrowClickSVG />
      </div>
      <PaymentModal
        shownModal={shownModalPayment}
        onClose={() => setShownModalPayment(false)}
        likes={customPack[0].likes}
        countPosts={customPack[0].countPosts}
        priceRUB={customPack[0].price_rub}
        priceUSD={customPack[0].price_usd}
        customPackageId={customPack[0].id}
      />
    </div>
  );
};