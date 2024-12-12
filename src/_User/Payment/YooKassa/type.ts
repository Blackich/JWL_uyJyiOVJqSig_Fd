export type Currency = "RUB" | "USD";
export type PaymentTypeYooKassa = "bank_card" | "sbp";

export type PaymentPackYooKassa = {
  userId: number;
  socialNicknameId: number;
  packageId: number;
  countPosts: number;
  cost: number;
  currency: Currency;
  type?: PaymentTypeYooKassa;
  customPackage: number;
};

export type PaymentExtraYooKassa = {
  userId: number;
  socialNicknameId: number;
  serviceId: number;
  count: number;
  priceRUB: number;
  priceUSD: number;
  type: PaymentTypeYooKassa;
};

export type YooKassaResponse = {
  id: string;
  amount: {
    value: string;
    currency: Currency;
  };
  status: string;
  confirmation: {
    type: string;
    confirmation_url: string;
    return_url: string;
  };
};
