export type Currency = "RUB" | "USD";
export type PaymentType = "bank_card" | "sbp"; 

export type PaymentPackYooKassa = {
  userId: number;
  socialNicknameId: number;
  packageId: number;
  countPosts: number;
  cost: number;
  currency: Currency;
  type?: PaymentType;
};

export type PaymentPackYooKassaResponse = {
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
