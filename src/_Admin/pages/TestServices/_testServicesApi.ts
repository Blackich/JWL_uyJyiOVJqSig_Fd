import { adminApi } from "@Admin/utils/utils";
import { TestPackage } from "@Admin/utils/types";

export const testServiceApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    sendTestPackage: builder.mutation<{ message: string }, TestPackage>({
      query: ({ testServiceId, employeeId, link }) => ({
        url: "/package/test",
        method: "POST",
        body: { testServiceId, employeeId, link },
      }),
    }),
  }),
});