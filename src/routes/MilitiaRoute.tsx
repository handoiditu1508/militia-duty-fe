import React from "react";
import { Route } from "react-router-dom";
const MilitiaModule = React.lazy(() => import("@/modules/Militia"));
const MilitiasPage = React.lazy(() => import("@/modules/Militia/pages/MilitiasPage"));

const MilitiaRoute = (
  <Route path="militias" element={<MilitiaModule />}>
    <Route index element={<MilitiasPage />} />
  </Route>
);

export default MilitiaRoute;
