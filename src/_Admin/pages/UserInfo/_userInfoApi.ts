import { adminApi } from "@Admin/utils/utils";
import {
  User,
  UserSocialAccount,
  UserPurchasedService,
} from "@Admin/utils/types";

export const userInfoApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, User["id"]>({
      query: (id) => `/users/${id}`,
    }),
    updateUserStatus: builder.mutation<{ message: string }, User["id"]>({
      query: (id) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
      }),
    }),
    updateUserRemark: builder.mutation<
      { message: string },
      { id: User["id"]; remark: User["remark"] }
    >({
      query: ({ id, remark }) => ({
        url: `/users/${id}/remark`,
        method: "PATCH",
        body: { remark },
      }),
    }),
    getUserSocialAccounts: builder.query<UserSocialAccount[], User["id"]>({
      query: (id) => `/users/${id}/social`,
    }),
    getUserPurchasedServices: builder.query<UserPurchasedService[], User["id"]>(
      {
        query: (id) => `/users/${id}/services`,
      },
    ),
  }),
});
