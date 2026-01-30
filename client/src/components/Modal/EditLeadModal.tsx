import { motion } from "motion/react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateLeadsFormInput } from "../../types/form.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateLead } from "../../api/lead";
import toast from "react-hot-toast";
import valid from "card-validator";

import { getAllStatus } from "../../api/status";
import { getAllProcess } from "../../api/process";
import { getAllPlan } from "../../api/plan";
import { getAllUser } from "../../api/user";
import { useEffect, useState } from "react";
import EditApplianceModal from "./EditApplianceModal";
import { deleteAppliance, getAppliance } from "../../api/appliance";
import DeleteModal from "./DeleteModal";

const EditLeadModal = ({
    handleClose,
    item,
}: {
    handleClose: () => void;
    item: any;
}) => {
    const [cardName, setCardName] = useState("");
    const [showApplianceModal, setShowApplianceModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [applainceId, setApplainceId] = useState();
    const [applianceDetail, setApplianceDetail] = useState(null);
    const {
        register,
        unregister,
        trigger,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<UpdateLeadsFormInput>({
        defaultValues: {
            title: item?.title,
            firstName: item?.firstName,
            middleName: item?.middleName,
            lastName: item?.lastName,
            address: item?.address,
            city: item?.city,
            county: item?.county,
            centre: item?.centre,
            pincode: item?.pincode,
            phone: item?.phone,
            password: item?.password,
            poa: String(item?.poa),
            process: item?.processId,
            plan: item?.planId,
            closer: item?.closerId,
            verifier: item?.verifierId,
            paymentMethod: item?.paymentMethod,
            bank: {
                accountName: item?.accountName,
                accountNumber: item?.accountNumber,
                bankName: item?.bankName,
                sort: item?.sort,
            },
            card: {
                cardNumber: item?.cardNumber,
                bankName: item?.cardBankName,
                name: item?.cardName,
                cvv: item?.cardCvv,
                expiry: item?.expiry,
            },
            bankName: item?.bankName,
            accountName: item?.accountName,
            accountNumber: item?.accountNumber,
            sort: item?.sort,
            comment: item?.comment,
            dateOfBirth: item?.dateOfBirth?.substring(0, 10),
            status: item?.statusId,
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "appliances",
    });
    const queryClient = useQueryClient();
    const finalStatus = watch("status");
    const statusCheck = watch("status");
    const { data: status } = useQuery({
        queryKey: ["status"],
        queryFn: getAllStatus,
    });

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const { data: plan } = useQuery({
        queryKey: ["plan"],
        queryFn: getAllPlan,
    });

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getAllUser(),
    });

    const { data: applainces } = useQuery({
        queryKey: ["appliance", item?.id],
        queryFn: () => getAppliance(item?.id),
    });

    const processValue = watch("process") ? watch("process") : 1;
    const paymentMethod = watch("paymentMethod");

    const filterPlan = (id: number) =>
        plan?.filter((item: any) => id == item?.processId);

    const closerVerifierUser = user?.filter(
        (item: any) => item?.role === "closer" || item?.role === "verifier"
    );
    useEffect(() => {
        if (paymentMethod === "demandDraft") {
            unregister("card");
            register("bank");
        } else {
            unregister("bank");
        }
        if (paymentMethod === "card") {
            unregister("bank");
            register("card");
        } else {
            unregister("card");
        }
        if (processValue && +processValue !== 3) {
            register("appliances");
        } else {
            unregister("appliances");
        }
    }, [register, unregister, paymentMethod, processValue]);

    const editMutation = useMutation({
        mutationFn: updateLead,
        onSuccess: (data) => {
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: ["leads"] });
                toast.success("Edited Successfully.");
                handleClose();
            }
        },
    });

    const { mutate: deleteApplianceMutation } = useMutation({
        mutationFn: (id: number) => deleteAppliance(id),
        onSuccess: (data) => {
            if (data?.id) {
                toast.dismiss();
                queryClient.invalidateQueries({
                    queryKey: ["appliance"],
                });
                toast.success("Deleted Successfully.", {
                    id: "deleted appliance",
                });
            }
        },
    });

    const onSubmit: SubmitHandler<UpdateLeadsFormInput> = (data) => {
        console.log(data);
        editMutation.mutate({
            ...data,
            id: item?.id,
            initialStatus: item?.status?.name,
            finalStatus: finalStatus,
        });
    };
    const cardNumber = watch("card.cardNumber");
    return (
        <>
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 overflow-y-scroll"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ opacity: 0.5, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg w-full max-w-5xl h-[90vh] overflow-y-scroll"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="">
                        <p className="bg-gray-200 py-2 px-6 text-xl">
                            Edit This Lead.
                        </p>
                    </div>
                    <div className="m-4 my-10">
                        <motion.form
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={handleSubmit(onSubmit)}
                            autoComplete="off"
                        >
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="title"
                                    className="font-semibold"
                                >
                                    Change Status
                                </label>
                                <select
                                    {...register("status", {
                                        required: "Please select Status.",
                                    })}
                                    id="status"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded"
                                >
                                    <option selected={true} disabled value="0">
                                        Select A Status
                                    </option>
                                    {status?.map((item: any) => (
                                        <option value={item?.id}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                                {errors?.status && (
                                    <p className="text-red-500">
                                        {errors?.status?.message}
                                    </p>
                                )}
                            </div>

                            {item?.statusId !== statusCheck && (
                                <div className="flex flex-col text-sm space-y-0.5 my-2">
                                    <label
                                        htmlFor="reason"
                                        className="font-semibold"
                                    >
                                        Reason For Status Change:
                                    </label>
                                    <textarea
                                        rows={5}
                                        id="reason"
                                        {...register("reason")}
                                        placeholder="Reason"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
                            )}

                            <p className="mb-4 text-2xl font-semibold italic text-black/80 underline">
                                Customer Information
                            </p>

                            <div className="grid grid-cols-4 gap-x-4 my-5">
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="title"
                                        className="font-semibold"
                                    >
                                        Title{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("title", {
                                            required: "Please select Title.",
                                        })}
                                        id="title"
                                        defaultValue="1"
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option value="Mr.">Mr.</option>
                                        <option value="Mrs.">Mrs.</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Dr.">Dr.</option>
                                    </select>
                                    {errors?.title && (
                                        <p className="text-red-500">
                                            {errors?.title?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="firstName"
                                        className="font-semibold"
                                    >
                                        First Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("firstName", {
                                            required:
                                                "Please Enter First Name.",
                                        })}
                                        id="firstName"
                                        placeholder="First Name"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.firstName && (
                                        <p className="text-red-500">
                                            {errors?.firstName?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="middleName"
                                        className="font-semibold"
                                    >
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("middleName")}
                                        id="middleName"
                                        placeholder="Middle Name"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="lastName"
                                        className="font-semibold"
                                    >
                                        Last Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("lastName", {
                                            required: "Please Enter Last Name.",
                                        })}
                                        id="lastName"
                                        placeholder="Last Name"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.lastName && (
                                        <p className="text-red-500">
                                            {errors?.lastName?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-x-4 my-5">
                                <div className="flex flex-col text-sm">
                                    <label
                                        htmlFor="centre"
                                        className="font-semibold"
                                    >
                                        Centre{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("centre", {
                                            required:
                                                "Please Enter Centre Name.",
                                        })}
                                        id="centre"
                                        placeholder="Centre"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.centre && (
                                        <p className="text-red-500">
                                            {errors?.centre?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm col-span-3">
                                    <label
                                        htmlFor="address"
                                        className="font-semibold"
                                    >
                                        Address
                                    </label>
                                    <textarea
                                        {...register("address")}
                                        id="address"
                                        placeholder="Address"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
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
                                    <input
                                        type="text"
                                        {...register("city")}
                                        id="city"
                                        placeholder="West Bridgford"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="county"
                                        className="font-semibold"
                                    >
                                        County
                                    </label>
                                    <input
                                        type="text"
                                        {...register("county")}
                                        id="county"
                                        placeholder="Nottinghamshire"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="pinCode"
                                        className="font-semibold"
                                    >
                                        Post Code{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("pincode")}
                                        id="pinCode"
                                        placeholder="700001"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
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
                                    <input
                                        type="text"
                                        {...register("password")}
                                        id="password"
                                        placeholder="***********"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="dob"
                                        className="font-semibold"
                                    >
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        {...register("dateOfBirth")}
                                        id="dob"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="phoneNumber"
                                        className="font-semibold"
                                    >
                                        Phone Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        {...register("phone", {
                                            required:
                                                "Please Enter Phone Number.",
                                        })}
                                        id="phone"
                                        placeholder="(033) 2347 9645"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.phone && (
                                        <p className="text-red-500">
                                            {errors?.phone?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="poa"
                                        className="font-semibold"
                                    >
                                        Power Of Attorney
                                    </label>
                                    <select
                                        {...register("poa", {
                                            required: "Please Select Yes/No.",
                                        })}
                                        id="poa"
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option disabled value="">
                                            Select Yes/No.
                                        </option>
                                        <option value={"true"}>YES</option>
                                        <option value={"false"}>NO</option>
                                    </select>
                                    {errors?.poa && (
                                        <p className="text-red-500">
                                            {errors?.poa?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <p className="mb-4 mt-16 text-2xl font-semibold italic text-black/80 underline">
                                Customer Plan and Product Details
                            </p>

                            <div className="grid grid-cols-4 gap-x-4 gap-y-4 my-5">
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="process"
                                        className="font-semibold"
                                    >
                                        Select Process
                                    </label>
                                    <select
                                        {...register("process", {
                                            required:
                                                "Please Select a Process.",
                                        })}
                                        id="process"
                                        defaultValue={""}
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option disabled selected value="">
                                            Select a Process
                                        </option>
                                        {process?.map((item: any) => (
                                            <option
                                                key={item?.id}
                                                value={item?.id}
                                            >
                                                {item?.name?.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.process && (
                                        <p className="text-red-500">
                                            {errors?.process?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="plan"
                                        className="font-semibold"
                                    >
                                        Plan
                                    </label>
                                    <select
                                        {...register("plan", {
                                            required: "Please Select a Plan.",
                                        })}
                                        id="plan"
                                        defaultValue={""}
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option disabled selected value="">
                                            Select a Plan
                                        </option>
                                        {filterPlan(processValue)?.map(
                                            (item: any) => (
                                                <option
                                                    value={item?.id}
                                                    key={item?.id}
                                                >
                                                    {item?.name?.toUpperCase()}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors?.plan && (
                                        <p className="text-red-500">
                                            {errors?.plan?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="closer"
                                        className="font-semibold"
                                    >
                                        Closer
                                    </label>
                                    <select
                                        {...register("closer", {
                                            required: "Please Select a Closer.",
                                        })}
                                        id="closer"
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option selected value="">
                                            Select a Closer
                                        </option>
                                        {closerVerifierUser?.map(
                                            (item: any) => (
                                                <option
                                                    key={item?.id}
                                                    value={item?.id}
                                                >
                                                    {item?.alias?.toUpperCase()}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors?.closer && (
                                        <p className="text-red-500">
                                            {errors?.closer?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="verifier"
                                        className="font-semibold"
                                    >
                                        Verifier
                                    </label>
                                    <select
                                        {...register("verifier", {
                                            required:
                                                "Please Select a Verifier.",
                                        })}
                                        id="verifier"
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option selected value="">
                                            Select a Verifier
                                        </option>
                                        {closerVerifierUser?.map(
                                            (item: any) => (
                                                <option
                                                    key={item?.id}
                                                    value={item?.id}
                                                >
                                                    {item?.alias?.toUpperCase()}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors?.verifier && (
                                        <p className="text-red-500">
                                            {errors?.verifier?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {applainces &&
                                applainces?.length > 0 &&
                                applainces.map((item: any, i: number) => (
                                    <div>
                                        <div
                                            key={i}
                                            className="grid grid-cols-3 gap-x-4 gap-y-4 mt-3"
                                        >
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="appliance"
                                                    className="font-semibold"
                                                >
                                                    Appliance Name
                                                </label>
                                                <input
                                                    readOnly={true}
                                                    value={item?.name}
                                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                                />
                                            </div>
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="makeOfAppliance"
                                                    className="font-semibold"
                                                >
                                                    Make of Appliance
                                                </label>
                                                <input
                                                    readOnly={true}
                                                    value={
                                                        item?.makeOfAppliance
                                                    }
                                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                                />
                                            </div>
                                            <div className="flex flex-col text-sm space-y-0.5">
                                                <label
                                                    htmlFor="age"
                                                    className="font-semibold"
                                                >
                                                    Age
                                                </label>
                                                <input
                                                    readOnly={true}
                                                    value={item?.age}
                                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setApplianceDetail(item);
                                                    setShowApplianceModal(true);
                                                }}
                                                className="bg-green-500 w-fit text-white text-xs font-semibold py-0.5 px-6 mt- rounded cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setApplainceId(item?.id);
                                                    setShowDelete(true);
                                                }}
                                                className="bg-red-500 w-fit text-white text-xs font-semibold py-0.5 px-6 mt- rounded cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {processValue && +processValue !== 3 ? (
                                <div className="my-5">
                                    <div className="flex justify-between">
                                        <p className="capitalize text underline font-semibold italic">
                                            applaince details
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                append({
                                                    name: "",
                                                    makeOfAppliance: "",
                                                    age: 0,
                                                })
                                            }
                                            className="bg-blue-700 text-white text-xs font-semibold py-1.5 px-6 mt-2 rounded cursor-pointer"
                                        >
                                            + Add Fields
                                        </button>
                                    </div>
                                    {fields?.map((field, index) => (
                                        <>
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-3 gap-x-4 gap-y-4 mt-3"
                                            >
                                                <div className="flex flex-col text-sm space-y-0.5">
                                                    <label
                                                        htmlFor="appliance"
                                                        className="font-semibold"
                                                    >
                                                        Appliance Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            `appliances.${index}.name`,
                                                            {
                                                                required:
                                                                    "Please Enter Appliance Name.",
                                                            }
                                                        )}
                                                        id="applianceName"
                                                        placeholder="Nottinghamshire"
                                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                                    />
                                                </div>
                                                <div className="flex flex-col text-sm space-y-0.5">
                                                    <label
                                                        htmlFor="makeOfAppliance"
                                                        className="font-semibold"
                                                    >
                                                        Make of Appliance
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            `appliances.${index}.makeOfAppliance`,
                                                            {
                                                                required:
                                                                    "Please Enter Make of Appliance.",
                                                            }
                                                        )}
                                                        id="makeOfAppliance"
                                                        placeholder="Make Of Appliance"
                                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                                    />
                                                </div>
                                                <div className="flex flex-col text-sm space-y-0.5">
                                                    <label
                                                        htmlFor="age"
                                                        className="font-semibold"
                                                    >
                                                        Age
                                                    </label>
                                                    <input
                                                        type="number"
                                                        {...register(
                                                            `appliances.${index}.age`,
                                                            {
                                                                required:
                                                                    "Please Enter Appliance Age.",
                                                            }
                                                        )}
                                                        id="age"
                                                        placeholder="10"
                                                        className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="bg-red-500 text-white text-xs font-semibold py-0.5 px-6 mt-2 rounded cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}

                            <div className="grid grid-cols-2 gap-x-4 gap-y-4 my-5">
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="paymentMethod"
                                        className="font-semibold"
                                    >
                                        Select Payment Method
                                    </label>
                                    <select
                                        {...register("paymentMethod", {
                                            required:
                                                "Please Select a Payment Method.",
                                        })}
                                        id="paymentMethod"
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option disabled selected value="">
                                            Select a Payment Method
                                        </option>
                                        <option value="cash">
                                            Cash/Cheque
                                        </option>
                                        <option value="directDebit">
                                            Direct Debit (DD)
                                        </option>
                                        <option value="card">Card</option>
                                    </select>
                                    {errors?.paymentMethod && (
                                        <p className="text-red-500">
                                            {errors?.paymentMethod?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="shift"
                                        className="font-semibold"
                                    >
                                        Shift
                                    </label>
                                    <select
                                        {...register("shift", {
                                            required: "Please Select a Shift.",
                                        })}
                                        id="shift"
                                        className="border outline-none border-gray-400 px-3 py-1 rounded"
                                    >
                                        <option
                                            selected
                                            value="UNITED KINGDOM (UK)"
                                        >
                                            UNITED KINGDOM (UK)
                                        </option>
                                        <option value="UNITED STATES (US)">
                                            UNITED STATES (US)
                                        </option>
                                        <option value="AUSTRALIA">
                                            AUSTRALIA (AU)
                                        </option>
                                    </select>
                                    {errors?.shift && (
                                        <p className="text-red-500">
                                            {errors?.shift?.message}
                                        </p>
                                    )}
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
                                            <input
                                                type="text"
                                                {...register("bank.bankName", {
                                                    required:
                                                        "Please Enter Bank Name.",
                                                })}
                                                id="bankName"
                                                placeholder="Bank of UK."
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.bank?.bankName && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.bank?.bankName
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="accountName"
                                                className="font-semibold"
                                            >
                                                Account Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register(
                                                    "bank.accountName",
                                                    {
                                                        required:
                                                            "Please Enter Account Name.",
                                                    }
                                                )}
                                                id="accountName"
                                                placeholder="Steve Balmer"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.bank?.accountName && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.bank
                                                            ?.accountName
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="accountNumber"
                                                className="font-semibold"
                                            >
                                                Account Number
                                            </label>
                                            <input
                                                type="text"
                                                {...register(
                                                    "bank.accountNumber",
                                                    {
                                                        required:
                                                            "Please Enter Account Number.",
                                                    }
                                                )}
                                                id="accountNumber"
                                                placeholder="000405007899"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.bank?.accountNumber && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.bank
                                                            ?.accountNumber
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="sort"
                                                className="font-semibold"
                                            >
                                                SORT Code
                                            </label>
                                            <input
                                                type="text"
                                                {...register("bank.sort", {
                                                    required:
                                                        "Please Enter Sort Code.",
                                                })}
                                                id="sort"
                                                placeholder="******"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.bank?.sort && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.bank?.sort
                                                            ?.message
                                                    }
                                                </p>
                                            )}
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
                                            <input
                                                type="text"
                                                {...register("card.name", {
                                                    required:
                                                        "Please Enter Card Holder's Name.",
                                                })}
                                                id="cardName"
                                                placeholder="Steve Morrison"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.card?.name && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.card?.name
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="cardBankName"
                                                className="font-semibold"
                                            >
                                                Bank Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("card.bankName", {
                                                    required:
                                                        "Please Enter Bank Name.",
                                                })}
                                                id="cardBankName"
                                                placeholder="Bank of UK"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.card?.bankName && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.card?.bankName
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="cardNumber"
                                                className="font-semibold"
                                            >
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={16}
                                                {...register(
                                                    "card.cardNumber",
                                                    {
                                                        onChange: () =>
                                                            trigger(
                                                                "card.cardNumber"
                                                            ),
                                                        required:
                                                            "Please Enter Card Number.",
                                                        validate: (data) => {
                                                            const numberValidation =
                                                                valid.number(
                                                                    data
                                                                );

                                                            if (
                                                                numberValidation.card
                                                            ) {
                                                                setCardName(
                                                                    numberValidation
                                                                        .card
                                                                        .type
                                                                );
                                                            }
                                                            if (
                                                                !numberValidation.isValid
                                                            ) {
                                                                setCardName("");
                                                                return "Invalid Card.";
                                                            }
                                                        },
                                                    }
                                                )}
                                                id="cardNumber"
                                                placeholder="4242 4242 4242 4242"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            <div className="flex gap-3">
                                                {cardName &&
                                                    cardNumber.length > 0 && (
                                                        <p className="text-green-600 uppercase ml-2">
                                                            &#10003; {cardName}
                                                        </p>
                                                    )}
                                                {errors?.card?.cardNumber && (
                                                    <p className="text-red-500">
                                                        {
                                                            errors?.card
                                                                ?.cardNumber
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="expiry"
                                                className="font-semibold"
                                            >
                                                Card Expiry
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={7}
                                                {...register("card.expiry", {
                                                    required:
                                                        "Please Enter Card Expiry.",
                                                    onChange: () =>
                                                        trigger("card.expiry"),
                                                    validate: (data) => {
                                                        const dateValidation =
                                                            valid.expirationDate(
                                                                data
                                                            );

                                                        if (
                                                            !dateValidation.isPotentiallyValid
                                                        ) {
                                                            return "Invalid Date.";
                                                        }

                                                        if (
                                                            dateValidation.isValid
                                                        ) {
                                                            return true;
                                                        }
                                                    },
                                                })}
                                                id="expiry"
                                                placeholder="05/30"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.card?.expiry && (
                                                <p className="text-red-500">
                                                    {
                                                        errors?.card?.expiry
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col text-sm space-y-0.5">
                                            <label
                                                htmlFor="cvv"
                                                className="font-semibold"
                                            >
                                                Card CVV
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={3}
                                                {...register("card.cvv", {
                                                    required:
                                                        "Please Enter CVV.",
                                                })}
                                                id="cvv"
                                                placeholder="424"
                                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                                            />
                                            {errors?.card?.cvv && (
                                                <p className="text-red-500">
                                                    {errors?.card?.cvv?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="appliance"
                                    className="font-semibold"
                                >
                                    Appliance
                                </label>
                                <input
                                    type="text"
                                    name="appliance"
                                    id="appliance"
                                    placeholder="Nottinghamshire"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="makeOfAppliance"
                                    className="font-semibold"
                                >
                                    Make of Appliance
                                </label>
                                <input
                                    type="text"
                                    name="makeOfAppliance"
                                    id="makeOfAppliance"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="age" className="font-semibold">
                                    Age
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    id="age"
                                    placeholder="***********"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                        </div> */}
                            <div className="mb-4">
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="comments"
                                        className="font-semibold"
                                    >
                                        Comments
                                    </label>
                                    <textarea
                                        {...register("comment")}
                                        rows={5}
                                        id="comments"
                                        placeholder="Comments if Any"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                </div>
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
                        </motion.form>
                    </div>
                </motion.div>
            </div>

            {showApplianceModal && (
                <EditApplianceModal
                    handleClose={() => setShowApplianceModal(false)}
                    detail={applianceDetail}
                />
            )}
            {showDelete && (
                <DeleteModal
                    handleClose={() => setShowDelete(false)}
                    handleDelete={() => deleteApplianceMutation(applainceId!)}
                />
            )}
        </>
    );
};

export default EditLeadModal;
