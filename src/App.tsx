import { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "@store/store";
import { PrivateRoute } from "@Admin/auth/PrivateRoute/PrivateRoute";
import { fetchAuthMe, fetchRefreshToken } from "@Admin/auth/_authApi";
import { isTokenExpired } from "@Admin/auth/utils";
import { LoginForm } from "@Admin/auth/LoginForm/LoginForm";
import { Overview } from "@Admin/pages/Overview/Overview";
import { UsersList } from "@Admin/pages/UsersList/UsersList";
import { Packages } from "@Admin/pages/Packages/Packages";
import { UserInfo } from "@Admin/pages/UserInfo/UserInfo";
import { LoginFormUser } from "@User/auth/LoginForm/LoginFormUser";
import { PrivateRouteUser } from "@User/auth/PrivateRoute/PrivateRouteUser";
import { Home } from "@User/pages/Home/Home";
import { Extra } from "@User/pages/Extra/Extra";
import { Services } from "@Admin/pages/Services/Services";
import { CustomPackage } from "@Admin/pages/CustomPackage/CustomPackage";

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    if (isTokenExpired(localStorage.getItem("token"))) {
      dispatch(fetchRefreshToken());
    } else {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginFormUser />} />
        <Route
          path="/"
          element={
            <PrivateRouteUser>
              <Home />
            </PrivateRouteUser>
          }
        ></Route>

        <Route
          path="/extra"
          element={
            <PrivateRouteUser>
              <Extra />
            </PrivateRouteUser>
          }
        ></Route>

        {/* adminRoutes */}
        <Route path="/auth/login" element={<LoginForm />} />
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/users"
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/users/:id"
          element={
            <PrivateRoute>
              <UserInfo />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/package"
          element={
            <PrivateRoute>
              <Packages />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/custom-package/create"
          element={
            <PrivateRoute>
              <CustomPackage />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/custom-package"
          element={
            <PrivateRoute>
              <CustomPackage />
            </PrivateRoute>
          }
        ></Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};
