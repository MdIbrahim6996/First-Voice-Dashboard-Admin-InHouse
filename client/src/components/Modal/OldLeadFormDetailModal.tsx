import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import type { LeadsFormInput } from "../../types/form.types";

const OldLeadFormDetailModal = ({
    details,
    handleClose,
}: {
    details: any;

    handleClose: () => void;
}) => {
    console.log(details);

    const { register } = useForm<LeadsFormInput>({
        defaultValues: { ...details },
    });

    return (
        <>
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ opacity: 0.5, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[95vh]  overflow-y-scroll"
                    onClick={(e) => e.stopPropagation()} // <-- STOP click from reaching overlay
                >
                    <div className="">
                        <p className="bg-gray-200 py-2 px-6 text-xl">
                            Lead Details
                        </p>
                    </div>
                    <div className="overflow-y-scroll h-full">
                        <div className="p-5">
                            <motion.form
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="mb-4 text-2xl font-semibold italic text-black/80 underline">
                                        Customer Information
                                    </p>
                                    <p className="bg-blue-600 text-white rounded px-3 py-0.5 text-sm">
                                        {new Date(
                                            details?.sale_date
                                        ).toDateString()}
                                    </p>
                                </div>

                                <div className="grid grid-cols-4 gap-x-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">Title</p>
                                        <p className="border h-full outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.cust_title}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            First Name
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.cust_first_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Middle Name
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.cust_middle_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Last Name
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.cust_last_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-x-4 my-5">
                                    <div className="flex flex-col text-sm">
                                        <p className="font-semibold">Centre</p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.centre}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm col-span-3">
                                        <p className="font-semibold">Address</p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">City</p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.city}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">County</p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.country}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Pin Code
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.pincode}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-x-4 gap-y-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Password
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.password}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Date of Birth
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.dob?.substring(0, 10)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Phone Number
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.phone}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Power of Attorney
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.poa?.toString()}
                                        </p>
                                    </div>
                                </div>

                                <p className="mb-4 mt-16 text-2xl font-semibold italic text-black/80 underline">
                                    Customer Plan and Product Details
                                </p>

                                <div className="grid grid-cols-5 gap-x-4 gap-y-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">Process</p>
                                        <p
                                            {...register("process")}
                                            id="process"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.process}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">Plan</p>
                                        <p
                                            {...register("plan")}
                                            id="plan"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.plan}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">Lead By</p>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.agent_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">Closer</p>
                                        <p
                                            {...register("closer")}
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.closer_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Verifier
                                        </p>
                                        <p
                                            {...register("verifier")}
                                            id="verifier"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.verifier?.alias
                                                ? details?.verifier?.alias
                                                : "No Verifier"}
                                        </p>
                                    </div>
                                </div>

                                <div className="my-5">
                                    <p className="capitalize text underline font-semibold italic">
                                        bank account details
                                    </p>
                                    <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Bank Name
                                            </p>
                                            <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.name_of_bank}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Account Name
                                            </p>
                                            <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.account_name}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Account Number
                                            </p>
                                            <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.account_number}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                SORT Code
                                            </p>
                                            <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.sort_code}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5">
                                    <p className="capitalize text underline font-semibold italic">
                                        card details
                                    </p>
                                    <div className="grid grid-cols-8 gap-x-4 gap-y-4 ">
                                        <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Name
                                            </p>
                                            <p className="border outline-none h-full border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.cardName}
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Bank Name
                                            </p>
                                            <p className="border outline-none h-full border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.cardBankName}
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Card Number
                                            </p>
                                            <p className="border outline-none h-full border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.card_no}
                                            </p>
                                        </div>
                                        <div className="col-span-1 flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Card Expiry
                                            </p>
                                            <p className="border outline-none h-full border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.expiry}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <p className="font-semibold">
                                                Card CVV
                                            </p>
                                            <p className="border outline-none h-full border-gray-400 px-3 py-1 rounded uppercase">
                                                {details?.card_cvv}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <p className="font-semibold">
                                            Comments
                                        </p>
                                        <textarea
                                            name="comment"
                                            readOnly
                                            value={details?.comment}
                                            rows={5}
                                            id="comments"
                                            placeholder="Comments if Any"
                                            className="border border-gray-400 px-3 py-1 rounded outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default OldLeadFormDetailModal;
