export type AdminLoginFormData = {
  login: string;
  password: string;
};

export type AuthResponseData = {
  login: string;
  token: string;
};

export type AuthResponse = {
  data: AuthResponseData;
  error?: string | null;
  isAuth: boolean | null;
};
