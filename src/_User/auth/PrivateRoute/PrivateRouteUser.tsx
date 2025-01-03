import React, { FC, useLayoutEffect } from "react";
import { RouteProps, useNavigate } from "react-router-dom";
import { authUser } from "../_authApi";

type TProps = {
  children: React.ReactNode;
} & RouteProps;

export const PrivateRouteUser: FC<TProps> = ({ children }) => {
  const navigate = useNavigate();

  const [checkAuthUser, { data: userId }] =
    authUser.useLazyCheckAuthUserQuery();

  useLayoutEffect(() => {
    if (!userId) {
      checkAuthUser().then(
        (res) => !res.isSuccess && navigate("/login", { replace: true }),
      );
    }
  }, [checkAuthUser, navigate, userId]);

  return <>{children}</>;
};
