import { Navigate, type RouteObject } from "react-router-dom";
import AdminLayout from "../components/Shared/Layout/AdminLayout";
import NotFoundPage from "../pages/NotFound";
import Greeting from "../pages/Admin/Greeting/Greeting";

export const adminRoutes: RouteObject = {
    path: "admin",
    element: <AdminLayout />,
    children: [
        {
            path: "",
            element: <Greeting />,
        },
        {
            path: "admin",
            element: <Navigate to={"/admin/main-dashboard"} />,
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
                let AddLeads = await import("../pages/Admin/AddLeads/AddLeads");
                return { Component: AddLeads.default };
            },
        },
        {
            path: "leads",
            async lazy() {
                let UserLeads = await import("../pages/Admin/Leads/Leads");
                return { Component: UserLeads.default };
            },
        },
        {
            path: "old-leads",
            async lazy() {
                let OldLeads = await import("../pages/Admin/OldLeads/OldLeads");
                return { Component: OldLeads.default };
            },
        },
        {
            path: "old-leadforms",
            async lazy() {
                let OldLeadForms = await import(
                    "../pages/Admin/OldLeadForms/OldLeadForms"
                );
                return { Component: OldLeadForms.default };
            },
        },
        {
            path: "users",
            async lazy() {
                let Users = await import("../pages/Admin/Users/Users");
                return { Component: Users.default };
            },
        },
        {
            path: "closers",
            async lazy() {
                let Closer = await import("../pages/Admin/Closer/Closer");
                return { Component: Closer.default };
            },
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ],
};
