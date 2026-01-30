import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import "chart.js/auto";
import { getSingleTeam } from "../../api/team";

const TeamInfo = ({
    handleClose,
    id,
}: {
    handleClose: () => void;
    id: number;
}) => {
    const { data: teamInfo } = useQuery({
        queryKey: [`team-info-${id}`],
        queryFn: () => getSingleTeam(id),
    });
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            onClick={handleClose}
        >
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-xl  overflow-hidden"
                onClick={(e) => e.stopPropagation()} // <-- STOP click from reaching overlay
            >
                <div>
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Team Information.
                    </p>
                </div>

                <div className="px-4 py-2">
                    <div className="py-3">
                        <p className="text-4xl mb-1 font-medium text-gray-800 capitalize">
                            {teamInfo?.name}
                        </p>
                        <p className="text-xl font-medium text-gray-800 capitalize">
                            Manager: {teamInfo?.manager?.alias}
                        </p>
                        <p className="text-xl font-medium text-gray-800 capitalize">
                            Members:{" "}
                            {teamInfo?.members
                                ?.map((member: any) => member.alias)
                                .join(", ")}
                        </p>
                    </div>
                    <div className="mt-4  text-center">
                        <button
                            onClick={handleClose}
                            className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TeamInfo;
