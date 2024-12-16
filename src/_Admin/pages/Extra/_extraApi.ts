import { adminApi } from "@Admin/utils/utils";
import { ExtraInfoAdminSide } from "@Admin/utils/types";

export const extraApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getExtraById: builder.query<ExtraInfoAdminSide, ExtraInfoAdminSide["id"]>({
      query: (id) => `extra/${id}`,
    }),
    checkStatusForExtra: builder.query<
      { status: string },
      ExtraInfoAdminSide["id"]
    >({
      query: (id) => `extra/${id}/check`,
    }),
  }),
});
