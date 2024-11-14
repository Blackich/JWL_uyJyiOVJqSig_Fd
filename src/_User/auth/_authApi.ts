import { userApi } from "@User/utils/utils";
import { AuthUser } from "@User/utils/types";

export const authUser = userApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.query<AuthUser, { token: string }>({
      query: (token) => ({
        url: "login",
        method: "POST",
        body: { token },
      }),
    }),
    logoutUser: builder.query<string, void>({
      query: () => "logout",
    }),
    checkAuthUser: builder.query<AuthUser, void>({
      query: () => "check",
    }),
  }),
});
