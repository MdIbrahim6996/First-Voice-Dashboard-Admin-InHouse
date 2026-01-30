import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/Shared/Layout/RootLayout";
import NotFoundPage from "../pages/NotFound";
import TokenExpired from "../pages/TokenExpired/TokenExpired";
import { adminRoutes } from "./adminRoutes";
import { superadminRoutes } from "./superadminRoutes";
import Login from "../pages/Auth/Login/Login";
import { accountantRoutes } from "./accountantRoutes";

export const router = createBrowserRouter([
    {
        path: "",
        element: <RootLayout />,
        children: [
            { ...adminRoutes },
            { ...superadminRoutes },
            { ...accountantRoutes },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/token-expired",
        element: <TokenExpired />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
