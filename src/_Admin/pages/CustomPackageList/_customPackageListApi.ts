import { adminApi } from "@Admin/utils/utils";
import { CustomPackageSettings } from "@Admin/utils/types";

export const customPackageListApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomPackageList: builder.query<CustomPackageSettings[], void>({
      query: () => "/package/custom",
    }),
  }),
});
