export type Package = {
  likes: number;
  priceRUB: number;
  priceUSD: number;
  countPosts: number;
  customPackageId?: number;
};

export type ExtraService = {
  serviceId: number;
  count: number;
  priceRUB: number;
  priceUSD: number;
};
