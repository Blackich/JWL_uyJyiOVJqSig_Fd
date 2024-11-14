import { Navigate, RouteProps } from "react-router-dom";
import React, { FC } from "react";

type TProps = {
  children: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<TProps> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token"); ;

  if (!isLoggedIn) {
    return (
      <>
        <Navigate to="/auth/login" replace />
      </>
    );
  }
  return <>{children}</>;
};
