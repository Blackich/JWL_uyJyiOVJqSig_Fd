const getUnixTime = () => Math.round(+ new Date() / 1000);

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  try {
    const { exp, iat } = JSON.parse(atob(token.split(".")[1]));
    if (!exp || !iat) return true;
    const tokenLifeTime = exp - getUnixTime();
    
    return tokenLifeTime < 15;

  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    return true;
  }
};
