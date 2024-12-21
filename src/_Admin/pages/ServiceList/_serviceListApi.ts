import { adminApi } from "@Admin/utils/utils";
import { Service } from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["ServiceList"],
});

export const serviceListApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getServiceList: builder.query<Service[], void>({
      query: () => "services",
      providesTags: ["ServiceList"],
    }),
  }),
});
