import "./LoginForm.css";
import { FC } from "react";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { getAuthError } from "../_auth.slice";
import { fetchAuth } from "../_authApi";
import { AdminLoginFormData } from "../types";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../_auth.slice";
import { useAppDispatch, useAppSelector } from "@store/store";

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector(getAuthError);
  const isLoggedIn = useAppSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>();

  const onSubmit = handleSubmit(async (params) => {
    await dispatch(fetchAuth(params));
  });
  
  if (isLoggedIn) {
    return <Navigate to="/panel" />;
  }

  return (
    <>
      <div className="container">
        <div className="login_container">
          <form method="POST" onSubmit={onSubmit}>
            <Stack direction="column" spacing={1.5} width={300}>
              <TextField
                fullWidth
                label="Логин"
                variant="outlined"
                defaultValue={"onlyblack"}
                error={Boolean(errors.login?.message)}
                helperText={errors.login?.message}
                {...register("login", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                defaultValue={"TF6dd7U8q8"}
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              <Button type="submit" variant="contained" size="large">
                Войти
              </Button>
              {errMsg && (
                <Snackbar open={!!errMsg} autoHideDuration={5000}>
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {errMsg}
                  </Alert>
                </Snackbar>
              )}
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
};
