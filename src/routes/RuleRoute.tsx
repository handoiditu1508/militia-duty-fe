import React from "react";
import { Route } from "react-router-dom";
const RuleModule = React.lazy(() => import("@/modules/Rule"));
const RulesPage = React.lazy(() => import("@/modules/Rule/pages/RulesPage"));

const RuleRoute = (
  <Route path="rules" element={<RuleModule />}>
    <Route index element={<RulesPage />} />
  </Route>
);

export default RuleRoute;
