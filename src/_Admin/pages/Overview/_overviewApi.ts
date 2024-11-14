import { adminApi } from "@Admin/utils/utils";

export const overviewApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalanceVR: builder.query<number, void>({
      query: () => "/info/balance/vr",
    }),
    getBalanceJP: builder.query<number, void>({
      query: () => "/info/balance/jp",
    }),
    getUsersCount: builder.query<number, void>({
      query: () => "/info/users/count",
    }),
    // getUsersSpent: builder.query<number, void>({
    //   query: () => "/info/users/spent",
    // }),
  }),
});
