import "./LoginFormUser.css";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import { authUser } from "../_authApi";

export const LoginFormUser: FC = () => {
  const navigate = useNavigate();

  const [fetchLoginUser, { error, isError }] = authUser.useLazyLoginUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (params) => {
    await fetchLoginUser(params.token).then(
      (res) => res.isSuccess && navigate("/", { replace: true }),
    );
  });

  // if (isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <div className="container">
        <div className="login_container">
          <form method="POST" onSubmit={onSubmit}>
            <Stack direction="column" spacing={1.5} width={300}>
              <TextField
                fullWidth
                label="Token"
                variant="outlined"
                defaultValue={"4zpme35asi6h6735"}
                error={Boolean(errors.token?.message)}
                helperText={errors.token?.message as ReactNode}
                {...register("token", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              <Button type="submit" variant="contained" size="large">
                Войти
              </Button>
              {isError && (
                <Snackbar open={isError} autoHideDuration={5000}>
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {"status" in error ? (error.data as string) : ""}
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
