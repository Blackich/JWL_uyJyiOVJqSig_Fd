import "./PaymentModal.css";
import { FC } from "react";
import { ModalWrapper } from "@/ui/ModalWrapper/ModalWrapper";
import { authUser } from "@User/auth/_authApi";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { useTranslation } from "react-i18next";
import { paymentPackApi } from "@User/Payment/_paymentPackApi";
import { handlerErrorAxios } from "@/utils/utils";
import { CreditCardSVG, SbpSVG } from "@User/utils/svg/HomeSvg";
import { PaymentType } from "@User/Payment/type";

type Props = {
  shownModal: boolean;
  onClose: VoidFunction;
  likes: number;
  priceRUB: number;
  priceUSD: number;
  activeIndex: number;
};

export const PaymentModal: FC<Props> = ({
  shownModal,
  onClose,
  likes,
  priceRUB,
  priceUSD,
  activeIndex,
}) => {
  const { t, i18n } = useTranslation();
  const { data: userCred } = authUser.useCheckAuthUserQuery();
  const { data: packageList } = userHomeApi.useGetPackageListQuery();
  const { data: userList } = userHomeApi.useGetSocialListQuery(
    userCred?.id as number,
  );
  const [fetchPaymentYooKassa] =
    paymentPackApi.usePaymentPackYooKassaMutation();

  const nickname = userList?.find(
    (user) => user.id == Number(localStorage.getItem("activeUserId")),
  )?.nickname;
  const nicknameId = userList?.find(
    (user) => user.id == Number(localStorage.getItem("activeUserId")),
  )?.id;
  const packageId = packageList?.find((pack) => pack.likes === likes)?.id;

  const handleClickPayYooKassa = async (paymentType: PaymentType) => {
    if (!userCred || !nicknameId || !packageId) return;
    await fetchPaymentYooKassa({
      userId: userCred.id,
      socialNicknameId: nicknameId,
      packageId: packageId,
      countPosts: activeIndex === 1 ? 15 : 30,
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

  if (!localStorage.getItem("activeUserId")) {
    return (
      <ModalWrapper shown={shownModal} onClose={onClose}>
        <div className="payment-modal">
          <div className="payment-modal__message">
            {t("modal.payment_package_no_acc")}
          </div>
        </div>
      </ModalWrapper>
    );
  }
  return (
    <>
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
                  {t("modal.payment_package_posts_q")}:{" "}
                  <span>{activeIndex === 1 ? "15" : "30"}</span>
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
    </>
  );
};
