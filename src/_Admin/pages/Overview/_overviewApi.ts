import { adminApi } from "@Admin/utils/utils";

export const overviewApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalanceVR: builder.query<number, void>({
      query: () => "/info/balance/vr",
    }),
    getBalanceJP: builder.query<number, void>({
      query: () => "/info/balance/jp",
    }),
    getBalanceWQ: builder.query<number, void>({
      query: () => "/info/balance/wq",
    }),
    getUsersCount: builder.query<number, void>({
      query: () => "/info/users/count",
    }),
    getTotalSpent: builder.query<number, void>({
      query: () => "/info/service/spent",
    }),
    getPurchasedPackagesCount: builder.query<number, void>({
      query: () => "/info/service/count",
    }),
  }),
});
