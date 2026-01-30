import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppliance } from "../../api/appliance";

type Inputs = {
    name: string;
    makeOfAppliance: string;
    age: number;
};
const EditApplianceModal = ({
    handleClose,
    detail,
}: {
    handleClose: () => void;
    detail: any;
}) => {
    const { register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            name: detail?.name,
            makeOfAppliance: detail?.makeOfAppliance,
            age: detail?.age,
        },
    });
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (formData) => updateAppliance(detail?.id, formData),
        onSuccess: () => {
            toast.success("Updated Successfully!");
            queryClient.invalidateQueries({
                queryKey: ["appliance"],
            });
            handleClose();
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        //@ts-ignore
        mutate(data);
    };
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-[60]"
            onClick={handleClose}
        >
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-xl  overflow-hidden"
                onClick={(e) => e.stopPropagation()} // <-- STOP click from reaching overlay
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Edit This Appliance
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 py-5 space-y-2"
                    autoComplete="off"
                >
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="makeOfAppliance">
                            Make Of Appliance
                        </label>
                        <input
                            type="text"
                            id="makeOfAppliance"
                            placeholder="Make Of Appliance"
                            {...register("makeOfAppliance")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            placeholder="10"
                            id="age"
                            {...register("age")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
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

export default EditApplianceModal;
