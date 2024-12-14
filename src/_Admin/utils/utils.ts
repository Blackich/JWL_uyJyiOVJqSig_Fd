import { PrimeCostCustomPackage } from "./types";
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
  const package1kCount = ratio.map((coefficient) => {
    const count = likes * coefficient < 100 ? 115 : likes * coefficient * 1.02;
    return count;
  });
  const costs = package1kCount.reduce((acc, _, i) => {
    const res = primeCost[i] * (package1kCount[i] / 1000);
    return acc + res;
  }, 0);

  return costs * 15;
};

export const calcPrimeCostCustomPackage = ({
  primeCost,
  likes,
  reach,
  videoViews,
  saves,
  profileVisits,
  reposts,
  countPosts = 15,
  videoViewsExtra = 115,
  impressionExtra = 115,
}: PrimeCostCustomPackage) => {
  const package1k = {
    likes: likes * 1.02,
    reach: reach * 1.02,
    saves: saves <= 100 ? 115 : saves * 1.02,
    profileVisits: profileVisits <= 100 ? 115 : profileVisits * 1.02,
    reposts: reposts <= 100 ? 115 : reposts * 1.02,
    videoViews: videoViews * 1.02,
    videoViewsExtra,
    impressionExtra,
  };
  const packArray = Object.entries(package1k);

  const costs = packArray.reduce((acc, element) => {
    const typeService = element[0];
    const count = element[1];
    const priceByTypeService = primeCost.find(
      (item) => item[0] === typeService,
    )?.[1];

    if (!priceByTypeService) return acc;
    const res = priceByTypeService * (count / 1000);
    return acc + res;
  }, 0);

  return costs * countPosts;
};

export const extractInstUsername = (url: string) => {
  const regex = /instagram\.com\/([^/?#]+)(?:\?.*?)?/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
