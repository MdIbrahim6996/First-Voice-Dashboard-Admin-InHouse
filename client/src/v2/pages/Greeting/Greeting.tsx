import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

export default function Greeting() {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg text-center p-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 shadow-xl backdrop-blur-md"
            >
                <h1 className="text-3xl font-bold text-white">
                    Hello{" "}
                    <span className="text-white">
                        {user?.role?.toUpperCase()}!
                    </span>
                    <span className="inline-block ml-2 animate-wave">👋</span>
                </h1>

                <Link to={"main-dashboard"}>
                    <p className="text-white text-left">
                        Go to Main Dashboard &rarr;
                    </p>
                </Link>
            </motion.div>

            {/* 👋 waving hand animation */}
            <style>{`
        .animate-wave {
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
        </div>
    );
}
