import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import DutyDateRoute from "./DutyDateRoute";
import MainRoute from "./MainRoute";
import MilitiaRoute from "./MilitiaRoute";
import MissionRoute from "./MissionRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {MainRoute}
        {DutyDateRoute}
        {MilitiaRoute}
        {MissionRoute}
        <Route />
        <Route path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}
