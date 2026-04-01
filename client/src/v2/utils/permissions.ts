// utils/permissions.ts
import { rolePermissions } from "../constants/appConstant";
import type { Role, Permission } from "../types/auth.types";

export const hasPermission = (role: Role, permission: Permission) => {
    return rolePermissions[role]?.includes(permission);
};
