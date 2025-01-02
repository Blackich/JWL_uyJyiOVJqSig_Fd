import { adminApi } from "@Admin/utils/utils";
import { ExtraDetails, ExtraSettings } from "@Admin/utils/types";

export const extraDetailsApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getExtraDeatails: builder.query<ExtraDetails[], void>({
      query: () => `/extra-details`,
    }),
    getExtraSettings: builder.query<ExtraSettings[], void>({
      query: () => `/settings/extra`,
    }),
  }),
});
