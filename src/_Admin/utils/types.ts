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

export interface PurchasedService extends UserPurchasedService {
  userId: number;
  orderId: string;
  fullName: string;
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
