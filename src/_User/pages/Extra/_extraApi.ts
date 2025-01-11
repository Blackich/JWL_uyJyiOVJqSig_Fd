import { userApi } from "@User/utils/utils";
import {
  UserAuthData,
  ExtraDetailsUser,
  PurchasedExtraUser,
  ServerResponse,
  SendExtraComments,
} from "@User/utils/types";

export const userExtraApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getExtraDetails: builder.query<ExtraDetailsUser[], void>({
      query: () => "/extra-details",
    }),
    saveCommentsBeforePayment: builder.mutation<
      ServerResponse,
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
      UserAuthData["id"]
    >({
      query: (id) => `/extra/${id}`,
    }),
  }),
});
