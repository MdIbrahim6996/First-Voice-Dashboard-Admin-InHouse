// hooks/usePermission.ts

import { useContext } from "react";
import type { Permission } from "../types/auth.types";
import { hasPermission } from "../utils/permissions";
import { AuthContext } from "../../context/authContext";

export const usePermission = () => {
    const { user } = useContext(AuthContext);

    const can = (permission: Permission) => {
        if (!user?.role) return false;
        return hasPermission(user.role, permission);
    };

    return { can };
};
