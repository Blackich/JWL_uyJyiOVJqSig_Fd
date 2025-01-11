import { userApi } from "@User/utils/utils";
import {
  UserAuthData,
  ServerResponse,
  UserLoginRegisterRequest,
  UserLoginRegisterResponse,
} from "@User/utils/types";

export const authUser = userApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.query<
      UserLoginRegisterResponse,
      UserLoginRegisterRequest
    >({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
    }),
    registerUser: builder.query<
      UserLoginRegisterResponse,
      UserLoginRegisterRequest
    >({
      query: ({ email, password, reCaptcha }) => ({
        url: "register",
        method: "POST",
        body: { email, password, reCaptcha },
      }),
    }),
    logoutUser: builder.query<ServerResponse, void>({
      query: () => "logout",
    }),
    checkAuthUser: builder.query<UserAuthData, void>({
      query: () => "check",
    }),
  }),
});
