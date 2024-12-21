import { userApi } from "@User/utils/utils";
import {
  AuthUser,
  PurchasedExtraUser,
  ResponseServer,
  SendExtraComments,
} from "@User/utils/types";

export const userExtraApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    saveCommentsBeforePayment: builder.mutation<
      ResponseServer,
      SendExtraComments
    >({
      query: ({ userId, socialNicknameId, comments, countComments }) => ({
        url: `/extra/comment`,
        method: "POST",
        body: {
          userId,
          comments,
          countComments,
          socialNicknameId,
        },
      }),
    }),
    getPurchasedExtraByUserId: builder.query<
      PurchasedExtraUser[],
      AuthUser["id"]
    >({
      query: (id) => `/extra/${id}`,
    }),
  }),
});
