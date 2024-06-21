import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import RootLayout from "../components/Common/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="token-sales/dashboard" element={<DashboardPage />} />
      </Route>
    </Route>,
  ),
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
