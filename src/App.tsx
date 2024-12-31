import { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "@store/store";
import { PrivateRoute } from "@Admin/auth/PrivateRoute/PrivateRoute";
import { fetchAuthMe, fetchRefreshToken } from "@Admin/auth/_authApi";
import { isTokenExpired } from "@Admin/auth/utils";
import { LoginForm } from "@Admin/auth/LoginForm/LoginForm";
import { Overview } from "@Admin/pages/Overview/Overview";
import { UsersList } from "@Admin/pages/UsersList/UsersList";
import { PackageDetails } from "@Admin/pages/PackageDetails/PackageDetails";
import { UserInfo } from "@Admin/pages/UserInfo/UserInfo";
import { LoginFormUser } from "@User/auth/LoginForm/LoginFormUser";
import { PrivateRouteUser } from "@User/auth/PrivateRoute/PrivateRouteUser";
import { Home } from "@User/pages/Home/Home";
import { Extra } from "@User/pages/Extra/Extra";
import { ServiceList } from "@Admin/pages/ServiceList/ServiceList";
import { Service } from "@Admin/pages/Service/Service";
import { CustomPackageCreate } from "@Admin/pages/CustomPackageCreate/CustomPackageCreate";
import { CustomPackageList } from "@Admin/pages/CustomPackageList/CustomPackageList";
import { CustomPackage } from "@Admin/pages/CustomPackage/CustomPackage";
import { TestService } from "@Admin/pages/TestService/TestService";
import { ExtraList } from "@Admin/pages/ExtraList/ExtraList";
import { Extra as ExtraAdmin } from "@Admin/pages/Extra/Extra";
import { TestServicesList } from "@Admin/pages/TestServicesList/TestServicesList";
import { ExtraDetails } from "@Admin/pages/ExtraDetails/ExtraDetails";

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
          path="/panel/package-details"
          element={
            <PrivateRoute>
              <PackageDetails />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/extra-details"
          element={
            <PrivateRoute>
              <ExtraDetails />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/services"
          element={
            <PrivateRoute>
              <ServiceList />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/services/:id"
          element={
            <PrivateRoute>
              <Service />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/extra"
          element={
            <PrivateRoute>
              <ExtraList />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/extra/:id"
          element={
            <PrivateRoute>
              <ExtraAdmin />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/custom-package/create"
          element={
            <PrivateRoute>
              <CustomPackageCreate />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/custom-package"
          element={
            <PrivateRoute>
              <CustomPackageList />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/custom-package/:id"
          element={
            <PrivateRoute>
              <CustomPackage />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/test-services"
          element={
            <PrivateRoute>
              <TestService />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/panel/test-services-list"
          element={
            <PrivateRoute>
              <TestServicesList />
            </PrivateRoute>
          }
        ></Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};
