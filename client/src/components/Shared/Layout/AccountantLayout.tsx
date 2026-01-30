import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../../pages/AccessDenied/AccessDenied";

const AccountantLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user?.role === "accountant" ? (
                <Outlet />
            ) : (
                <div className="absolute top-0 left-0 w-full h-screen">
                    <AccessDenied />
                </div>
            )}
        </>
    );
};

export default AccountantLayout;
