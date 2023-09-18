import { lazy } from "react";

// project imports

import MainLayout from "../pages/MainLayout";
import Loadable from "../components/Loader/Loadable";

// page routing
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const PageNotFound = Loadable(lazy(() => import("../pages/PageNotFound")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const Register = Loadable(
  lazy(() => import("../components/User/AuthRegister"))
);

// rou
// routes
const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default MainRoutes;
