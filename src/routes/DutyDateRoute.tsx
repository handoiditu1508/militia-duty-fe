import React from "react";
import { Route } from "react-router-dom";
const DutyDateModule = React.lazy(() => import("@/modules/DutyDate"));
const DutyDatesPage = React.lazy(() => import("@/modules/DutyDate/pages/DutyDatesPage"));

const DutyDateRoute = (
  <Route element={<DutyDateModule />}>
    <Route path="duty-dates" element={<DutyDatesPage />} />
  </Route>
);

export default DutyDateRoute;
