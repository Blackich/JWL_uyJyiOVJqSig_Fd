import { userApi } from "@User/utils/utils";
import { PaymentPackYooKassa, PaymentPackYooKassaResponse } from "./type";

export const paymentPackApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentPackYooKassa: builder.mutation<
      PaymentPackYooKassaResponse,
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
  }),
});
