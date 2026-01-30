import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Greeting() {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md text-center p-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 shadow-xl backdrop-blur-md"
            >
                <h1 className="text-3xl font-bold text-white">
                    Hello, <span className="text-white">AHMED SIR!</span>
                    <span className="inline-block ml-2 animate-wave">👋</span>
                </h1>

                <Link to={"users"}>
                    <p className="text-white text-center">Go to Users &rarr;</p>
                </Link>
            </motion.div>
        </div>
    );
}
