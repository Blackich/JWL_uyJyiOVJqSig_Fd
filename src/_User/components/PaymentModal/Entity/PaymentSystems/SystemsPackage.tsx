import { FC } from "react";
import { useAppSelector } from "@store/store";
import { handlerErrorAxios } from "@utils/utils";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { PaymentTypeYooKassa } from "@User/Payment/YooKassa/type";
import { yooKassaApi } from "@User/Payment/YooKassa/_yooKassaApi";
import { getSocialAccId, getUserId } from "@User/auth/_user.slice";
import { YooKassa } from "@User/components/PaymentModal/Entity/PaymentButtons/YooKassa";

type Props = {
  likes: number;
  priceRUB: number;
  countPosts: number;
  customPackageId?: number;
};

export const SystemsPackage: FC<Props> = ({
  likes,
  priceRUB,
  countPosts,
  customPackageId,
}) => {
  const userId = useAppSelector(getUserId);
  const pickedAccId = useAppSelector(getSocialAccId);

  const { data: packageDetails } = userHomeApi.useGetPackageDetailsQuery();
  const [fetchPaymentYooKassa] = yooKassaApi.usePaymentPackYooKassaMutation();

  const packageId = customPackageId
    ? customPackageId
    : packageDetails?.find((detail) => detail.likes === likes)?.id;

  const handlePayYooKassa = async (paymentType: PaymentTypeYooKassa) => {
    if (!userId || !pickedAccId || !packageId) return;
    await fetchPaymentYooKassa({
      userId: userId,
      socialNicknameId: pickedAccId,
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

  return (
    <div className="payment-modal__payment-systems">
      <YooKassa onClick={handlePayYooKassa} type="bank_card" />
      <YooKassa onClick={handlePayYooKassa} type="sbp" />
      <button className="payment-modal__btn"></button>
      <button className="payment-modal__btn"></button>
      <button className="payment-modal__btn"></button>
      <button className="payment-modal__btn"></button>
    </div>
  );
};
