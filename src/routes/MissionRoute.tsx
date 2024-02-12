import React from "react";
import { Route } from "react-router-dom";
const MissionModule = React.lazy(() => import("@/modules/Mission"));
const MissionsPage = React.lazy(() => import("@/modules/Mission/pages/MissionsPage"));

const MissionRoute = (
  <Route element={<MissionModule />}>
    <Route path="missions" element={<MissionsPage />} />
  </Route>
);

export default MissionRoute;
