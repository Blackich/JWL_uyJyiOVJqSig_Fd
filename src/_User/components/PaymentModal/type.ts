export type ModalData = Package | Extra;

export type Package = {
  likes: number;
  priceRUB: number;
  priceUSD: number;
  countPosts: number;
  customPackageId?: number;
};

export type Extra = {
  count: number;
  serviceId: number;
  selectItems: { ru: string[]; en: string[] };
  priceRUB: number;
  priceUSD: number;
  countComment?: number;
};
