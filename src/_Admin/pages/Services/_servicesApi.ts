import { adminApi } from "@Admin/utils/utils";
import { PurchasedService } from "@Admin/utils/types";

export const servicesApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchasedServiceList: builder.query<PurchasedService[], void>({
      query: () => "services",
    }),
  }),
});
