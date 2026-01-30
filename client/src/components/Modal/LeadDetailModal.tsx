import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import type { LeadsFormInput } from "../../types/form.types";
import { useQuery } from "@tanstack/react-query";
import { getAppliance } from "../../api/appliance";
import { formatDate } from "../../utils/utils";

const LeadDetailModal = ({
    details,
    handleClose,
}: {
    details: any;

    handleClose: () => void;
}) => {
    const { register, watch } = useForm<LeadsFormInput>({
        defaultValues: { ...details },
    });
    const paymentMethod = watch("paymentMethod");

    const { data: appliances } = useQuery({
        queryKey: ["appliance", details?.id],
        queryFn: () => getAppliance(details?.id),
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
                                autoComplete="off"
                            >
                                {details?.StatusChangeReason?.length > 0 && (
                                    <>
                                        <h3 className="text-lg font-semibold italic text-black/80 underline">
                                            Status Changes Details
                                        </h3>

                                        <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
                                            <thead className="text-center text-gray-700 uppercase bg-gray-200">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Sr. No.
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        From
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        To
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Reason
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Updated At
                                                    </th>
                                                </tr>
                                            </thead>
                                            {details?.StatusChangeReason
                                                ?.length > 0 &&
                                                details?.StatusChangeReason.map(
                                                    (item: any, i: number) => (
                                                        <tr
                                                            key={item?.id}
                                                            className={` capitalize font-semibold text-slate-700 text-center border-b :border-gray-700 border-gray-200`}
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {i + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {item?.fromStatus}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {
                                                                    item?.toStatus
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {item?.reason}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {formatDate(item?.createdAt)}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </table>
                                    </>
                                )}
                                <div className="flex items-center justify-between">
                                    <p className="mb-4 text-2xl font-semibold italic text-black/80 underline">
                                        Customer Information
                                    </p>
                                    <p className="bg-blue-600 text-white rounded px-3 py-0.5 text-sm">
                                        {new Date(details?.createdAt)
                                            .toDateString()
                                            .substring(0, 10)}
                                    </p>
                                </div>

                                <div className="grid grid-cols-4 gap-x-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="title"
                                            className="font-semibold"
                                        >
                                            Title
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.title}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="firstName"
                                            className="font-semibold"
                                        >
                                            First Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.firstName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="middleName"
                                            className="font-semibold"
                                        >
                                            Middle Name
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.middleName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="lastName"
                                            className="font-semibold"
                                        >
                                            Last Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.lastName}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-x-4 my-5">
                                    <div className="flex flex-col text-sm">
                                        <label
                                            htmlFor="centre"
                                            className="font-semibold"
                                        >
                                            Centre{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                            {details?.centre}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm col-span-3">
                                        <label
                                            htmlFor="address"
                                            className="font-semibold"
                                        >
                                            Address
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="city"
                                            className="font-semibold"
                                        >
                                            City
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.city}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="county"
                                            className="font-semibold"
                                        >
                                            County
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.county}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="pinCode"
                                            className="font-semibold"
                                        >
                                            Pin Code
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.pincode}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-x-4 gap-y-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="password"
                                            className="font-semibold"
                                        >
                                            Password
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.password}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="dob"
                                            className="font-semibold"
                                        >
                                            Date of Birth
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.dateOfBirth?.substring(
                                                0,
                                                10
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="phoneNumber"
                                            className="font-semibold"
                                        >
                                            Phone Number
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <p className="border outline-none border-gray-400 px-3 py-1 h-full rounded uppercase">
                                            {details?.phone}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="poa"
                                            className="font-semibold"
                                        >
                                            Power of Attorney
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
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
                                        <label
                                            htmlFor="process"
                                            className="font-semibold"
                                        >
                                            Process
                                        </label>
                                        <p
                                            {...register("process")}
                                            id="process"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.process?.name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="plan"
                                            className="font-semibold"
                                        >
                                            Plan
                                        </label>
                                        <p
                                            {...register("plan")}
                                            id="plan"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.plan?.name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="leadBy"
                                            className="font-semibold"
                                        >
                                            Lead By
                                        </label>
                                        <p
                                            id="leadBy"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.leadBy?.alias}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="closer"
                                            className="font-semibold"
                                        >
                                            Closer
                                        </label>
                                        <p
                                            {...register("closer")}
                                            id="closer"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.closer?.alias}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="verifier"
                                            className="font-semibold"
                                        >
                                            Verifier
                                        </label>
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
                                {appliances && appliances?.length > 0 && (
                                    <>
                                        <h3 className="text-lg font-semibold italic text-black/80 underline">
                                            Appliance Details
                                        </h3>

                                        <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
                                            <thead className="text-center text-gray-700 uppercase bg-gray-200">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Sr. No.
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Make Of Appliance
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Age
                                                    </th>
                                                </tr>
                                            </thead>
                                            {appliances &&
                                                appliances?.length > 0 &&
                                                appliances.map(
                                                    (item: any, i: number) => (
                                                        <tr
                                                            key={item?.id}
                                                            className={` capitalize text-center border-b :border-gray-700 border-gray-200`}
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {i + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {item?.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {
                                                                    item?.makeOfAppliance
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                                {item?.age}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </table>
                                    </>
                                )}

                                <div className="grid grid-cols-2 gap-x-4 gap-y-4 my-5">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="paymentMethod"
                                            className="font-semibold"
                                        >
                                            Payment Method
                                        </label>
                                        <p
                                            {...register("paymentMethod")}
                                            id="paymentMethod"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.paymentMethod}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="shift"
                                            className="font-semibold"
                                        >
                                            Shift
                                        </label>
                                        <p
                                            {...register("shift")}
                                            id="shift"
                                            className="border outline-none border-gray-400 px-3 py-1 rounded uppercase"
                                        >
                                            {details?.shift}
                                        </p>
                                    </div>
                                </div>

                                {paymentMethod === "directDebit" && (
                                    <div className="my-5">
                                        <p className="capitalize text underline font-semibold italic">
                                            bank account details
                                        </p>
                                        <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="bankName"
                                                    className="font-semibold"
                                                >
                                                    Bank Name
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.bankName}
                                                </p>
                                            </div>
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="accountName"
                                                    className="font-semibold"
                                                >
                                                    Account Name
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.accountName}
                                                </p>
                                            </div>
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="accountNumber"
                                                    className="font-semibold"
                                                >
                                                    Account Number
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.accountNumber}
                                                </p>
                                            </div>
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="sort"
                                                    className="font-semibold"
                                                >
                                                    SORT Code
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.sort}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {paymentMethod === "card" && (
                                    <div className="my-5">
                                        <p className="capitalize text underline font-semibold italic">
                                            card details
                                        </p>
                                        <div className="grid grid-cols-8 gap-x-4 gap-y-4 ">
                                            <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="cardName"
                                                    className="font-semibold"
                                                >
                                                    Name
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.cardName}
                                                </p>
                                            </div>
                                            <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="cardBankName"
                                                    className="font-semibold"
                                                >
                                                    Bank Name
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.cardBankName}
                                                </p>
                                            </div>
                                            <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="cardNumber"
                                                    className="font-semibold"
                                                >
                                                    Card Number
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.cardNumber}
                                                </p>
                                            </div>
                                            <div className="col-span-1 flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="expiry"
                                                    className="font-semibold"
                                                >
                                                    Card Expiry
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase">
                                                    {details?.expiry}
                                                </p>
                                            </div>
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="cvv"
                                                    className="font-semibold"
                                                >
                                                    Card CVV
                                                </label>
                                                <p className="border outline-none border-gray-400 px-3 py-1 rounded uppercase h-full">
                                                    {details?.cardCvv}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <div className="flex flex-col text-sm space-y-0.5">
                                        <label
                                            htmlFor="comments"
                                            className="font-semibold"
                                        >
                                            Comments
                                        </label>
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

export default LeadDetailModal;
