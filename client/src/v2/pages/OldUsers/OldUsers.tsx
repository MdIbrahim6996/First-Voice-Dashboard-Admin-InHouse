import { motion } from "motion/react";
import { FaFileCsv } from "react-icons/fa";

import { CSVLink } from "react-csv";
import { getAllOldUser } from "../../../api/user";
import { useQuery } from "@tanstack/react-query";

const OldUsers = () => {
    const { data } = useQuery({
        queryKey: ["old-user"],
        queryFn: getAllOldUser,
    });

    const user = data?.json;

    // const deleteMutation = useMutation({
    //     mutationFn: (id: number) => deleteUser(id),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["user"] });
    //     },
    // });

    const headers = [
        { label: "EMAIL", key: "email" },
        { label: "EMPLOYEE ID", key: "employeeId" },
        { label: "ID", key: "id" },
        { label: "NAME", key: "name" },
        { label: "PHONE", key: "phone" },
        { label: "ROLE", key: "role" },
    ];

    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <div className="mb- text-gray-900 bg-white ">
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
                            className="flex justify-between items-center origin-center mb-10"
                        >
                            <p className="text-3xl font-semibold uppercase origin-center w-fit">
                                 Old CRM Agents
                            </p>
                            <button className="py-1.5 px-7 my-3 bg-green-700 text-white rounded-md text-sm flex gap-2 items-center cursor-pointer">
                                <FaFileCsv className="text-lg" />
                                <CSVLink
                                    data={user ? user : []}
                                    headers={headers}
                                    filename="Users.csv"
                                >
                                    Export as CSV
                                </CSVLink>
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md"
                    >
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-gray-700 uppercase bg-gray-200">
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
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap "
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.map((item: any, i: number) => (
                                    <tr className="font-semibold uppercase text-slate-900 text-cente odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                        >
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item?.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.phone}
                                        </td>
                                        <td className="px-6 py-4 lowercase">
                                            {item?.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default OldUsers;
