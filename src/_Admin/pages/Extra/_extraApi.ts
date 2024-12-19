import { adminApi } from "@Admin/utils/utils";
import { ExtraInfoAdminSide, SendExtraCommentsAdmin } from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["Extra"],
});

export const extraApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getExtraById: builder.query<ExtraInfoAdminSide, ExtraInfoAdminSide["id"]>({
      query: (id) => `extra/${id}`,
      providesTags: ["Extra"],
    }),
    checkStatusForExtra: builder.query<
      { status: string },
      ExtraInfoAdminSide["id"]
    >({
      query: (id) => `extra/${id}/check`,
      providesTags: ["Extra"],
    }),
    sendExtraComments: builder.mutation<
      { message: string },
      SendExtraCommentsAdmin
    >({
      query: ({ extraId, extraServiceId, comments, link }) => ({
        url: `extra/${extraId}/send-comment`,
        method: "POST",
        body: { extraServiceId, comments, link },
      }),
    }),
  }),
});
