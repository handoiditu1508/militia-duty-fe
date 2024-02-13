import React from "react";
import { Route } from "react-router-dom";
const DutyDateModule = React.lazy(() => import("@/modules/DutyDate"));
const DutyDatesPage = React.lazy(() => import("@/modules/DutyDate/pages/DutyDatesPage"));
const ShiftsPage = React.lazy(() => import("@/modules/DutyDate/pages/ShiftsPage"));

const DutyDateRoute = (
  <Route path="duty-dates" element={<DutyDateModule />}>
    <Route index element={<DutyDatesPage />} />
    <Route path="shifts" element={<ShiftsPage />} />
  </Route>
);

export default DutyDateRoute;
