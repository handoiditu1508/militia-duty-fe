import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import MainRoute from "./MainRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {MainRoute}
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
