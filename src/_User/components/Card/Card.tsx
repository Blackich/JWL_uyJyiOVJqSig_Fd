import "./Card.css";
import { FC, HTMLAttributes, useState } from "react";
import { HeartSVG, InfoSVG } from "@User/utils/svg/HomeSvg";
import { Button } from "@ui/Button/Button";
import { useTranslation } from "react-i18next";
import { PaymentModal } from "@User/components/PaymentModal/PaymentModal";
import { Skeleton } from "@ui/Skeleton/Skeleton";
import i18next from "i18next";

interface Props extends HTMLAttributes<HTMLDivElement> {
  priceRUB: number;
  priceUSD: number;
  likes: number;
  className?: string;
  activeIndex: number;
}

export const Card: FC<Props> = ({
  priceUSD,
  priceRUB,
  likes,
  className,
  activeIndex,
}) => {
  const { t, i18n } = useTranslation();
  const [shownModalPayment, setShownModalPayment] = useState<boolean>(false);

  const handleClickPayment = () => {
    setShownModalPayment(true);
  };
  return (
    <>
      <div className="card__item">
        <div className={`card-header ${className}`}>
          <p>{likes}</p>
          <HeartSVG />
        </div>
        <div className="card__item--price">
          {i18n.language === "ru" ? (
            <>
              {priceRUB}
              <p>₽</p>
            </>
          ) : (
            <>
              {priceUSD}
              <sup>$</sup>
            </>
          )}
        </div>
        <ul>
          <li>
            {likes} {t("card.likes")}
          </li>
          <li>
            {likes * 3} {t("card.views")}
          </li>
          <li>{t("card.etc")}</li>
        </ul>
        <Button className="card__item--button" onClick={handleClickPayment}>
          {t("card.order_now_btn")}
        </Button>
        <div className="card__item--inside">
          <div className="inside__icon">
            <InfoSVG />
          </div>
          <div className="inside__contents">
            <div className="inside__contents--title">
              {i18next.language === "en" ? t("card.inside_title") : " "}
              <div className="inside__contents-wrapper">
                <p>+ {t("card.reach")}</p>
                <p>+ {t("card.profile_visits")}</p>
                <p>+ {t("card.impressions")}</p>
                <p>+ {t("card.reposts")}</p>
                <p>+ {t("card.saves")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal
        shownModal={shownModalPayment}
        onClose={() => setShownModalPayment(false)}
        likes={likes}
        countPosts={activeIndex === 1 ? 15 : 30}
        priceRUB={priceRUB}
        priceUSD={priceUSD}
      />
    </>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="card__item">
      <Skeleton w={100} h={25} mt={28} type="dark" />
      <Skeleton w={150} h={25} mt={50} type="dark" />
      <Skeleton w={150} h={14} mt={35} type="dark" />
      <Skeleton w={150} h={14} mt={10} type="dark" />
      <Skeleton w={150} h={14} mt={10} type="dark" />
      <Skeleton w={100} h={37} mt={16} mb={20} type="dark" />
    </div>
  );
};
