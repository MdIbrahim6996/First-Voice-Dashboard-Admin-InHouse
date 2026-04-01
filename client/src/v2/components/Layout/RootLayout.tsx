import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { ErrorBoundary } from "react-error-boundary";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import FallbackRenderer from "../../../components/Shared/FallbackRenderer/FallbackRenderer";
import Sidebar from "../Sidebar/Sidebar";

const RootLayout = () => {
    const { user, setUser } = useContext(AuthContext);
    // const { data, isLoading, isError } = useUserDetails();

    // const handleLogout = () => {
    //     localStorage.removeItem("authUser");
    //     setUser(null);
    // };

    const getUserDetail = async () => {
        try {
            const { data } = await axiosInstance.get(`/common/user-detail`);
            return data;
        } catch (error) {
            console.log(error);
            // if (axios.isAxiosError(error)) {
            //     toast.error(error?.response?.data?.message);
            //     if (error?.response?.status === 401) {
            //         handleLogout();
            //         window.location.href = "http://localhost:4000/login";
            //     }
            // }
            return error;
        }
    };

    //@ts-ignore
    const {
        data: userDetail = [],
        refetch,
        isSuccess,
    } = useQuery({
        queryKey: ["user-detail"],
        queryFn: getUserDetail,
        refetchInterval: 10 * 1000, // 10s in
    });

    if (isSuccess) {
        if (userDetail?.id) {
            setUser(userDetail);
            localStorage.setItem("authUser", JSON.stringify(userDetail));
        }
    }

    useEffect(() => {
        refetch();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user]);

    if (isSuccess) {
        if (userDetail?.status === 401) {
            setUser(null);
            localStorage.removeItem("authUser");
        }
    }
    return (
        <>
            <ErrorBoundary FallbackComponent={() => <FallbackRenderer />}>
                {user && (
                    <div className="bg-blue-700 h-screen max-w-screen flex gap-3">
                        <div className="w-[5rem] hover:w-[20rem] transition-all duration-500 sidebar">
                        {/* <div className="max-w-[17rem] sidebar"> */}
                            <Sidebar />
                        </div>
                        <div className="w-full m-2 rounded-xl bg-white overflow-scroll sidebar">
                            <Outlet />
                        </div>
                    </div>
                )}
            </ErrorBoundary>
        </>
    );
};

export default RootLayout;
