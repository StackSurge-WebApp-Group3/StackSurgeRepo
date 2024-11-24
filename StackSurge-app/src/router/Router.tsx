import { Route, Routes } from "react-router-dom";

import { AUTH_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  return (
    <Routes>
      {[...PUBLIC_ROUTES, ...AUTH_ROUTES].map(({ Component, path }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {PRIVATE_ROUTES.map(({ Component, path }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute>
              <Component />
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
}
