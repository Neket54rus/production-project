import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoutesProps } from "@/shared/types/router";
import { PageLoader } from "@/widgets/PageLoader";

import { routeConfig } from "../config/routeConfig";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const { path, authOnly, element } = route;

    return (
      <Route
        key={path}
        path={path}
        element={
          authOnly ? (
            <RequireAuth>{element as JSX.Element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
