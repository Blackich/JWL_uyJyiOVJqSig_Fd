import { FC } from "react";
import { useAppSelector } from "@store/store";
import { handlerErrorAxios } from "@utils/utils";
import { PaymentTypeYooKassa } from "@User/Payment/YooKassa/type";
import { getSocialAccId, getUserId } from "@User/auth/_user.slice";
import { YooKassa } from "@User/components/PaymentModal/Entity/PaymentButtons/YooKassa";
import { yooKassaApi } from "@User/Payment/YooKassa/_yooKassaApi";

type Props = {
  serviceId: number;
  count: number;
  priceRUB: number;
  priceUSD: number;
  countComments?: number;
};

export const SystemsExtra: FC<Props> = ({
  count,
  serviceId,
  priceRUB,
  priceUSD,
  countComments,
}) => {
  const userId = useAppSelector(getUserId);
  const pickedAccId = useAppSelector(getSocialAccId);
  const quantity = countComments ? countComments : count;
  const [fetchPaymentYooKassa] = yooKassaApi.usePaymentExtraYooKassaMutation();
  const handlePayYooKassa = async (paymentType: PaymentTypeYooKassa) => {
    if (!userId || !pickedAccId || !serviceId) return;
    await fetchPaymentYooKassa({
      count: quantity,
      userId,
      priceRUB,
      priceUSD,
      serviceId,
      type: paymentType,
      socialNicknameId: pickedAccId,
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
