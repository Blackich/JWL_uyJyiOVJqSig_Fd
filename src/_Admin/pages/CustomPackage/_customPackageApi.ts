import { adminApi } from "@Admin/utils/utils";
import { CustomPackageSettings } from "@Admin/utils/types";

export const customPackageApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomPackageById: builder.query<CustomPackageSettings[], number>({
      query: (id) => `/package/custom/${id}`,
    }),
    addCustomPackToUser: builder.mutation<
      { message: string },
      { userId: number; packageId: number }
    >({
      query: ({ userId, packageId }) => ({
        url: `/package/add-user`,
        method: "POST",
        body: { userId, packageId },
      }),
    }),
  }),
});
