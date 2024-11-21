import { adminApi } from "@Admin/utils/utils";
import { CustomPackageSettings } from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["customPackageList"],
});

export const customPackageListApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCustomPackageList: builder.query<CustomPackageSettings[], void>({
      query: () => "/package/custom",
      providesTags: ["customPackageList"],
    }),
  }),
});
