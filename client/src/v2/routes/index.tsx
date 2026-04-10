import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../components/Layout/RootLayout";
import NotFoundPage from "../../pages/NotFound";
import TokenExpired from "../../pages/TokenExpired/TokenExpired";
import Login from "../pages/Login/Login";
import Greeting from "../pages/Greeting/Greeting";

export const router = createBrowserRouter([
    {
        path: "/v2",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <Greeting />,
            },
            {
                path: "admin",
                element: <Navigate to={"/v2/main-dashboard"} />,
            },
            {
                path: "dashboard",
                element: <Navigate to={"main-dashboard"} />,
            },
            {
                path: "main-dashboard",
                async lazy() {
                    let MainDashboard = await import(
                        "../pages/MainDashboard/MainDashboard"
                    );
                    return { Component: MainDashboard.default };
                },
            },
            {
                path: "add-lead",
                async lazy() {
                    let AddLeads = await import(
                        "../../pages/Admin/AddLeads/AddLeads"
                    );
                    return { Component: AddLeads.default };
                },
            },
            {
                path: "add-b2b-lead",
                async lazy() {
                    let AddB2BLeads = await import(
                        "../pages/AddB2BLeads/AddB2BLeads"
                    );
                    return { Component: AddB2BLeads.default };
                },
            },
            {
                path: "leads",
                async lazy() {
                    let UserLeads = await import("../pages/Leads/Leads");
                    return { Component: UserLeads.default };
                },
            },
            {
                path: "old-leads",
                async lazy() {
                    let OldLeads = await import("../pages/OldLeads/OldLeads");
                    return { Component: OldLeads.default };
                },
            },
            {
                path: "old-leadforms",
                async lazy() {
                    let OldLeadForms = await import(
                        "../pages/OldLeadForms/OldLeadForms"
                    );
                    return { Component: OldLeadForms.default };
                },
            },
            {
                path: "users",
                async lazy() {
                    let Users = await import("../pages/Users/Users");
                    return { Component: Users.default };
                },
            },
            {
                path: "closers",
                async lazy() {
                    let Closer = await import("../pages/Closer/Closer");
                    return { Component: Closer.default };
                },
            },
            {
                path: "old-users",
                async lazy() {
                    let OldUser = await import("../pages/OldUsers/OldUsers");
                    return { Component: OldUser.default };
                },
            },
            {
                path: "process",
                async lazy() {
                    let Process = await import("../pages/Process/Process");
                    return { Component: Process.default };
                },
            },
            {
                path: "plan",
                async lazy() {
                    let Plan = await import("../pages/Plan/Plan");
                    return { Component: Plan.default };
                },
            },
            {
                path: "status",
                async lazy() {
                    let Status = await import("../pages/Status/Status");
                    return { Component: Status.default };
                },
            },
            {
                path: "all-attendance",
                async lazy() {
                    let AllAttendance = await import(
                        "../pages/AllAttendance/AllAttendance"
                    );
                    return { Component: AllAttendance.default };
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
                path: "teams",
                async lazy() {
                    let Teams = await import("../pages/Teams/Teams");
                    return { Component: Teams.default };
                },
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
    {
        path: "/",
        element: <Navigate to={"/v2"} />,
    },
    {
        path: "/token-expired",
        element: <TokenExpired />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
