import React from "react";
import { Route } from "react-router-dom";
const MilitiaModule = React.lazy(() => import("@/modules/Militia"));
const MilitiasPage = React.lazy(() => import("@/modules/Militia/pages/MilitiasPage"));

const MilitiaRoute = (
  <Route element={<MilitiaModule />}>
    <Route path="militias" element={<MilitiasPage />} />
  </Route>
);

export default MilitiaRoute;
