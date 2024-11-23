import { userApi } from "@User/utils/utils";
import {
  ActivatedService,
  AuthUser,
  CustomPackageUser,
  PackageUser,
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
    getPackageList: builder.query<PackageUser[], void>({
      query: () => "/package",
    }),
    getActiveService: builder.query<ActivatedService[], AuthUser["id"]>({
      query: (id) => `/services/${id}`,
    }),
    getCustomPackByUserId: builder.query<CustomPackageUser[], AuthUser["id"]>({
      query: (id) => `/custom/${id}`,
    }),
  }),
});
