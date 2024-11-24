export type User = {
  id: number;
  token: string;
  status: string;
  createdAt: string;
  invitedEmployeeId: string;
  fullName: string;
  remark: string;
};

export type UserSocialAccount = {
  id: number;
  userId: number;
  messangerId: number;
  nickname: string;
  createdAt: string;
  status: number;
};

export type UserPurchasedService = {
  id: number;
  nickname: string;
  likes: number;
  countPosts: number;
  cost: number;
  currency: string;
  status: number;
  customPackage: number;
  createdAt: string;
};

export interface PurchasedService {
  id: number;
  userId: number;
  fullName: string;
  nickname: string;
  packageId: number | null;
  packageLikes: number | null;
  customPackageId: number | null;
  customLikes: number | null;
  countPosts: number;
  orderId: string;
  status: number;
  createdAt: string;
  cost: number;
  currency: string;
}

export type Package = {
  id: number;
  likes: number;
  price_rub_15: number;
  price_rub_30: number;
  price_usd_15: number;
  price_usd_30: number;
};

export type PackageDetails = {
  id: number;
  siteId: number;
  typeService: string;
  serviceId: number;
  status: number;
  createdAt: string;
  price: number;
  ratio: number;
};

export type CustomPackageSettings = {
  likes: number;
  reach: number;
  saves: number;
  profileVisits: number;
  reposts: number;
  videoViews: number;
  countPosts: number;
  price_rub: number;
  price_usd: number;
};

export type CustomPackWithoutPrice = Omit<
  CustomPackageSettings,
  "price_rub" | "price_usd"
>;

export type CustomPackageUser = {
  userId: number;
  customPackageId: number;
  createdAt: string;
};
