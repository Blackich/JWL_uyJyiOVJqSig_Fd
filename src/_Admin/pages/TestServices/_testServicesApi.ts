import { adminApi } from "@Admin/utils/utils";
import { TestDetails, TestServiceSettings } from "@Admin/utils/types";

export const testServiceApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    sendTestPackage: builder.mutation<{ message: string }, TestDetails>({
      query: ({ testServiceId, employeeId, link, speed }) => ({
        url: "/test",
        method: "POST",
        body: { testServiceId, employeeId, link, speed },
      }),
    }),
    getTestServiceSettings: builder.query<TestServiceSettings[], void>({
      query: () => "/settings/test",
    }),
  }),
});
