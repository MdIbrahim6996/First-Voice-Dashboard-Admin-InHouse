import { type RouteObject } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import AccountantLayout from "../components/Shared/Layout/AccountantLayout";
import Greeting from "../pages/Accountant/Greeting/Greeting";

export const accountantRoutes: RouteObject = {
    path: "accountant",
    element: <AccountantLayout />,
    children: [
        {
            path: "",
            element: <Greeting />,
        },
        {
            path: "users",
            async lazy() {
                let Users = await import("../pages/Accountant/Users/Users");
                return { Component: Users.default };
            },
        },
        {
            path: "closers",
            async lazy() {
                let Closer = await import("../pages/Accountant/Closer/Closer");
                return { Component: Closer.default };
            },
        },
        {
            path: "monthly-attendance",
            async lazy() {
                let MonthlyAttendance = await import(
                    "../pages/MonthlyAttendance/MonthlyAttendance"
                );
                return { Component: MonthlyAttendance.default };
            },
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ],
};
