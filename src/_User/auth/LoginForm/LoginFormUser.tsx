import "./LoginFormUser.css";
import { Input } from "@ui/Input/Input";
import { Button } from "@ui/Button/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { authUser } from "@User/auth/_authApi";
import { useNavigate } from "react-router-dom";
import { isValidFormData } from "./LoginData";
import { useTranslation } from "react-i18next";
import { handlerErrorAxios } from "@utils/utils";
import { FC, useLayoutEffect, useState } from "react";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";

export const LoginFormUser: FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [email, setEmail] = useState<string | null>("king000007@yandex.ru");
  const [password, setPassword] = useState<string | null>("7865fghfgh");
  const [reCaptcha, setReCaptcha] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reCaptchaError, setReCaptchaError] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [emailExistError, setEmailExistError] = useState<boolean>(false);

  const [loginUser] = authUser.useLazyLoginUserQuery();
  const [registerUser] = authUser.useLazyRegisterUserQuery();
  const { data: isLoggedIn, isLoading } = authUser.useCheckAuthUserQuery();

  const handleClickLogin = async () => {
    const formError = isValidFormData(email, password, i18n.language);
    if (formError && !formError.valid) return setErrorMessage(formError.err);
    setErrorMessage(null);
    if (!email || !password) return setOpenAlertError(true);

    await loginUser({ email, password }).then((res) => {
      if (res?.data) {
        localStorage.setItem("access-Token", res.data.accessToken);
        navigate("/", { replace: true });
        console.log(res.data);
        return;
      }
      if (res?.error) return setOpenAlertError(true);
    });
  };

  const handleClickRegister = async () => {
    const formError = isValidFormData(email, password, i18n.language);
    if (formError && !formError.valid) return setErrorMessage(formError.err);
    if (!reCaptcha) return setErrorMessage("Поставьте флажок");
    setErrorMessage(null);
    if (!email || !password) return setOpenAlertError(true);

    await registerUser({ email, password, reCaptcha }).then((res) => {
      if (res?.data) {
        localStorage.setItem("access-Token", res.data.accessToken);
        navigate("/", { replace: true });
        console.log(res.data);
        return;
      }
      if (res?.error) {
        const error = handlerErrorAxios(res.error);
        if (error?.codeErr === 2) return setEmailExistError(true);
        if (error?.codeErr === 4 || error?.codeErr === 5)
          return setReCaptchaError(true);
        return setOpenAlertError(true);
      }
    });
  };

  useLayoutEffect(() => {
    if (isLoggedIn?.id && typeof isLoggedIn.id === "number") {
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

  const handleReCaptchaChange = (value: string | null) => {
    return setReCaptcha(value);
  };

  return (
    <>
      <div className="login-container__wrapper">
        <div className="login-container">
          <div className="login_container__title">
            <p>Привет!</p>С радостью поработаем вместе с вами. <br />
          </div>
          <Input
            bg="#f5f5f5"
            placeholder="Email"
            value={email as string}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            bg="#f5f5f5"
            placeholder="Password"
            value={password as string}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ReCAPTCHA
            sitekey="6Leu77EqAAAAAM3KS8dbhqtJMhej3SJVYxW_DOiG"
            onChange={(value) => handleReCaptchaChange(value)}
            hl={i18n.language}
          />
          {errorMessage && (
            <div className="login-form__error">{errorMessage}</div>
          )}
          <Button style={{ width: "300px" }} onClick={handleClickLogin}>
            Войти
          </Button>
          <Button style={{ width: "300px" }} onClick={handleClickRegister}>
            Регистрация
          </Button>
        </div>
      </div>
      <AlertMessage
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
        type="error"
        message="Incorrect email/password"
      />
      <AlertMessage
        isOpen={emailExistError}
        onClose={() => setEmailExistError(false)}
        type="error"
        message="Email already exists"
      />
      <AlertMessage
        isOpen={reCaptchaError}
        onClose={() => setReCaptchaError(false)}
        type="error"
        message="Incorrect reCaptcha"
      />
    </>
  );
};
