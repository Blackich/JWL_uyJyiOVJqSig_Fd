import { userApi } from "@User/utils/utils";
import {
  AuthUser,
  ExtraDetailsUser,
  PurchasedExtraUser,
  ResponseServer,
  SendExtraComments,
} from "@User/utils/types";

export const userExtraApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getExtraDetails: builder.query<ExtraDetailsUser[], void>({
      query: () => "/extra-details",
    }),
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
