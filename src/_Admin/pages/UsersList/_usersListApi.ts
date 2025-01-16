import { adminApi } from "@Admin/utils/utils";
import { User } from "@Admin/utils/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["UserList"],
});

export const usersListApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["UserList"],
    }),
  }),
});
