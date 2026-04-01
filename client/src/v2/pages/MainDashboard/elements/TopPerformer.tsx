import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getTopSellers } from "../../../../api/mainDashboard";
import Loader from "../../../../components/Loader/Loader";

const TopPerformer = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["top-sellers"],
        queryFn: getTopSellers,
    });

    const topThree = data?.slice(0, 3);

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
                    {topThree.map((item: any, index: number) => {
                        const isFirst = index === 1;
                        const delay = 0.25 + index * 0.25;

                        return (
                            <motion.article
                                key={item?.user?.id || index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay }}
                                className={`bg-blue-700 p-5 h-fit rounded-md text-white text-center ${
                                    !isFirst ? "mt-20" : ""
                                }`}
                            >
                                <img
                                    src="/trophy-1.svg"
                                    alt="trophy"
                                    className="mx-auto mb-5"
                                />

                                <p className="text-3xl font-bold uppercase">
                                    {item?.user?.alias || "—"}
                                </p>
                                <p className="text-5xl font-bold uppercase mt-5">
                                    {item?.count ?? 0} sales
                                </p>
                            </motion.article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TopPerformer;
