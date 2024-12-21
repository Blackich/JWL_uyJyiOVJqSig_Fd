import { adminApi } from "@Admin/utils/utils";
import { CustomPackageDetails } from "@Admin/utils/types";

export const customPackageApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomPackageDetailsById: builder.query<CustomPackageDetails[], number>({
      query: (id) => `/custom-package/${id}`,
    }),
    addCustomPackToUser: builder.mutation<
      { message: string },
      { userId: number; customPackageId: number }
    >({
      query: ({ userId, customPackageId }) => ({
        url: `/custom-package/add-user`,
        method: "POST",
        body: { userId, customPackageId },
      }),
    }),
  }),
});
