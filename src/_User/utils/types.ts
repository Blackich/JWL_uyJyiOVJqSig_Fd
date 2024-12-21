export type AuthUser = {
  message: string;
  id: number;
};

export type UserSocial = {
  id: number;
  nickname: string;
};

export type SocialAccountMutation = {
  id: AuthUser["id"];
  username: string;
};

export type ResponseServer = {
  message: string;
};

export type PackageDetailsUser = {
  id: number;
  likes: number;
  price_rub_15: number;
  price_rub_30: number;
  price_usd_15: number;
  price_usd_30: number;
};

export type CardClassName = {
  className: string;
};

export interface CardList extends PackageDetailsUser {
  className: CardClassName["className"];
}

export type ActivatedService = {
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
  price_rub: number;
  price_usd: number;
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
  priceRUB: number;
  priceUSD: number;
  createdAt: string;
};
