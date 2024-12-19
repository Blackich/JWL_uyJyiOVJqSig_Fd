import { adminApi } from "@Admin/utils/utils";
import { ExtraInfoAdminSide } from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["ExtraList"],
});

export const extraListApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getExtraList: builder.query<ExtraInfoAdminSide[], void>({
      query: () => "extra",
      providesTags: ["ExtraList"],
    }),
  }),
});
