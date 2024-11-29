import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrlAdmin = {
  baseUrl: "http://localhost:4444/api",
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    headers.set("Accept", "application/json, text/plain, */*");
    return headers;
  },
};

export const adminApi = createApi({
  baseQuery: fetchBaseQuery(baseUrlAdmin),
  reducerPath: "adminApi",
  tagTypes: ["adminApi"],
  endpoints: () => ({}),
});

export const calcPrimeCostPackage = (
  primeCost: number[],
  ratio: number[],
  likes: number,
) => {
  const package1k = ratio.map((coefficient) => {
    const count = likes * coefficient < 100 ? 115 : likes * coefficient * 1.02;
    return count;
  });

  const costs = package1k.reduce((acc, _, i) => {
    const res = primeCost[i] * (package1k[i] / 1000);
    return acc + res;
  }, 0);

  return costs * 15;
};

export const calcPrimeCostCustomPackage = (
  primeCost: number[],
  likes: number,
  reach: number,
  videoViews: number,
  countPosts: number = 15,
  saves: number,
  autoProfileVisits: number,
  autoShares: number,
) => {
  const package1k = [
    likes * 1.02,
    reach * 1.02,
    saves * 1.02,
    autoProfileVisits * 1.02,
    autoShares * 1.02,
    videoViews * 1.02,
  ];

  const costs = package1k.reduce((acc, _, i) => {
    const res = primeCost[i] * (package1k[i] / 1000);
    return acc + res;
  }, 0);

  return costs * countPosts;
};

export const extractInstUsername = (url: string) => {
  const regex = /instagram\.com\/([^/?#]+)(?:\?.*?)?/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
