import { PackageDetails, PackageSettings } from "@Admin/utils/types";
import { adminApi } from "@Admin/utils/utils";

export const packageApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRate: builder.query<number, void>({
      query: () => "settings/exchange-rate",
    }),
    getPackageDetails: builder.query<PackageDetails[], void>({
      query: () => "/package/details",
    }),
    getPackageSettings: builder.query<PackageSettings[], void>({
      query: () => "/settings/package",
    }),
  }),
});
