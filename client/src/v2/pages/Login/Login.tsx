import React from "react";
import LoginCard from "./LoginCard";
import { FaArrowLeftLong } from "react-icons/fa6";

const Login: React.FC = () => {
    return (
        <div className="min-h-screen bg-blue-700/20 p-2 flex items-center">
            <div className="h-[96vh] w-full bord bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                {/* LEFT SIDE */}
                <div className="w-1/2 relative bg-blue-800">
                    <img
                        src="/sales.webp"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        alt="bg"
                        className="absolute inset-0 w-full h-full object-cover opacity-45"
                    />

                    <div className="relative  z-10 text-white flex flex-col justify-end h-full">
                        <div className="absolute top-0 w-full">
                            <div className="px-10 pt-10 flex items-center justify-between">
                                <img
                                    src="/fv-logo.png"
                                    alt=""
                                    className="w-60 object-cover"
                                />
                                <button className="font-medium cursor-pointer hover:underline flex items-center gap-1">
                                    <FaArrowLeftLong /> Back to Home
                                </button>
                            </div>
                        </div>
                        <div className="bg-blacackdrop-blur-sm p-10">
                            <h2 className="text-4xl font-semibold leading-tight">
                                First Voice Global Services
                                <br />
                            </h2>
                            <p className="w-md text-sm">
                                Driving Global Growth Through Smarter Sales
                                Solutions
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-1/2 flex items-center justify-center bg-gray-50">
                    <LoginCard />
                </div>
            </div>
        </div>
    );
};

export default Login;
