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

export type PackageUser = {
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

export interface CardList extends PackageUser {
  className: CardClassName["className"];
}

export type ActivatedService = {
  socialNicknameId: number;
  countPosts: number;
  packageId: number;
  createdAt: string;
};

export type Timer = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
