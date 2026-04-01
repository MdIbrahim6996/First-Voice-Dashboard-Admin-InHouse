// types/auth.ts
export type Role = "admin" | "superadmin" | "accountant" | "audit";

type Action = "create" | "view" | "edit" | "delete";
type Resource =
    | "main_dashboard"
    | "leads"
    | "old_leads"
    | "old_leadforms"
    | "users"
    | "closers"
    | "all_attendance"
    | "monthly_attendance"
    | "old_users"
    | "process"
    | "plan"
    | "status"
    | "teams";

export type Permission = `${Action}:${Resource}`;
