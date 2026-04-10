import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import type { B2BLeadFormInput } from "../../types/form.types";
import { useEffect, useState } from "react";
import { createLead } from "../../../api/lead";
import { axiosInstanceV2 } from "../../lib/axiosInstance";
import { getAllUser } from "../../../api/user";

const AddB2BLeads = () => {
    const date = new Date();
    const currentDate = date.toString().substring(4, 15);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        reset,
    } = useForm<B2BLeadFormInput>();

    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getAllUser(),
    });

    const closerVerifierUser = user?.filter(
        (item: any) => item?.role === "closer" || item?.role === "verifier"
    );

    const { mutate: createLeadMutation, isPending } = useMutation({
        mutationFn: (formData) => createLead(formData),
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("Lead Created Successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["leads"],
                });
                reset();
            }
        },
    });

    const onSubmit: SubmitHandler<B2BLeadFormInput> = (data) => {
        //@ts-ignore
        createLeadMutation(data);
    };

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([]);
            return;
        }

        const debounce = setTimeout(async () => {
            try {
                setLoading(true);

                const { data } = await axiosInstanceV2.get(
                    `/b2b-lead/company?query=${query}`
                );
                console.log(data);
                setResults(data?.slice(0, 6));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(debounce);
    }, [query]);

    const pastLoan = watch("pastLoan.value");
    const pastLoanRepayment = watch("pastLoan.repaymentComplete.value");
    const loanType = watch("loanType");
    console.log(pastLoanRepayment);

    return (
        <div className="overflow-y-scroll h-full">
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
                        <p className="text-3xl font-semibold uppercase">
                            Add A New B2B Lead
                        </p>
                        <div className="py-1.5 px-10 bg-blue-700 text-white rounded-md text-sm">
                            {currentDate}
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                    >
                        Start Adding Leads Now & Expand Your Reach. <br /> Your
                        Gateway to New Connections.
                    </motion.p>
                </div>

                {/* Forms Starts Here */}
                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <div>
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
                                        required: "Please Enter First Name.",
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

                        <div className="grid grid-cols-3 gap-x-4 gap-y-5 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="dob" className="font-semibold">
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
                                        required: "Please Enter Phone Number.",
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
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Position in Business{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("positionInBusiness", {
                                        required: "Please Enter Pincode.",
                                    })}
                                    id="pinCode"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.positionInBusiness && (
                                    <p className="text-red-500">
                                        {errors?.positionInBusiness?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm col-span-3">
                                <label
                                    htmlFor="address"
                                    className="font-semibold"
                                >
                                    Residential Address
                                </label>
                                <textarea
                                    {...register("residentialAddress")}
                                    id="address"
                                    placeholder="Address"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="mb-4 mt-10 text-2xl font-semibold italic text-black/80 underline">
                            Business Details
                        </p>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-5 my-5">
                            <div className="relative flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="businessName"
                                    className="font-semibold"
                                >
                                    Business Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register("businessName", {
                                        required: "Please Enter Phone Number.",
                                    })}
                                    id="businessName"
                                    placeholder="Business Name"
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />

                                {results.length > 0 && (
                                    <div className="absolute top-full mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto z-50">
                                        {results?.map((company: any) => (
                                            <div
                                                key={company.number}
                                                onClick={() => {
                                                    // fill input
                                                    setValue(
                                                        "businessName",
                                                        company.name
                                                    );
                                                    setValue(
                                                        "businessAddress",
                                                        company.address
                                                    );
                                                    setValue(
                                                        "companyNumber",
                                                        company.companyNo
                                                    );
                                                    setValue(
                                                        "businessType",
                                                        company.businessType
                                                    );
                                                    setQuery(company.name);
                                                    setResults([]);

                                                    console.log(
                                                        "Selected:",
                                                        company
                                                    );
                                                }}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <div className="font-medium flex justify-between">
                                                    {company.name}
                                                    <span
                                                        className={`text-xs ${
                                                            company.status ===
                                                            "active"
                                                                ? "text-green-600"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        {company.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {company.address}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {loading && (
                                    <span className="text-xs text-gray-500 mt-1">
                                        Searching...
                                    </span>
                                )}

                                {errors?.businessName && (
                                    <p className="text-red-500">
                                        {errors?.businessName?.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Trading Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("tradingName", {
                                        required: "Please Enter Pincode.",
                                    })}
                                    id="pinCode"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.tradingName && (
                                    <p className="text-red-500">
                                        {errors?.tradingName?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-semibold"
                                >
                                    Business Nature
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    {...register("businessNature", {
                                        required: "Please Enter Phone Number.",
                                    })}
                                    id="businessNature"
                                    placeholder="(033) 2347 9645"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.businessNature && (
                                    <p className="text-red-500">
                                        {errors?.businessNature?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-semibold"
                                >
                                    Company No.
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    {...register("companyNumber", {
                                        required: "Please Enter Phone Number.",
                                    })}
                                    id="companyNumber"
                                    placeholder="(033) 2347 9645"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.companyNumber && (
                                    <p className="text-red-500">
                                        {errors?.companyNumber?.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Trading Since
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("tradingSince", {
                                        required: "Please Enter Pincode.",
                                    })}
                                    id="pinCode"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.tradingSince && (
                                    <p className="text-red-500">
                                        {errors?.tradingSince?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-semibold"
                                >
                                    Business Type
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    {...register("businessType", {
                                        required: "Please Enter Phone Number.",
                                    })}
                                    id="businessType"
                                    placeholder="(033) 2347 9645"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.businessType && (
                                    <p className="text-red-500">
                                        {errors?.businessType?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm col-span-3">
                                <label
                                    htmlFor="address"
                                    className="font-semibold"
                                >
                                    Business Address
                                </label>
                                <textarea
                                    {...register("businessAddress")}
                                    id="address"
                                    placeholder="Address"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mb-4 mt-10 text-2xl font-semibold italic text-black/80 underline">
                            Loan Details
                        </p>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-5 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="proposedLoanAmount"
                                    className="font-semibold"
                                >
                                    Proposed Loan Amount
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("proposedLoanAmount", {
                                        required: "Please Enter Number.",
                                    })}
                                    id="proposedLoanAmount"
                                    placeholder="£ 1,234,567"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.proposedLoanAmount && (
                                    <p className="text-red-500">
                                        {errors?.proposedLoanAmount?.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Loan Type
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex mt-3">
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value="MCA"
                                            {...register("loanType", {
                                                required: "Select status",
                                            })}
                                        />
                                        MCA
                                    </label>
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value="DIRECT"
                                            {...register("loanType")}
                                        />
                                        DIRECT
                                    </label>
                                </div>
                                {errors?.loanType && (
                                    <p className="text-red-500">
                                        {errors?.loanType?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    POS Available
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex mt-3">
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value={1}
                                            {...register("POSAvailable", {
                                                required: "Select status",
                                            })}
                                        />
                                        YES
                                    </label>
                                    {loanType !== "MCA" && (
                                        <label className="flex cursor-pointer w-full items-center gap-1">
                                            <input
                                                type="radio"
                                                value={0}
                                                {...register("POSAvailable")}
                                            />
                                            NO
                                        </label>
                                    )}
                                </div>
                                {errors?.loanType && (
                                    <p className="text-red-500">
                                        {errors?.loanType?.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="monthlySalePOS"
                                    className="font-semibold"
                                >
                                    Monthly Sale on POS
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("monthlySalePOS", {
                                        required: "Please Enter Number.",
                                    })}
                                    id="proposedLoanAmount"
                                    placeholder="£ 4,796,459"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.monthlySalePOS && (
                                    <p className="text-red-500">
                                        {errors?.monthlySalePOS?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Past(Existing) Loan
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex mt-3">
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value="true"
                                            {...register("pastLoan.value", {
                                                required: "Select status",
                                            })}
                                        />
                                        YES
                                    </label>
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value="false"
                                            {...register("pastLoan.value", {
                                                required: "Select status",
                                            })}
                                        />
                                        NO
                                    </label>
                                </div>
                                {errors?.loanType && (
                                    <p className="text-red-500">
                                        {errors?.loanType?.message}
                                    </p>
                                )}
                            </div>
                            {pastLoan === "true" && (
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="pinCode"
                                        className="font-semibold"
                                    >
                                        Repayment Complete
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex mt-3">
                                        <label className="flex cursor-pointer w-full items-center gap-1">
                                            <input
                                                type="radio"
                                                value="true"
                                                {...register(
                                                    "pastLoan.repaymentComplete.value",
                                                    {
                                                        required:
                                                            "Select status",
                                                    }
                                                )}
                                            />
                                            YES
                                        </label>
                                        <label className="flex cursor-pointer w-full items-center gap-1">
                                            <input
                                                type="radio"
                                                value="false"
                                                {...register(
                                                    "pastLoan.repaymentComplete.value"
                                                )}
                                            />
                                            NO
                                        </label>
                                    </div>
                                    {errors?.loanType && (
                                        <p className="text-red-500">
                                            {errors?.loanType?.message}
                                        </p>
                                    )}
                                </div>
                            )}
                            {pastLoanRepayment === "false" && (
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="repaymentAmount"
                                        className="font-semibold"
                                    >
                                        Amount Left for Repayment
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register(
                                            "pastLoan.repaymentComplete.repaymentAmount",
                                            {
                                                required:
                                                    "Please Enter Number.",
                                            }
                                        )}
                                        id="repaymentAmount"
                                        placeholder="£ 1,234,567"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.pastLoan?.repaymentComplete
                                        ?.repaymentAmount && (
                                        <p className="text-red-500">
                                            {
                                                errors?.pastLoan
                                                    ?.repaymentComplete
                                                    ?.repaymentAmount?.message
                                            }
                                        </p>
                                    )}

                                    {errors?.loanType && (
                                        <p className="text-red-500">
                                            {errors?.loanType?.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="mb-4 mt-10 text-2xl font-semibold italic text-black/80 underline">
                            Additional Services
                        </p>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-5 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    POS Sale
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex mt-3">
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value={1}
                                            {...register("POSAvailable", {
                                                required: "Select status",
                                            })}
                                        />
                                        YES
                                    </label>
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value={0}
                                            {...register("POSAvailable")}
                                        />
                                        NO
                                    </label>
                                </div>
                                {errors?.loanType && (
                                    <p className="text-red-500">
                                        {errors?.loanType?.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Current Account
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex mt-3">
                                    <label className="flex cursor-pointer w-full items-center gap-1">
                                        <input
                                            type="radio"
                                            value={1}
                                            {...register("POSAvailable", {
                                                required: "Select status",
                                            })}
                                        />
                                        YES
                                    </label>
                                    {loanType !== "MCA" && (
                                        <label className="flex cursor-pointer w-full items-center gap-1">
                                            <input
                                                type="radio"
                                                value={0}
                                                {...register("POSAvailable")}
                                            />
                                            NO
                                        </label>
                                    )}
                                </div>
                                {errors?.loanType && (
                                    <p className="text-red-500">
                                        {errors?.loanType?.message}
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
                                        required: "Please Select a Verifier.",
                                    })}
                                    id="verifier"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded"
                                >
                                    <option selected value="">
                                        Select a Verifier
                                    </option>
                                    {closerVerifierUser?.map((item: any) => (
                                        <option key={item?.id} value={item?.id}>
                                            {item?.alias?.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                                {errors?.verifier && (
                                    <p className="text-red-500">
                                        {errors?.verifier?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* <div className="mb-4">
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="comments" className="font-semibold">
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
                    </div> */}
                    <div>
                        <button
                            disabled={isPending}
                            className="bg-blue-700 text-white px-10 py-2 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed"
                        >
                            SUBMIT
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default AddB2BLeads;
