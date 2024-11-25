export type AdminLoginFormData = {
  login: string;
  password: string;
};

export type AuthResponseData = {
  employeeId: number | null;
  login: string;
  role: string;
  token: string;
};

export type AuthResponse = {
  data: AuthResponseData;
  error?: string | null;
  isAuth: boolean | null;
};
