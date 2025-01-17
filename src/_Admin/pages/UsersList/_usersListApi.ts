import { adminApi } from "@Admin/utils/utils";
import { User } from "@Admin/utils/types";

export const usersListApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
  }),
});
