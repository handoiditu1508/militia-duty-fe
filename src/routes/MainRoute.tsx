import React from "react";
import { Navigate, Route } from "react-router-dom";
const MainModule = React.lazy(() => import("@/modules/Main"));

const MainRoute = (
  <Route element={<MainModule />}>
    <Route index element={<Navigate to="/duty-dates" replace />} />
  </Route>
);

export default MainRoute;
