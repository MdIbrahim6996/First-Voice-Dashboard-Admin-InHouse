import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { useContext, useState } from "react";

import { axiosInstance } from "../../../lib/axiosInstance";
import { sidebarItems } from "../../constants/appConstant";
import { hasPermission } from "../../utils/permissions";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

const Sidebar = () => {
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

    const [show, setshow] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setTimeout(() => {
                    setshow(true);
                }, 200);
            }}
            onMouseLeave={() => setshow(false)}
            className="w-full py-4 ps-8 text-white h-full"
        >
            <div className="flex flex-col justify-between h-full relative">
                <div>
                    <div>
                        <Link to={"/"} className="h-20">
                            <img
                                src="/fv-logo.png"
                                alt=""
                                className={` ${
                                    show ? "opacity-100" : "opacity-0"
                                } cursor-pointer hover:scale-105  transition duration-500`}
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
                                        ? `cursor-pointer flex gap-2 items-center bg-white text-blue-700 font-semibold px-2 pl-3.5 ${
                                              show
                                                  ? "rounded-md"
                                                  : "rounded-full"
                                          } py-2`
                                        : "cursor-pointer flex gap-2 items-center hover:bg-white/80 hover:text-blue-800 hover:font-semibold transition-all duration-300 rounded-md py-1.5 px-2"
                                }
                            >
                                <span className="text-[#f0ce85">
                                    {" "}
                                    {item.icon}
                                </span>
                                <span
                                    className={`whitespace-nowrap transition-all duration-500 ${
                                        show ? "opacity-100" : "opacity-0"
                                    }`}
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
                        <div
                            className={`transition-all duration-500 ${
                                show ? "opacity-100" : "opacity-0"
                            }`}
                        >
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
                        className={`bg-blue-700 cursor-pointer rounded-md h-8 mt-2 text-white relative overflow-hidden transition-all duration-500 ${
                            show ? " w-full" : "w-8"
                        }`}
                    >
                        <MdOutlinePowerSettingsNew className="absolute top-2 left-2" />{" "}
                        <span
                            className={`text-sm block font-semibold transition-all duration-500 ${
                                show
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-[125%] opacity-0"
                            }`}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
