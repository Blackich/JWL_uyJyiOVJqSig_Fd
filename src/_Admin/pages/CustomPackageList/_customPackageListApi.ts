import { adminApi } from "@Admin/utils/utils";
import { CustomPackageDetails } from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["customPackageList"],
});

export const customPackageListApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCustomPackageList: builder.query<CustomPackageDetails[], void>({
      query: () => "/custom-package/details",
      providesTags: ["customPackageList"],
    }),
  }),
});
