import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";

import { axiosInstance } from "../../../lib/axiosInstance";
import { sidebarItems } from "../../constants/appConstant";
import { hasPermission } from "../../utils/permissions";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

const SidebarNoSlide = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const links = user?.role
        ? sidebarItems.filter((item) =>
              hasPermission(user.role, item.permission)
          )
        : [];

    const handleLogout = async () => {
        await axiosInstance.post(`/auth/logout`);
        localStorage.removeItem("authUser");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="w-full py-4 ps-8 text-white h-full">
            <div className="flex flex-col justify-between h-full relative">
                <div>
                    <div>
                        <Link to={"/"} className="h-20">
                            <img
                                src="/fv-logo.png"
                                alt=""
                                className={`cursor-pointer hover:scale-105  transition duration-500`}
                            />
                        </Link>
                    </div>

                    <div className="sidebar my-10  space-y-1 h-[22rem] overflow-y-scroll">
                        {links?.map((item) => (
                            <NavLink
                                to={item.link}
                                key={item.id}
                                className={({ isActive }) =>
                                    isActive
                                        ? `cursor-pointer flex gap-2 items-center bg-white text-blue-700 font-semibold px-2 pl-3.5 py-2 rounded-md`
                                        : "cursor-pointer flex gap-2 items-center hover:bg-white/80 hover:text-blue-800 hover:font-semibold transition-all duration-300 rounded-md py-1.5 px-2"
                                }
                            >
                                <span className="text-[#f0ce85">
                                    {" "}
                                    {item.icon}
                                </span>
                                <span
                                    className={`whitespace-nowrap transition-all duration-500`}
                                >
                                    {item.title}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 bg-white rounded-md w-full text-blue-700 p-2 hover:-translate-y-1 transition duration-300">
                    <div className="flex gap-1.5 items-center">
                        <img
                            src="/profile.png"
                            alt=""
                            className="w-8 h-8 rounded-full border border-slate-300"
                        />
                        <div className={`transition-all duration-500`}>
                            <p className="text-xs font-semibold">
                                {user?.email}
                            </p>
                            <p className="capitalize font-semibold text-sm">
                                || {user?.role} ||
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className={`bg-blue-700 cursor-pointer rounded-md py-1 mt-2 text-white flex items-center justify-center gap-1 w-full`}
                    >
                        <MdOutlinePowerSettingsNew className=" top-2 left-2" />{" "}
                        <span
                            className={`text-sm block font-semibold transition-all duration-500`}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarNoSlide;
