import { motion } from "motion/react";
import { FaEye, FaFileCsv } from "react-icons/fa";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllCloser } from "../../../api/user";
import { CSVLink } from "react-csv";
import CloserInfoModal from "../../../components/Modal/CloserInfoModal/CloserInfoModal";

const Closer = () => {
    const [show, setShow] = useState({
        create: false,
        view: false,
        edit: false,
        delete: false,
    });
    const [id, setId] = useState<number>();

    const [name, setName] = useState<string>("");

    const { data: user, refetch } = useQuery({
        queryKey: ["closer"],
        queryFn: () => getAllCloser(name),
    });

    const headers = [
        { label: "EMAIL", key: "email" },
        { label: "EMPLOYEE ID", key: "employeeId" },
        { label: "ID", key: "id" },
        { label: "NAME", key: "name" },
        { label: "PHONE", key: "phone" },
        { label: "ROLE", key: "role" },
    ];

    const resetFilters = () => {
        setName("");
        refetch();
    };

    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <div className=" flex flex-col gap-1 mb-5 w-fit">
                            <div className="flex flex-col space-y-1">
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    placeholder="ALIAS NAME"
                                    value={name}
                                    onChange={(e) => setName(e?.target?.value)}
                                    onKeyDown={(
                                        e: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                        if (e.key === "Enter") {
                                            refetch();
                                        }
                                    }}
                                    id="name"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <button
                                onClick={resetFilters}
                                className="bg-sky-500 text-sm w-fit text-white px-10 py-1 rounded-md cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </motion.div>
                    <div className="text-gray-900 bg-white ">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 1.2,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-between items-center origin-center"
                        >
                            <p className="text-3xl font-semibold uppercase origin-center w-fit">
                                All Closers
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-row-reverse"
                    >
                        <button className="py-1.5 px-7 my-3 bg-green-700 text-white rounded-md text-sm flex gap-2 items-center cursor-pointer">
                            <FaFileCsv className="text-lg" />
                            <CSVLink
                                data={user ? user : []}
                                headers={headers}
                                filename="Closer.csv"
                            >
                                Export as CSV
                            </CSVLink>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md"
                    >
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-center text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Sr. No.
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        actions
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        alias
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        blocked
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.map((item: any, i: number) => (
                                    <tr className="capitalize text-center text-gray-900 font-semibold odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                        >
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setShow({
                                                        create: false,
                                                        edit: false,
                                                        view: true,
                                                        delete: false,
                                                    });
                                                }}
                                                className="font-medium cursor-pointer text-white bg-blue-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <FaEye /> Details
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.alias}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.role}
                                        </td>
                                        <td className="px-6 py-4 lowercase">
                                            {item?.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.isBlocked ? (
                                                <p className="bg-red-500 px-2 py-0.5 rounded text-xs text-white">
                                                    blocked
                                                </p>
                                            ) : (
                                                <p className="bg-green-500 px-2 py-0.5 rounded text-xs text-white">
                                                    active
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>

            {show.view && (
                <CloserInfoModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            view: false,
                            edit: false,
                            delete: false,
                        })
                    }
                    userId={id!}
                />
            )}
        </>
    );
};

export default Closer;
