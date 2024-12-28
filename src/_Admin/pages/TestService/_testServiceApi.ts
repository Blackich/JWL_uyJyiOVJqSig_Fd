import { adminApi } from "@Admin/utils/utils";
import { TestDetails, TestServiceSettings } from "@Admin/utils/types";

export const testServiceApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestServiceSettings: builder.query<TestServiceSettings[], void>({
      query: () => "/settings/test",
    }),
    sendTestPackage: builder.mutation<{ message: string }, TestDetails>({
      query: ({ testServiceId, employeeId, link, speed, comments }) => ({
        url: "/test",
        method: "POST",
        body: { testServiceId, employeeId, link, speed, comments },
      }),
    }),
  }),
});
