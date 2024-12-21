import { Package, PackageSettings } from "@Admin/utils/types";
import { adminApi } from "@Admin/utils/utils";

export const packageApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRate: builder.query<number, void>({
      query: () =>
        "https://v6.exchangerate-api.com/v6/f022fd18e6240e451b1f9fbd/latest/USD",
      transformResponse: (response: { conversion_rates: { RUB: number } }) =>
        response.conversion_rates.RUB,
    }),
    getPackages: builder.query<Package[], void>({
      query: () => "/package",
    }),
    getPackageSettings: builder.query<PackageSettings[], void>({
      query: () => "/package/settings",
    }),
  }),
});
