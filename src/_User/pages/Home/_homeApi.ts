import { userApi } from "@User/utils/utils";
import {
  ActivatedService,
  AuthUser,
  CustomPackageDetailsUser,
  PackageDetailsUser,
  ResponseServer,
  SocialAccountMutation,
  UserSocial,
} from "@User/utils/types";

export const userHomeApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialList: builder.query<UserSocial[], AuthUser["id"]>({
      query: (id) => `/social/${id}`,
    }),
    addInstAccount: builder.mutation<ResponseServer, SocialAccountMutation>({
      query: ({ id, username }) => ({
        url: "/social",
        method: "POST",
        body: {
          id,
          username,
        },
      }),
    }),
    deleteInstAccount: builder.mutation<ResponseServer, SocialAccountMutation>({
      query: ({ id, username }) => ({
        url: "/social",
        method: "DELETE",
        body: {
          id,
          username,
        },
      }),
    }),
    getPackageDetails: builder.query<PackageDetailsUser[], void>({
      query: () => "/package/details",
    }),
    getActiveService: builder.query<ActivatedService[], AuthUser["id"]>({
      query: (id) => `/services/${id}`,
    }),
    getCustomPackDetailsByUserId: builder.query<
      CustomPackageDetailsUser[],
      AuthUser["id"]
    >({
      query: (id) => `/custom-package/details/${id}`,
    }),
    checkPostsRemaining: builder.query<
      { count: number },
      { serviceId: number }
    >({
      query: ({ serviceId }) => ({
        url: `/check/remaining-posts`,
        method: "POST",
        body: { serviceId },
      }),
    }),
  }),
});
