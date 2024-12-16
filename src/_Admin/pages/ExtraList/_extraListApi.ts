import { adminApi } from "@Admin/utils/utils";
import { ExtraInfoAdminSide } from "@Admin/utils/types";

export const extraListApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getExtraList: builder.query<ExtraInfoAdminSide[], void>({
      query: () => "extra",
    }),
  }),
});
