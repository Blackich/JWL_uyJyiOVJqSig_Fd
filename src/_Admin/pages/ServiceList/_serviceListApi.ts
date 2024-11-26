import { adminApi } from "@Admin/utils/utils";
import { Service } from "@Admin/utils/types";

export const serviceListApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceList: builder.query<Service[], void>({
      query: () => "services",
    }),
  }),
});
