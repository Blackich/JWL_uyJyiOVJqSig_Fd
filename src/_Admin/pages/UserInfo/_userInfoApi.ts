import { adminApi } from "@Admin/utils/utils";
import {
  User,
  UserSocialAccount,
  UserPurchasedService,
  CustomPackageDetails,
  UserPurchasedExtra,
} from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["UserInfo"],
});

export const userInfoApi = adminApiWithTag.injectEndpoints({
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
    getCustomPackageByUserId: builder.query<CustomPackageDetails[], User["id"]>(
      {
        query: (id) => `/users/${id}/custom`,
        providesTags: ["UserInfo"],
      },
    ),
    deleteCustomPackageByUserId: builder.mutation<
      { message: string },
      User["id"]
    >({
      query: (id) => ({
        url: `/users/${id}/custom`,
        method: "DELETE",
      }),
    }),
    getServicesByUserId: builder.query<UserPurchasedService[], User["id"]>({
      query: (id) => `/users/${id}/services`,
    }),
    getExtraByUserId: builder.query<UserPurchasedExtra[], User["id"]>({
      query: (id) => `/users/${id}/extra`,
    }),
  }),
});
