import { MdAdd, MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateProcessModal from "../../components/Modal/Process/Create";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal";
import ProcessInfoModal from "../../components/Modal/Process/Info";
import { deleteProcess, getAllProcess } from "../../../api/process";
import EditProcessModal from "../../components/Modal/Process/Edit";

const Process = () => {
    const [show, setShow] = useState({
        create: false,
        delete: false,
        info: false,
        edit: false,
    });
    const [id, setId] = useState<number>();
    const [details, setDetails] = useState({});
    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const mutation = useMutation({
        mutationFn: (id: number) => deleteProcess(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["process"] });
        },
    });

    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <div className="mb-5  text-gray-900 bg-white ">
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
                                Process - All Process
                            </p>
                            <button
                                onClick={() =>
                                    setShow({
                                        create: true,
                                        delete: false,
                                        info: false,
                                        edit: false,
                                    })
                                }
                                className="py-1.5 px-7 bg-blue-700 text-white rounded-md text-sm flex gap-1 items-center"
                            >
                                <MdAdd className="text-xl" /> Add Process
                            </button>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md sm:rounded-lg"
                    >
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Sr. No.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Plan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {process?.map((item: any, i: number) => (
                                    <tr className="uppercase text-slate-900 font-semibold odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                        >
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.plans.map(
                                                (item: any, i: number) => (
                                                    <p
                                                        className="my-0.5"
                                                        key={item?.id}
                                                    >
                                                        {i + 1}. {item?.name}
                                                    </p>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.isActive ? (
                                                <span className="text-xs bg-green-500 text-white px-3 py-0.5 rounded-md">
                                                    ACTIVE
                                                </span>
                                            ) : (
                                                <span className="text-xs bg-red-500 text-white px-3 py-0.5 rounded-md">
                                                    INACTIVE
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 flex gap-1 items-center justify-center">
                                            <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setDetails(item);
                                                    setShow({
                                                        create: false,
                                                        delete: false,
                                                        info: false,
                                                        edit: true,
                                                    });
                                                }}
                                                className="font-medium cursor-pointer text-white bg-blue-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setShow({
                                                        create: false,
                                                        delete: false,
                                                        info: true,
                                                        edit: false,
                                                    });
                                                }}
                                                className="font-medium cursor-pointer text-white bg-green-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdRemoveRedEye />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setShow({
                                                        create: false,
                                                        delete: true,
                                                        info: false,
                                                        edit: false,
                                                    });
                                                }}
                                                className="font-medium cursor-pointer text-white bg-red-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>

            {show.create && (
                <CreateProcessModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            delete: false,
                            info: false,
                            edit: false,
                        })
                    }
                />
            )}
            {show.edit && (
                <EditProcessModal
                    details={details}
                    handleClose={() =>
                        setShow({
                            create: false,
                            delete: false,
                            info: false,
                            edit: false,
                        })
                    }
                />
            )}
            {show.info && (
                <ProcessInfoModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            delete: false,
                            info: false,
                            edit: false,
                        })
                    }
                    id={id!}
                />
            )}
            {show.delete && (
                <DeleteModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            delete: false,
                            info: false,
                            edit: false,
                        })
                    }
                    handleDelete={() => mutation.mutate(id!)}
                />
            )}
        </>
    );
};

export default Process;
