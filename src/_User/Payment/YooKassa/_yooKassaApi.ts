import { userApi } from "@User/utils/utils";
import {
  PaymentExtraYooKassa,
  PaymentPackYooKassa,
  YooKassaResponse,
} from "./type";

export const yooKassaApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentPackYooKassa: builder.mutation<
      YooKassaResponse,
      PaymentPackYooKassa
    >({
      query: ({
        cost,
        type,
        userId,
        currency,
        packageId,
        countPosts,
        customPackage,
        socialNicknameId,
      }) => ({
        url: "/payment/yookassa/package",
        method: "POST",
        body: {
          cost,
          type,
          userId,
          currency,
          packageId,
          countPosts,
          customPackage,
          socialNicknameId,
        },
      }),
    }),
    paymentExtraYooKassa: builder.mutation<
      YooKassaResponse,
      PaymentExtraYooKassa
    >({
      query: ({
        type,
        count,
        userId,
        priceRUB,
        priceUSD,
        serviceId,
        socialNicknameId,
      }) => ({
        url: "/payment/yookassa/extra",
        method: "POST",
        body: {
          priceRUB,
          priceUSD,
          type,
          count,
          userId,
          serviceId,
          socialNicknameId,
        },
      }),
    }),
  }),
});
