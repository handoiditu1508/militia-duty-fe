import React from "react";
import { Route } from "react-router-dom";
const MissionModule = React.lazy(() => import("@/modules/Mission"));
const MissionsPage = React.lazy(() => import("@/modules/Mission/pages/MissionsPage"));

const MissionRoute = (
  <Route path="missions" element={<MissionModule />}>
    <Route index element={<MissionsPage />} />
  </Route>
);

export default MissionRoute;
