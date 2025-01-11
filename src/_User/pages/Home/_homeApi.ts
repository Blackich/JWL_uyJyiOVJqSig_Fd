import { userApi } from "@User/utils/utils";
import {
  ActivatedService,
  UserAuthData,
  CustomPackageDetailsUser,
  PackageDetailsUser,
  ServerResponse,
  SocialAccountMutation,
  UserSocial,
} from "@User/utils/types";

export const userHomeApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialList: builder.query<UserSocial[], UserAuthData["id"]>({
      query: (id) => `/social/${id}`,
    }),
    addInstAccount: builder.mutation<ServerResponse, SocialAccountMutation>({
      query: ({ id, username }) => ({
        url: "/social",
        method: "POST",
        body: {
          id,
          username,
        },
      }),
    }),
    deleteInstAccount: builder.mutation<ServerResponse, SocialAccountMutation>({
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
    getActiveService: builder.query<ActivatedService[], UserAuthData["id"]>({
      query: (id) => `/services/${id}`,
    }),
    getCustomPackDetailsByUserId: builder.query<
      CustomPackageDetailsUser[],
      UserAuthData["id"]
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
