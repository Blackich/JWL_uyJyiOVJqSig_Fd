import { CustomPackageSettings } from "@Admin/utils/types";
import { adminApi } from "@Admin/utils/utils";

export const customPackageApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomPackage: builder.mutation<
      { message: string },
      CustomPackageSettings
    >({
      query: ({
        likes,
        reach,
        saves,
        profileVisits,
        reposts,
        videoViews,
        countPosts,
        price_usd,
        price_rub,
      }) => ({
        url: "/package/custom",
        method: "POST",
        body: {
          likes,
          reach,
          saves,
          profileVisits,
          reposts,
          videoViews,
          countPosts,
          price_usd,
          price_rub,
        },
      }),
    }),
  }),
});
