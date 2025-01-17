export type User = {
  id: number;
  email: string;
  status: number;
  createdAt: string;
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
  status: number;
  createdAt: string;
};

export type UserPurchasedExtra = {
  id: number;
  count: number;
  nickname: number;
  createdAt: string;
  extraServiceName: string;
};

export type Service = {
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
  cost: string;
  currency: string;
  paymentServiceName: string;
};

export type PurchasedService = {
  id: number;
  serviceId: number;
  siteId: number;
  siteServiceId: number;
  orderId: number;
};

export type PurchasedServiceWithName = {
  typeService: string;
} & PurchasedService;

export type StatusPurchasedService = {
  status: string;
  remains?: string;
  posts?: string;
  expiry?: boolean;
};

export type PackageDetails = {
  id: number;
  likes: number;
  price_rub_15: string;
  price_rub_30: string;
  price_usd_15: string;
  price_usd_30: string;
};

export type PackageSettings = {
  id: number;
  siteId: number;
  typeService: string;
  serviceId: number;
  status: number;
  createdAt: string;
  cost: string;
  ratio: string;
};

export type CustomPackageDetails = {
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
  CustomPackageDetails,
  "price_rub" | "price_usd"
>;

export type CustomPackageUser = {
  userId: number;
  customPackageId: number;
  createdAt: string;
};

export type TestDetails = {
  link: string;
  speed: number;
  comments: string[];
  employeeId: number;
  testServiceId: number;
};

export type PrimeCostCustomPackage = {
  primeCost: [string, number][];
  likes: number;
  reach: number;
  videoViews: number;
  countPosts: number;
  saves: number;
  profileVisits: number;
  reposts: number;
  videoViewsExtra?: number;
  impressionExtra?: number;
};

export type ExtraInfoAdminSide = {
  id: number;
  userId: number;
  invitedName: string;
  nickname: string;
  extraServiceId: number;
  extraServiceName: string;
  count: number;
  priceRUB: string;
  priceUSD: string;
  siteId: number;
  paymentOrderId: string;
  createdAt: string;
  siteServiceInfo: [number, number, number] | null;
  paymentServiceName: string;
};

export type SendExtraCommentsAdmin = {
  extraId: number;
  extraServiceId: number;
  comments: string[];
  link: string;
};

export type TestServiceSettings = {
  id: number;
  cost: string;
  count: number;
  createdAt: string;
  drip: number;
  serviceId: number;
  siteId: number;
  testServiceId: number;
  typeService: string;
};

export type TestServiceList = {
  id: number;
  link: string;
  senderName: string;
  createdAt: string;
  testServiceName: string;
};

export type ExtraDetails = {
  id: number;
  extraServiceId: number;
  serviceName: string;
  price_usd_1k: string;
  price_rub_1k: string;
};

export type ExtraSettings = {
  cost: string;
  createdAt: string;
  extraServiceId: number;
  id: number;
  serviceId: number;
  siteId: number;
  status: number;
};
