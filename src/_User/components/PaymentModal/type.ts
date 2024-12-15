export type ModalData = Package | ExtraService;

export type Package = {
  likes: number;
  priceRUB: number;
  priceUSD: number;
  countPosts: number;
  customPackageId?: number;
};

export type ExtraService = {
  count: number;
  serviceId: number;
  selectItems: { ru: string[]; en: string[] };
  priceRUB: number;
  priceUSD: number;
};
