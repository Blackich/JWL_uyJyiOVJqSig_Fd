import { CustomPackageDetails } from "@Admin/utils/types";
import { adminApi } from "@Admin/utils/utils";

export const customPackageCreateApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomPackage: builder.mutation<
      { message: string },
      CustomPackageDetails
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
        url: "/custom-package",
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
