import { motion } from "motion/react";
import type { FiltersType } from "../../../types/app.types";
import { limitArray, oldLeadsProcess } from "../../../constants/appConstant";

interface Props {
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

const Filters = ({ filters, setFilters }: Props) => {
    const initialFilters: FiltersType = {
        phone: "",
        post: "",
        fromDate: "",
        toDate: "",
        process: "",
        page: 1,
        limit: 30,
    };
    const resetFilters = () => {
        setFilters(initialFilters);
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
        >
            <div className="grid grid-cols-3 gap-x-3 gap-y-3">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="phone">Phone</label>
                    <input
                        autoComplete="off"
                        type="text"
                        name="phone"
                        placeholder="PHONE"
                        value={filters.phone}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                phone: e.target.value,
                                page: 1,
                            }))
                        }
                        id="phone"
                        className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="fromDate">From Date</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={filters.fromDate}
                        id="fromDate"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                fromDate: e.target.value,
                                page: 1,
                            }))
                        }
                        className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="toDate">To Date</label>
                    <input
                        type="date"
                        name="toDate"
                        value={filters.toDate}
                        id="toDate"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                toDate: e.target.value,
                                page: 1,
                            }))
                        }
                        className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="post">Post Code</label>
                    <input
                        autoComplete="off"
                        type="text"
                        name="post"
                        placeholder="POST CODE"
                        value={filters.post}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                post: e.target.value,
                                page: 1,
                            }))
                        }
                        id="post"
                        className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="limit">Limit Per Page</label>
                    <select
                        name="limit"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                limit: +e.target.value,
                                page: 1,
                            }))
                        }
                        id="limit"
                        className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                    >
                        {limitArray?.map((item: any) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="process">Process</label>
                    <select
                        name="process"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                process: e.target.value,
                                page: 1,
                            }))
                        }
                        value={filters.process}
                        id="process"
                        className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                    >
                        <option value="" selected disabled>
                            Select A Process
                        </option>
                        {oldLeadsProcess?.map((item: any) => (
                            <option key={item?.name} value={item?.name}>
                                {item?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-10 mt-3 flex items-center gap-2 text-sm">
                <button
                    onClick={resetFilters}
                    className="bg-sky-500 text-white px-10 py-1 rounded-md cursor-pointer"
                >
                    Reset Filters
                </button>
            </div>
        </motion.div>
    );
};

export default Filters;
