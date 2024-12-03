import "./PaymentModal.css";
import { FC } from "react";
import { useAppSelector } from "@store/store";
import { authUser } from "@User/auth/_authApi";
import { useTranslation } from "react-i18next";
import { PaymentType } from "@User/Payment/type";
import { handlerErrorAxios } from "@/utils/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { paymentPackApi } from "@User/Payment/_paymentPackApi";
import { getSocialAccId, getSocialAccName } from "@User/auth/_user.slice";
import {
  ServicesUnavailableSVG,
  CreditCardSVG,
  NoUserSVG,
  SbpSVG,
} from "@User/utils/svg/HomeSvg";

type Props = {
  shownModal: boolean;
  onClose: VoidFunction;
  likes: number;
  priceRUB: number;
  priceUSD: number;
  countPosts: number;
  customPackageId?: number;
};

export const PaymentModal: FC<Props> = ({
  shownModal,
  onClose,
  likes,
  priceRUB,
  priceUSD,
  countPosts,
  customPackageId,
}) => {
  const { t, i18n } = useTranslation();
  const nicknameId = useAppSelector(getSocialAccId);
  const nickname = useAppSelector(getSocialAccName);

  const { data: userCred } = authUser.useCheckAuthUserQuery();
  const { data: packageList } = userHomeApi.useGetPackageListQuery();
  const { data: activeServices } = userHomeApi.useGetActiveServiceQuery(
    userCred?.id || skipToken,
  );
  const { data: checkStatus } = userHomeApi.useCheckStatusServicesQuery();
  const [fetchPaymentYooKassa] =
    paymentPackApi.usePaymentPackYooKassaMutation();

  const matchedService = activeServices?.find(
    (service) => service.socialNicknameId === nicknameId,
  );
  const packageId = customPackageId
    ? customPackageId
    : packageList?.find((pack) => pack.likes === likes)?.id;

  const handleClickPayYooKassa = async (paymentType: PaymentType) => {
    if (!userCred || !nicknameId || !packageId) return;
    await fetchPaymentYooKassa({
      userId: userCred.id,
      socialNicknameId: nicknameId,
      packageId: packageId,
      customPackage: customPackageId ? 1 : 0,
      countPosts: countPosts,
      cost: priceRUB,
      currency: "RUB",
      type: paymentType,
    }).then((res) => {
      if (res?.data) {
        const redirectUrl = res.data.confirmation.confirmation_url;
        return (window.location.href = String(redirectUrl));
      }
      if (res?.error) {
        const error = handlerErrorAxios(res.error);
        console.log(error?.message);
      }
    });
  };

  if (!nicknameId || matchedService) {
    return (
      <ModalWrapper shown={shownModal} onClose={onClose}>
        <div className="payment-modal__no-acc">
          <div className="inst-modal__remove-image">
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
  }

  if (!checkStatus) {
    return (
      <ModalWrapper shown={shownModal} onClose={onClose}>
        <div className="payment-modal__no-acc">
          <div className="inst-modal__remove-image">
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
  }

  return (
    <ModalWrapper shown={shownModal} onClose={onClose}>
      <div className="payment-modal">
        {t("modal.payment_package_title")}
        <div className="payment-modal__wrapper">
          <div className="payment-modal__summary">
            {t("modal.payment_package_subtitle")}
            <div className="payment-modal__info-list">
              <p>
                {t("modal.payment_package_pack")}: <span>{likes}</span>
              </p>
              <p>
                {t("modal.payment_package_acc")}: <span>{nickname}</span>
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
              </p>
            </div>
          </div>
          <div className="payment-modal__payment-systems">
            <button
              onClick={() => handleClickPayYooKassa("bank_card")}
              className="payment-modal__btn"
              aria-label={t("")}
            >
              <CreditCardSVG />
              <span>{t("modal.payment_package_YooKassa_bc")}</span>
            </button>
            <button
              onClick={() => handleClickPayYooKassa("sbp")}
              className="payment-modal__btn"
              aria-label={t("")}
            >
              <SbpSVG />
              <span>{t("modal.payment_package_YooKassa_sbp")}</span>
            </button>
            <button
              // onClick={handleClickPayYooKassa}
              className="payment-modal__btn"
            ></button>
            <button
              // onClick={handleClickPayYooKassa}
              className="payment-modal__btn"
            ></button>
            <button
              // onClick={handleClickPayYooKassa}
              className="payment-modal__btn"
            ></button>
            <button
              // onClick={handleClickPayYooKassa}
              className="payment-modal__btn"
            ></button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
