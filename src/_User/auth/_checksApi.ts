import { userApi } from "@User/utils/utils";

export const checksUserApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    checkStatusExternalServices: builder.query<{ message: string }, void>({
      query: () => `/check/external-status`,
    }),
    checkPackPurchaseOption: builder.query<
      { message: string; status: boolean },
      void
    >({
      query: () => `/check/available/package`,
    }),
    checkExtraPurchaseOption: builder.query<
      { message: string; status: boolean },
      void
    >({
      query: () => `/check/available/extra`,
    }),
  }),
});
