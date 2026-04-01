import { motion } from "motion/react";
import { monthNames } from "../../../constants/appConstant";
import type { MonthlyAttendanceFiltersType } from "../MonthlyAttendance";

interface Props {
    filters: MonthlyAttendanceFiltersType;
    setFilters: React.Dispatch<
        React.SetStateAction<MonthlyAttendanceFiltersType>
    >;
}

const Filters = ({ filters, setFilters }: Props) => {
    const date = new Date();
    const initialFilters: MonthlyAttendanceFiltersType = {
        year: date.getFullYear(),
        month: date.getMonth(),
        alias: "",
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
            <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="year">Year</label>
                    <select
                        name="year"
                        id="year"
                        defaultValue={filters.year}
                        onChange={(e: any) =>
                            setFilters((prev) => ({
                                ...prev,
                                year: e.target.value,
                            }))
                        }
                        className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                    >
                        <option value={2022}>2022</option>
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="month">Month</label>
                    <select
                        name="month"
                        id="month"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                month: +e.target.value,
                            }))
                        }
                        className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                    >
                        <option value="" disabled>
                            Select a Month
                        </option>
                        {monthNames?.map((item, i) => (
                            <option key={i} value={i}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="alias">Alias</label>
                    <input
                        type="text"
                        name="alias"
                        id="alias"
                        placeholder="alias"
                        value={filters.alias}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                alias: e.target.value,
                            }))
                        }
                        className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                    />
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
