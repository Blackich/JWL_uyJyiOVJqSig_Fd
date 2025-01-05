import { adminApi } from "@Admin/utils/utils";

export type GeneralSettings = {
  id: number;
  status: number;
  description: string;
};

export type ExtraServiceStatus = {
  status: number;
  serviceName: string;
  extraServiceId: number;
};

export const generalSettingsApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralSettings: builder.query<GeneralSettings[], void>({
      query: () => "/general-settings",
    }),
    changeStatusGenSettingById: builder.mutation<
      { message: string },
      { settingId: number }
    >({
      query: ({ settingId }) => ({
        url: `/general-settings`,
        method: "POST",
        body: { settingId },
      }),
    }),
    getExtraServicesStatus: builder.query<ExtraServiceStatus[], void>({
      query: () => "/general-settings/extra",
    }),
    changeStatusExtraServiceById: builder.mutation<
      { message: string },
      { extraServiceId: number }
    >({
      query: ({ extraServiceId }) => ({
        url: `/general-settings/extra`,
        method: "POST",
        body: { extraServiceId },
      }),
    }),
  }),
});
