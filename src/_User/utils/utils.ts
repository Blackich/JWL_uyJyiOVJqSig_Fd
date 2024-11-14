import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrlUser = {
  baseUrl: "http://localhost:4444/",
  credentials: "include" as RequestCredentials,
  prepareHeaders: (headers: Headers) => {
    headers.set("Accept", "application/json, text/plain, */*");

    return headers;
  },
};

export const userApi = createApi({
  baseQuery: fetchBaseQuery(baseUrlUser),
  reducerPath: "userApi",
  tagTypes: ["userApi"],
  endpoints: () => ({}),
});