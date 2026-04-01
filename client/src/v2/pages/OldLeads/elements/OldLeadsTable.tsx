// components/LeadsTable.tsx
import { FaEye } from "react-icons/fa";
import EmptyState from "../../../components/EmptyState/EmptyState";
import type { OldLead } from "../../../types/app.types";
import { motion } from "motion/react";
import type { Ref } from "react";
import Loader from "../../../components/Loader/Loader";

interface Props {
    leads: OldLead[];
    page: number;
    limit: number;
    topScrollRef: Ref<HTMLDivElement | null>;
    bottomScrollRef: Ref<HTMLDivElement | null>;
    tableRef: Ref<HTMLTableElement> | undefined;
    isLoading: boolean;
    isFetching: boolean;
    setInfo: React.Dispatch<React.SetStateAction<any>>;
}

const tableHeader = [
    "Sr. No.",
    "actions",
    "date",
    "salutation",
    "first name",
    "last name",
    "post code",
    "phone",
    "process",
];
const OldLeadsTable = ({
    leads,
    page,
    limit,
    topScrollRef,
    bottomScrollRef,
    tableRef,
    isLoading,
    isFetching,
    setInfo,
}: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-x-auto shadow-md sm:rounded-lg w-full"
        >
            <div
                ref={topScrollRef}
                style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    height: "20px",
                }}
            >
                {/* Fake wide element to create scrollbar */}
                <div
                    style={{
                        width: "2000px",
                        height: "1px",
                    }}
                />
            </div>
            <div
                ref={bottomScrollRef}
                style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    width: "100%",
                }}
            >
                {(isLoading || isFetching) && <Loader />}

                {leads?.length > 0 && !isFetching && (
                    <table
                        ref={tableRef}
                    >
                        <thead className="text-gray-700 text-left uppercase bg-gray-200">
                            <tr>
                                {tableHeader.map((item) => (
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-4 py-3 text-sm"
                                    >
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {leads?.map((item: any, i: number) => (
                                <tr
                                    key={item?.id}
                                    className={`text-slate-800 font-semibold uppercase text-sm border-b :border-gray-700 border-gray-200`}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                    >
                                        {(page - 1) * limit + i + 1}
                                    </th>

                                    <td className="flex justify-center py-4">
                                        <button
                                            onClick={() => {
                                                setInfo({
                                                    detail: item,
                                                    show: true,
                                                });
                                            }}
                                            className="font-medium text-white bg-blue-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(item?.sale_at).toDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.salutation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.fname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.lname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.pin}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.process}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {(!leads || leads.length === 0) && <EmptyState />}
            </div>
        </motion.div>
    );
};

export default OldLeadsTable;
