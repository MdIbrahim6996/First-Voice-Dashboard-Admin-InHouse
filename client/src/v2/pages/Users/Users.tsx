import { motion } from "motion/react";
import { FaEye, FaFileCsv } from "react-icons/fa";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../../api/user";
import { CSVLink } from "react-csv";
import UserInfoModal from "../../components/Modal/UserInfoModal/UserInfoModal";
import { usePermission } from "../../hooks/usePermission";
import { MdAdd, MdEdit } from "react-icons/md";
import CreateUserModal from "../../../components/Modal/CreateUserModal";
import EditUserModal from "../../components/Modal/EditUserModal";

const Users = () => {
    const { can } = usePermission();
    const [detail, setDetail] = useState(null);
    const [show, setShow] = useState({
        create: false,
        view: false,
        edit: false,
        delete: false,
    });
    const [id, setId] = useState<number>();

    const [name, setName] = useState<string>("");

    const { data: user } = useQuery({
        queryKey: ["user", name],
        queryFn: () => getAllUser(name),
    });

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
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <div className=" flex flex-col gap-1 mb-5 w-fit">
                            <div className="flex flex-col space-y-1">
                                {/* <label htmlFor="name">Alias Name</label> */}
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    placeholder="Search by Alias Name"
                                    value={name}
                                    onChange={(e) => setName(e?.target?.value)}
                                    id="name"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                        </div>
                    </motion.div>
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
                            className="flex justify-between items-center origin-center"
                        >
                            <p className="text-3xl font-semibold uppercase origin-center w-fit">
                                My Workspsaces - All Users
                            </p>
                            {can("create:users") && (
                                <button
                                    onClick={() =>
                                        setShow({
                                            create: true,
                                            view: false,
                                            edit: false,
                                            delete: false,
                                        })
                                    }
                                    className="py-1.5 px-7 cursor-pointer bg-blue-700 text-white rounded-md text-sm flex gap-1 items-center"
                                >
                                    <MdAdd className="text-xl" /> Add User
                                </button>
                            )}
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
                                filename="Users.csv"
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
                                    {/* <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap "
                                    >
                                        Phone
                                    </th> */}
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
                                    <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                    >
                                        Process
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.map((item: any, i: number) => (
                                    <tr className="uppercase text-slate-900 font-semibold odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                        >
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4 space-y-0.5">
                                            {can("edit:users") && (
                                                <button
                                                    onClick={() => {
                                                        setDetail(item);
                                                        setShow({
                                                            create: false,
                                                            edit: true,
                                                            view: false,
                                                            delete: false,
                                                        });
                                                    }}
                                                    className="cursor-pointer font-medium text-white bg-green-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                                >
                                                    <MdEdit />
                                                </button>
                                            )}
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
                                                className="cursor-pointer font-medium text-white bg-blue-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <FaEye />
                                            </button>
                                            {/* <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setShow({
                                                        create: false,
                                                        edit: false,
                                                        view: false,
                                                        delete: true,
                                                    });
                                                }}
                                                className="cursor-pointer font-medium text-white bg-red-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdDelete />
                                            </button> */}
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
                                        {/* <td className="px-6 py-4">
                                            {item?.phone}
                                        </td> */}
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item?.process?.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>

            {show.view && (
                <UserInfoModal
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

            {show.edit && (
                <EditUserModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            view: false,
                            edit: false,
                            delete: false,
                        })
                    }
                    detail={detail}
                />
            )}
            {show.create && (
                <CreateUserModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            view: false,
                            edit: false,
                            delete: false,
                        })
                    }
                />
            )}
        </>
    );
};

export default Users;
