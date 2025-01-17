import { adminApi } from "@Admin/utils/utils";
import { User } from "@Admin/utils/types";
import { AuthResponseData } from "@Admin/auth/types";

const adminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["UserList"],
});

export const usersListApi = adminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["UserList"],
    }),
    createUser: builder.mutation<
      { message: string },
      AuthResponseData["employeeId"]
    >({
      query: (employeeId) => ({
        url: "users",
        method: "POST",
        body: { employeeId },
      }),
    }),
  }),
});
