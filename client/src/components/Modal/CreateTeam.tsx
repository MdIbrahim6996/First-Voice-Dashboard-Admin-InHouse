import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import { motion } from "motion/react";
import { getAllUser } from "../../api/user";
import { useState } from "react";
import { createTeam } from "../../api/team";

type Inputs = {
    name: string;
};

const CreateTeam = ({ handleClose }: { handleClose: () => void }) => {
    const [selectedUsers, setSelectedUsers] = useState<
        { value: string; label: string }[]
    >([]);
    const [selectedManager, setSelectedManager] = useState<any>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getAllUser(),
    });

    const managerOptions =
        user
            ?.filter(
                (user: any) =>
                    (user.role === "closer" || user.role === "verifier") &&
                    user.isBlocked === false
            )
            ?.map((user: any) => ({
                value: user.id,
                label: user.alias,
            })) || [];

    const userOptions =
        user
            ?.filter(
                (user: any) => user.role === "user" && user.isBlocked === false
            )
            ?.map((user: any) => ({
                value: user.id,
                label: user.alias,
            })) || [];

    const { mutate } = useMutation({
        mutationFn: (formData) => createTeam(formData),
        onSuccess: (data) => {
            if (data?.name) {
                toast.success("Team Created Successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["team"],
                });
                handleClose();
            }
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        //@ts-ignore
        mutate({
            ...data,
            managerId: selectedManager?.value,
            members: selectedUsers.map((user) => user.value),
        });
    };
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            onClick={handleClose}
        >
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl  overflow-hidde"
                onClick={(e) => e.stopPropagation()} // <-- STOP click from reaching overlay
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl rounded-t-lg">
                        Add a New Team
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 py-5 space-y-2"
                >
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            autoComplete="off"
                            autoFocus={true}
                            {...register("name", {
                                required: "Please Enter Name of Team.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-sm">
                                {errors?.name?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="manager">Manager</label>
                        <Select
                            required
                            options={managerOptions}
                            value={selectedManager}
                            onChange={(option) => setSelectedManager(option)}
                            placeholder="Select a Manager"
                        />
                    </div>
                    <div>
                        <label htmlFor="members">Members</label>
                        <Select
                            required
                            id="members"
                            options={userOptions}
                            isMulti
                            closeMenuOnSelect={false}
                            value={selectedUsers}
                            onChange={(option) =>
                                setSelectedUsers(option as any)
                            }
                            placeholder="Select a Members"
                        />
                    </div>
                    <div className="my-4 text-center">
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded mb-3 transition-colors"
                        >
                            Submit
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateTeam;
