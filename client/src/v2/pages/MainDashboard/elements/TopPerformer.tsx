import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getTopSellers } from "../../../api/mainDashboard";
import Loader from "../../../../components/Loader/Loader";

const TopPerformer = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["top-sellers"],
        queryFn: getTopSellers,
    });

    const topThree = data?.data?.slice(0, 3);
    return (
        <div className="p-5">
            <div className="mb-5  text-gray-900 bg-white ">
                <motion.p
                    initial={{
                        opacity: 0,
                        scale: 1.2,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-semibold uppercase origin-center text-center"
                >
                    Top Performers
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-1 text-sm font-normal text-center text-gray-700 w-[50%] mx-auto"
                >
                    Recognizing and celebrating the exceptional dedication,
                    skill, and consistent results of our top-performing team
                    members.
                </motion.p>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-3 gap-5 mt-10 w-[80%] mx-auto">
                    {topThree.length > 0 && (
                        <>
                            <motion.article
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="relative bg-blue-700 mt-20 p-5 h-fit rounded-md text-white text-center"
                            >
                                <span className="absolute top-2 left-4 text-2xl font-medium">
                                    2 <sup className="text-x">nd</sup>
                                </span>
                                <img
                                    src="/trophy-1.svg"
                                    alt="trophy"
                                    className="mx-auto mb-5"
                                />

                                <p className="text-3xl font-bold uppercase">
                                    {topThree[1]?.agent || "—"}
                                </p>
                                <p className="text-5xl font-bold uppercase mt-5">
                                    {topThree[1]?.count || "—"} sales
                                </p>
                            </motion.article>
                            <motion.article
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="relative bg-blue-700 p-5 h-fit rounded-md text-white text-center"
                            >
                                <span className="absolute top-2 left-4 text-2xl font-medium">
                                    1 <sup className="text-x">st</sup>
                                </span>
                                <img
                                    src="/trophy-1.svg"
                                    alt="trophy"
                                    className="mx-auto mb-5"
                                />

                                <p className="text-3xl font-bold uppercase">
                                    {topThree[0]?.agent || "—"}
                                </p>
                                <p className="text-5xl font-bold uppercase mt-5">
                                    {topThree[0]?.count || "—"} sales
                                </p>
                            </motion.article>
                            <motion.article
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                className="relative bg-blue-700 mt-20 p-5 h-fit rounded-md text-white text-center"
                            >
                                <span className="absolute top-2 left-4 text-2xl font-medium">
                                    3 <sup className="text-x">rd</sup>
                                </span>
                                <img
                                    src="/trophy-1.svg"
                                    alt="trophy"
                                    className="mx-auto mb-5"
                                />

                                <p className="text-3xl font-bold uppercase">
                                    {topThree[2]?.agent || "—"}
                                </p>
                                <p className="text-5xl font-bold uppercase mt-5">
                                    {topThree[2]?.count || "—"} sales
                                </p>
                            </motion.article>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TopPerformer;
