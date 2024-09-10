import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "../scss/App.scss";
import {IRoute, routes_url} from "./routes";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AppNotification from "../components/shared/AppNotification";
import AppLoading from "../components/shared/AppLoading";
import {RootState} from "../stores";
import ForgotPassword from "../layouts/ForgotPassword";
import DanhMucMauCongViecCon from "../modules/QuanLyDanhMuc/pages/DanhMucMauCongViecCon";

const AppRoutes = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const notificationProps = useSelector((state: RootState) => state.notification);
  const isAuthenticatedStr = localStorage.getItem("isLogin");
  const isAuthenticated: boolean = isAuthenticatedStr
    ? JSON.parse(isAuthenticatedStr)
    : null;

  const renderRoute = (route: IRoute) => {
    if (route.isPrivate && isAuthenticated) {
      return route.element;
    }
    if (!route.isPrivate) {
      return route.element;
    }
    return <Navigate to="/dang-nhap" />;
  };

  const renderRoutes = (routes: IRoute[]) => {
    return routes.map((route: IRoute, key: number) => {
      if (route.children) {
        return route.children.map((child: IRoute, childKey: number) => {
          return (
            (
              <Route
                key={`${key}-${childKey}`}
                path={child.path}
                element={
                  <MainLayout>
                    <Suspense fallback={<h1>Loading...</h1>}>
                      {renderRoute(child)}
                    </Suspense>
                  </MainLayout>
                }
              />
            )
          )
        });
      } else {
        return (
          <Route
            key={key}
            path={route.path}
            element={
              <MainLayout>
                <Suspense fallback={<h1>Loading...</h1>}>
                  {renderRoute(route)}
                </Suspense>
              </MainLayout>

            }
          />
        );
      }
    });
  };

  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      {notificationProps && <AppNotification {...notificationProps} />}
      {loading && <AppLoading />}

      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        ) : (
          <Route path="/" element={<Navigate to="/dang-nhap" replace />} />
        )}
        {renderRoutes(routes_url)}
        <Route path="/dang-nhap" element={<AuthLayout />} />
        <Route path="/khoi-phuc-tai-khoan" element={<ForgotPassword />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
