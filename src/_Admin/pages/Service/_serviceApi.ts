import { adminApi } from "@Admin/utils/utils";
import { PurchasedService, Service } from "@Admin/utils/types";

export const serviceApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceById: builder.query<Service, Service["id"]>({
      query: (id) => `services/${id}`,
    }),
    updateServiceStatus: builder.mutation<{ message: string }, Service["id"]>({
      query: (id) => ({
        url: `/services/${id}/status`,
        method: "PATCH",
      }),
    }),
    getPurchasedServiceById: builder.query<PurchasedService[], Service["id"]>({
      query: (id) => `/services/${id}/purchase`,
    }),
    checkStatusSubscription: builder.query<{ status: string }[], Service["id"]>({
      query: (id) => `/services/${id}/check`,
    }),
  }),
});
