export type ServerResponse = {
  message: string;
};

export type UserLoginRegisterRequest = {
  email: string;
  password: string;
  reCaptcha?: string;
};

export type UserLoginRegisterResponse = {
  email: string;
  password: string;
  accessToken: string;
};

export type UserAuthData = {
  id: number;
  email: string;
  accessToken?: string;
};

export type UserSocial = {
  id: number;
  nickname: string;
};

export type SocialAccountMutation = {
  id: UserAuthData["id"];
  username: string;
};

export type PackageDetailsUser = {
  id: number;
  likes: number;
  price_rub_15: string;
  price_rub_30: string;
  price_usd_15: string;
  price_usd_30: string;
};

export type CardClassName = {
  className: string;
};

export interface CardList extends PackageDetailsUser {
  className: CardClassName["className"];
}

export type ActivatedService = {
  id: number;
  socialNicknameId: number;
  countPosts: number;
  packageId: number | null;
  customPackageId: number | null;
  createdAt: string;
};

export type Timer = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type CustomPackageDetailsUser = {
  id: number;
  likes: number;
  videoViews: number;
  countPosts: number;
  price_rub: string;
  price_usd: string;
};

export type SendExtraComments = {
  userId: number;
  comments: string[];
  countComments: number;
  socialNicknameId: number;
};

export type PurchasedExtraUser = {
  id: number;
  nickname: string;
  extraServiceName: string;
  count: number;
  priceRUB: string;
  priceUSD: string;
  createdAt: string;
};

export type ExtraDetailsUser = {
  extraServiceId: number;
  minQuantity: number;
  price_rub_1k: string;
  price_usd_1k: string;
};
