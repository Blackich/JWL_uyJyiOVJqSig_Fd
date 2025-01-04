import "./ExtraPurchaseList.css";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAdaptive } from "@utils/screenWidth";
import { PurchasedExtraUser } from "@User/utils/types";
import { CalendarSVG, PaymentSVG } from "@User/utils/svg/ExtraSvg";
import { formatDateNTime, formatRUB, formatUSD } from "@utils/utils";

type Props = {
  extraPurchasedList: PurchasedExtraUser[];
};

export const ExtraPurchaseList: FC<Props> = ({ extraPurchasedList }) => {
  const { i18n } = useTranslation();
  const { isDesktop } = useAdaptive();
  return (
    <>
      {isDesktop ? (
        <>
          <div className="extra-list__item">
            <p>Ник</p>
            <p>Услуга</p>
            <p>Кол-во</p>
            <p>Стоимость</p>
            <p>Дата</p>
          </div>
          {extraPurchasedList.map((item) => (
            <div key={item.id} className="extra-list__item">
              <p>{item.nickname}</p>
              <p>{item.extraServiceName}</p>
              <p>{item.count}</p>
              <p>
                {i18n.language === "ru"
                  ? formatRUB(+item.priceRUB)
                  : formatUSD(+item.priceUSD)}
              </p>
              <p>{formatDateNTime(item.createdAt)}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          {extraPurchasedList.map((item) => (
            <div key={item.id} className="extra-list__item-mobile">
              <p style={{ fontWeight: 500 }}>{item.nickname}</p>
              <p>Услуга: {item.extraServiceName}</p>
              <p>Кол-во: {item.count}</p>
              <p>
                <PaymentSVG />
                &nbsp;
                {i18n.language === "ru"
                  ? formatRUB(+item.priceRUB)
                  : formatUSD(+item.priceUSD)}
              </p>
              <p>
                <CalendarSVG />
                &nbsp;
                {formatDateNTime(item.createdAt)}
              </p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
