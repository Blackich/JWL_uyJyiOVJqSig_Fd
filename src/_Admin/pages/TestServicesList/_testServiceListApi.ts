import { adminApi } from "@Admin/utils/utils";
import { TestServiceList } from "@Admin/utils/types";

export const testServiceListApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestServicesSent: builder.query<TestServiceList[], void>({
      query: () => "/test",
    }),
  }),
});
