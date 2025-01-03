import "./LoginFormUser.css";
import { FC, useLayoutEffect, useState } from "react";
import { Input } from "@ui/Input/Input";
import { Button } from "@ui/Button/Button";
import { authUser } from "@User/auth/_authApi";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";

export const LoginFormUser: FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [fetchLoginUser] = authUser.useLazyLoginUserQuery();
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const { data: isLoggedIn, isLoading } = authUser.useCheckAuthUserQuery();

  const onSubmit = async (token: string) => {
    if (!token || typeof token !== "string" || token.length !== 16)
      return setOpenAlertError(true);

    await fetchLoginUser(token).then((res) => {
      if (res?.data) {
        navigate("/", { replace: true });
        return;
      }
      if (res?.error) return setOpenAlertError(true);
    });
  };

  useLayoutEffect(() => {
    if (isLoggedIn && isLoggedIn.id && typeof isLoggedIn.id === "number") {
      return navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoading) {
    return (
      <>
        <div className="login-container__wrapper">Загрузка...</div>
      </>
    );
  }

  return (
    <>
      <div className="login-container__wrapper">
        <div className="login-container">
          <div className="login_container__title">
            <p>Привет!</p>С радостью поработаем вместе с вами. <br />
          </div>
          <Input
            bg="#f5f5f5"
            placeholder="Token"
            // defaultValue={"4zpme35asi6h6735"}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button style={{ width: "300px" }} onClick={() => onSubmit(token)}>
            Войти
          </Button>
        </div>
      </div>
      <AlertMessage
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
        type="error"
        message="Неверный Token"
      />
    </>
  );
};
