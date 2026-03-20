import { Navigate, type RouteObject } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import AuditLayout from "../components/Shared/Layout/AuditLayout";

export const auditRoutes: RouteObject = {
    path: "audit",
    element: <AuditLayout />,
    children: [
        {
            path: "",
            element: <Navigate to={"leads"} />,
        },
        {
            path: "leads",
            async lazy() {
                let UserLeads = await import("../pages/Admin/Leads/Leads");
                return { Component: UserLeads.default };
            },
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ],
};
