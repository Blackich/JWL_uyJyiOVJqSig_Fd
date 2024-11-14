import { userApi } from "@User/utils/utils";
import { PaymentPackYooKassa, PaymentPackYooKassaResponse } from "./type";

export const paymentPackApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentPackYooKassa: builder.mutation<
      PaymentPackYooKassaResponse,
      PaymentPackYooKassa
    >({
      query: ({
        userId,
        socialNicknameId,
        packageId,
        countPosts,
        cost,
        currency,
        type,
      }) => ({
        url: "/payment/package",
        method: "POST",
        body: {
          userId,
          socialNicknameId,
          packageId,
          countPosts,
          cost,
          currency,
          type,
        },
      }),
    }),
  }),
});
