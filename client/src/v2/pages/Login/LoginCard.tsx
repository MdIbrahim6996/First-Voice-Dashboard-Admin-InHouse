import { AxiosError } from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

interface UserInput {
    email: string;
    password: string;
}

const LoginCard: React.FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user && user.id) navigate("/");
    }, [user]);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserInput>();

    const onSubmit = async (userData: UserInput) => {
        try {
            const { data } = await axiosInstance.post(`/auth/login`, {
                ...userData,
            });
            if (data) {
                setUser(data);
                localStorage.setItem("authUser", JSON.stringify(data));
                // if (data?.user?.role === "superadmin") navigate("/superadmin");
                // if (data?.user?.role === "admin") navigate("/admin");
                // if (data?.user?.role === "accountant") navigate("/accountant");
                // if (data?.user?.role === "audit") navigate("/audit");
                navigate("/v2")
            }
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            }
        }
    };
    return (
        <div className="w-[450px]">
            <h2 className="text-xl font-semibold text-blue-800 mb-6">
                Welcome Back!
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-4">
                    <label className="text-sm text-slate-900">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Please provide an email.",
                        })}
                        className="outline-none w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    {errors?.email && (
                        <p className="text-red-500 my-1 ml-2">
                            {errors?.email?.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="text-sm text-gray-600">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Please provide an password.",
                            minLength: {
                                value: 6,
                                message:
                                    "Password should be atleast 6 characters",
                            },
                        })}
                        className="outline-none w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    {errors?.password && (
                        <p className="text-red-500 my-1 ml-2">
                            {errors?.password?.message}
                        </p>
                    )}
                </div>

                {/* Options */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                        <input type="checkbox" className="accent-black" />
                        Remember me
                    </label>

                    <button
                        type="button"
                        className="text-gray-500 hover:text-black"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition"
                >
                    Log in
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google */}
            <button
                disabled
                className=" cursor-not-allowed w-full border border-gray-300 py-2 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-4 h-4"
                />
                Continue with Google
            </button>

            {/* Signup */}
            <p className="text-xs text-center text-gray-500 mt-4">
                Don't have an account?{" "}
                <span className="text-black font-medium cursor-pointer">
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default LoginCard;
