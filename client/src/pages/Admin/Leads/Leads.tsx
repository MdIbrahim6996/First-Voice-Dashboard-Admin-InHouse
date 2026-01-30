import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye, FaFileCsv } from "react-icons/fa";
import { motion } from "motion/react";
import { CSVLink } from "react-csv";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllStatus } from "../../../api/status";
import { deleteLead, getAllLead } from "../../../api/lead";
import { getAllProcess } from "../../../api/process";
import { useEffect, useRef, useState } from "react";
import { getAllUser } from "../../../api/user";
import DeleteModal from "../../../components/Modal/DeleteModal";
import EditLeadModal from "../../../components/Modal/EditLeadModal";
import LeadDetailModal from "../../../components/Modal/LeadDetailModal";
import Loader from "../../../components/Loader/Loader";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { getAppliancePerPage } from "../../../api/appliance";
import { limitArray } from "../../../constants/appConstant";

const Leads = () => {
    const [phone, setPhone] = useState("");
    const [process, setProcess] = useState(0);
    // const [centre, setCentre] = useState("");
    const [leadUser, setLeadUser] = useState(0);
    const [closerUser, setCloserUser] = useState(0);
    const [verifierUser, setVerifierUser] = useState(0);
    const [saleDate, setSaleDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState(0);
    const [detail, setDetail] = useState({});
    const [id, setId] = useState<number>();

    const topScrollRef = useRef<HTMLDivElement | null>(null);
    const bottomScrollRef = useRef<HTMLDivElement | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        const top = topScrollRef.current;
        const bottom = bottomScrollRef.current;

        if (!top || !bottom) return;

        const syncTop = () => (bottom.scrollLeft = top.scrollLeft);
        const syncBottom = () => (top.scrollLeft = bottom.scrollLeft);

        top.addEventListener("scroll", syncTop);
        bottom.addEventListener("scroll", syncBottom);

        return () => {
            top.removeEventListener("scroll", syncTop);
            bottom.removeEventListener("scroll", syncBottom);
        };
    });

    const [show, setShow] = useState({
        edit: false,
        delete: false,
        view: false,
    });

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    const queryClient = useQueryClient();

    const { data: processData } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });
    const { data: userData } = useQuery({
        queryKey: ["user"],
        queryFn: () => getAllUser(),
    });
    const filteredUsers = userData?.filter(
        (item: any) => item?.role === "user"
    );
    const closerVerifierUsers = userData?.filter(
        (item: any) => item?.role === "closer" || item?.role === "verifier"
    );

    const { data: statusData } = useQuery({
        queryKey: ["status"],
        queryFn: getAllStatus,
    });

    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["leads", status, page],
        queryFn: () =>
            getAllLead(
                status,
                phone,
                process,
                leadUser,
                closerUser,
                verifierUser,
                saleDate,
                fromDate,
                toDate,
                page,
                limit
            ),
        placeholderData: true,
    });

    const leads = data?.leads;

    // const pagesArray = Array.from(
    //     { length: data?.totalPages },
    //     (_, i) => i + 1
    // );

    const { mutate } = useMutation({
        mutationFn: (id: number) => deleteLead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
        },
    });

    // console.log(leads);
    // console.log(excelLeadsData);

    const leadIds = leads?.map((item: any) => item?.id) ?? [];

    const { data: allApplainces } = useQuery({
        queryKey: ["allAppliances", page, leads], //fetches appliances when page or leads array changes.
        queryFn: () => getAppliancePerPage(leadIds),
        enabled: leadIds?.length > 0, // 🔑 this prevents early fetch
    });

    const maxStatusChanges =
        leads && leads.length > 0
            ? Math.max(
                  ...leads.map(
                      (lead: any) => lead.StatusChangeReason?.length || 0
                  )
              )
            : 0;

    const newLeads = leads?.map((item: any) => {
        let applianceArray: any = [];

        for (let i = 0; i < allApplainces?.length; i++) {
            if (allApplainces[i]?.leadId === item?.id) {
                applianceArray.push(allApplainces[i]);
            }
        }
        const flat: any = {};
        const flatStatusChangeReason: any = {};

        applianceArray.forEach((appl: any, idx: number) => {
            const i = idx + 1;
            flat[`name_${i}`] = appl.name?.toUpperCase();
            flat[`make_${i}`] = appl.makeOfAppliance?.toUpperCase();
            flat[`age_${i}`] = appl.age;
        });

        item?.StatusChangeReason.forEach((statusChange: any, idx: number) => {
            const i = idx + 1;
            flatStatusChangeReason[`from_${i}`] =
                statusChange?.fromStatus?.toUpperCase();
            flatStatusChangeReason[`to_${i}`] =
                statusChange?.toStatus?.toUpperCase();
            flatStatusChangeReason[`reason_${i}`] =
                statusChange?.reason?.toUpperCase();
        });
        return {
            status: item?.status?.name?.toUpperCase(),
            saleDate: item?.saleDate?.substring(0, 10),
            leadBy: item?.leadBy?.alias?.toUpperCase(),
            closer: item?.closer?.alias?.toUpperCase(),
            centre: item?.centre?.toUpperCase(),
            // PERSONAL
            title: item?.title?.toUpperCase()?.split(".").join(""),
            firstName: item?.firstName?.toUpperCase(),
            middleName: item?.middleName?.toUpperCase(),
            lastName: item?.lastName?.toUpperCase(),
            address: item?.address,
            city: item?.city?.toUpperCase(),
            county: item?.county?.toUpperCase(),
            post: item?.pincode,
            dateOfBirth: item?.dateOfBirth?.substring(0, 10),
            password: item?.password,
            phone: item?.phone?.toString(),
            // PROCESS / PLAN
            process: item?.process?.name?.toUpperCase(),
            plan: item?.plan?.name?.toUpperCase(),
            // BANK
            paymentMethod: item?.paymentMethod?.toUpperCase(),
            bankName: item?.bankName?.toUpperCase(),
            accountName: item?.accountName?.toUpperCase(),
            accountNumber: item?.accountNumber?.split(" ").join(""),
            sort: item?.sort?.split(" ").join(""),
            // CARD
            cardName: item?.cardName?.toUpperCase(),
            cardBankName: item?.cardBankName?.toUpperCase(),
            cardNumber: item?.cardNumber,
            cardCvv: item?.cardCvv,
            expiry: item?.expiry,
            comment: item?.comment?.replace(/[\r\n]+/g, " "),
            // APPLIANCES
            appliances: flat,
            appliancesLength: applianceArray?.length,
            statusChange: flatStatusChangeReason,
        };
    });

    // console.log(newLeads);

    const maxAppliances =
        newLeads && newLeads.length > 0
            ? Math.max(
                  ...newLeads.map((lead: any) => lead.appliancesLength || 0)
              )
            : 0;

    const headers = [
        { label: "STATUS", key: "status" },
        { label: "SALE DATE", key: "saleDate" },
        { label: "LEAD USER", key: "leadBy" }, //name or alias
        { label: "CLOSER", key: "closer" }, //name or alias
        { label: "CENTRE", key: "centre" },
        //
        { label: "TITLE", key: "title" },
        { label: "FIRST NAME", key: "firstName" },
        { label: "MIDDLE NAME", key: "middleName" },
        { label: "LAST NAME", key: "lastName" },
        { label: "ADDRESS", key: "address" },
        { label: "CITY", key: "city" },
        { label: "COUNTY", key: "county" },
        { label: "POST CODE", key: "post" },
        { label: "DATE OF BIRTH", key: "dateOfBirth" },
        { label: "PASSWORD", key: "password" },
        { label: "PHONE", key: "phone" },
        // { label: "POA", key: "poa" },
        // PLAN DETAILS
        { label: "PROCESS", key: "process" },
        { label: "PLAN", key: "plan" },
        // PAYMENT DETAILS
        // BANK
        { label: "PAYMENT METHOD", key: "paymentMethod" },
        { label: "BANK NAME", key: "bankName" },
        { label: "ACCOUNT NAME", key: "accountName" },
        { label: "ACCOUNT NUMBER", key: "accountNumber" },
        { label: "SORT", key: "sort" },
        // CARD
        { label: "NAME ON CARD", key: "cardName" },
        { label: "CARD NUMBER", key: "cardNumber" },
        { label: "CARD EXPIRY", key: "expiry" },
        { label: "CARD CVV", key: "cardCvv" },
        //
        { label: "COMMENT", key: "comment" },
    ];

    // const excelLeadsData = newLeads?.map((item: any) => ({
    //     status: item?.status?.name?.toUpperCase(),
    //     saleDate: item?.saleDate?.substring(0, 10),
    //     leadBy: item?.leadBy?.alias?.toUpperCase(),
    //     closer: item?.closer?.alias?.toUpperCase(),
    //     centre: item?.centre?.toUpperCase(),
    //     // PERSONAL
    //     title: item?.title?.toUpperCase(),
    //     firstName: item?.firstName?.toUpperCase(),
    //     middleName: item?.middleName?.toUpperCase(),
    //     lastName: item?.lastName?.toUpperCase(),
    //     address: item?.address,
    //     city: item?.city?.toUpperCase(),
    //     county: item?.county?.toUpperCase(),
    //     post: item?.pincode,
    //     dateOfBirth: item?.dateOfBirth?.substring(0, 10),
    //     password: item?.password,
    //     phone: item?.phone?.toString(),
    //     // PROCESS / PLAN
    //     process: item?.process?.name?.toUpperCase(),
    //     plan: item?.plan?.name?.toUpperCase(),
    //     // BANK
    //     paymentMethod: item?.paymentMethod?.toUpperCase(),
    //     bankName: item?.bankName?.toUpperCase(),
    //     accountName: item?.accountName?.toUpperCase(),
    //     accountNumber: item?.accountNumber?.toUpperCase(),
    //     sort: item?.sort?.toUpperCase(),
    //     // CARD
    //     cardName: item?.cardName?.toUpperCase(),
    //     cardBankName: item?.cardBankName?.toUpperCase(),
    //     cardNumber: item?.cardNumber,
    //     cardCvv: item?.cardCvv,
    //     expiry: item?.expiry,
    //     comment: item?.comment,
    // }));

    const applianceHeaders = [];
    for (let i = 0; i < maxAppliances; i++) {
        applianceHeaders.push(
            {
                label: `APPLIANCE NAME ${i + 1}`,
                key: `appliances.name_${i + 1}`,
            },
            {
                label: `APPLIANCE MAKE ${i + 1}`,
                key: `appliances.make_${i + 1}`,
            },
            { label: `APPLIANCE AGE ${i + 1}`, key: `appliances.age_${i + 1}` }
        );
    }

    const statusChangeReasonHeaders = [];

    for (let i = 0; i < maxStatusChanges; i++) {
        statusChangeReasonHeaders.push(
            {
                label: `FROM STATUS ${i + 1}`,
                key: `statusChange.from_${i + 1}`,
            },
            {
                label: `TO STATUS ${i + 1}`,
                key: `statusChange.to_${i + 1}`,
            },
            { label: `REASON ${i + 1}`, key: `statusChange.reason_${i + 1}` }
        );
    }

    const newHeaders = [
        ...headers,
        ...statusChangeReasonHeaders,
        ...applianceHeaders,
    ];
    // console.log(newHeaders);

    const resetFilters = () => {
        setPhone("");
        setCloserUser(0);
        setLeadUser(0);
        setVerifierUser(0);
        setStatus(0);
        setProcess(0);
        setSaleDate("");
        setFromDate("");
        setToDate("");
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
                        <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="phone"
                                    placeholder="PHONE"
                                    value={phone}
                                    onChange={(e) => setPhone(e?.target?.value)}
                                    onKeyDown={(
                                        e: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                        if (e.key === "Enter") {
                                            refetch();
                                        }
                                    }}
                                    id="phone"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="process">Process</label>
                                <select
                                    name="process"
                                    id="process"
                                    onChange={(e: any) =>
                                        setProcess(e.target.value)
                                    }
                                    value={process}
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select A Process
                                    </option>
                                    {processData?.map((item: any) => (
                                        <option key={item?.id} value={item?.id}>
                                            {item?.name?.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="leadUser">Lead User</label>
                                <select
                                    name="leadUser"
                                    id="leadUser"
                                    value={leadUser}
                                    onChange={(e: any) =>
                                        setLeadUser(e?.target?.value)
                                    }
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select Lead User
                                    </option>
                                    {filteredUsers?.map((item: any) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                            className="uppercase"
                                        >
                                            {item?.alias}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="closerUser">Closer User</label>
                                <select
                                    name="closerUser"
                                    value={closerUser}
                                    onChange={(e: any) =>
                                        setCloserUser(e?.target?.value)
                                    }
                                    id="closerUser"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select Closer User
                                    </option>
                                    {closerVerifierUsers?.map((item: any) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                            className="uppercase"
                                        >
                                            {item?.alias}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="verifierUser">
                                    Verifier User
                                </label>
                                <select
                                    name="verifierUser"
                                    onChange={(e: any) =>
                                        setVerifierUser(e?.target?.value)
                                    }
                                    id="verifierUser"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select Verifier User
                                    </option>
                                    {closerVerifierUsers?.map((item: any) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                            className="uppercase"
                                        >
                                            {item?.alias}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="saleDate">Sale Date</label>
                                <input
                                    type="date"
                                    name="saleDate"
                                    value={saleDate}
                                    id="saleDate"
                                    onChange={(e) =>
                                        setSaleDate(e.target.value)
                                    }
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="fromDate">From Date</label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={fromDate}
                                    id="fromDate"
                                    onChange={(e) =>
                                        setFromDate(e.target.value)
                                    }
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="toDate">To Date</label>
                                <input
                                    type="date"
                                    name="toDate"
                                    value={toDate}
                                    id="toDate"
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>{" "}
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="limit">Limit Per Page</label>
                                <select
                                    name="limit"
                                    onChange={(e: any) =>
                                        setLimit(e?.target?.value)
                                    }
                                    id="limit"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    {limitArray?.map((item: any) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-10 mt-3 flex items-center gap-2 text-sm">
                            <button
                                onClick={() => refetch()}
                                className="bg-green-500 text-white px-10 py-1 rounded-md cursor-pointer"
                            >
                                Search
                            </button>
                            <button
                                onClick={resetFilters}
                                className="bg-sky-500 text-white px-10 py-1 rounded-md cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </motion.div>

                    <div className="mb-5  text-gray-900 bg-white ">
                        <motion.p
                            initial={{
                                opacity: 0,
                                scale: 1.2,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-semibold uppercase origin-center w-fit"
                        >
                            Leads - All New Leads
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-1 text-sm font-normal text-gray-700 w-full"
                    >
                        <div className="flex mb-5 items-center justify-between">
                            <div className="flex gap-x-1">
                                {statusData?.map((item: any) => (
                                    <button
                                        key={item?.id}
                                        onClick={() => {
                                            setStatus(item?.id);
                                            queryClient.invalidateQueries({
                                                queryKey: ["leads"],
                                            });
                                        }}
                                        className={`${
                                            item?.name.toLowerCase() ===
                                            "success"
                                                ? "bg-green-500"
                                                : ""
                                        } ${
                                            item?.name.toLowerCase() ===
                                            "cancelled"
                                                ? "bg-red-500"
                                                : ""
                                        } ${
                                            item?.name.toLowerCase() ===
                                            "pending"
                                                ? "bg-yellow-500"
                                                : ""
                                        } ${
                                            item?.name.toLowerCase() ===
                                            "rework/warmup"
                                                ? "bg-sky-500"
                                                : ""
                                        } bg-gray-500 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer`}
                                    >
                                        {item?.name}
                                    </button>
                                ))}
                            </div>

                            <CSVLink
                                headers={newHeaders}
                                data={newLeads ? newLeads : []}
                                filename="Leads.csv"
                            >
                                <button className="py-1.5 px-7 bg-green-700 text-white rounded-md text-sm flex gap-1 items-center cursor-pointer">
                                    <FaFileCsv className="text-lg" /> Export as
                                    CSV
                                </button>
                            </CSVLink>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md sm:rounded-lg w-full"
                    >
                        <div
                            ref={topScrollRef}
                            style={{
                                overflowX: "auto",
                                overflowY: "hidden",
                                height: "20px",
                            }}
                        >
                            {/* Fake wide element to create scrollbar */}
                            <div
                                style={{
                                    width: "2000px",
                                    height: "1px",
                                }}
                            />
                        </div>
                        <div
                            ref={bottomScrollRef}
                            style={{
                                overflowX: "auto",
                                overflowY: "hidden",
                                width: "100%",
                            }}
                        >
                            {/* {isFetching && <Loader />} */}
                            {(isLoading || isFetching) && <Loader />}

                            {leads?.length > 0 && !isFetching && (
                                <table
                                    ref={tableRef}
                                    className="text-sm text-left rtl:text-right text-gray-500"
                                >
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
                                                Actions
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Sale Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Lead By
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Closed By
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Verified By
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Phone
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
                                                Process
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Plan
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {leads?.map((item: any, i: number) => (
                                            <tr
                                                key={item?.id}
                                                className={`text-slate-800 font-semibold capitalize text-center border-b :border-gray-700 border-gray-200`}
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                                >
                                                    {(page - 1) * limit + i + 1}
                                                </th>
                                                <td className="px-6 py-4 flex flex-col gap-1 items-center">
                                                    <button
                                                        onClick={() => {
                                                            setShow({
                                                                edit: true,
                                                                delete: false,
                                                                view: false,
                                                            });

                                                            setDetail(item);
                                                        }}
                                                        className="font-medium text-white bg-green-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDetail(item);
                                                            setShow({
                                                                edit: false,
                                                                delete: false,
                                                                view: true,
                                                            });
                                                        }}
                                                        className="font-medium text-white bg-blue-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setId(item?.id);
                                                            setShow({
                                                                edit: false,
                                                                delete: true,
                                                                view: false,
                                                            });
                                                        }}
                                                        className="font-medium text-white bg-red-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p
                                                        className={`${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "success"
                                                                ? "bg-green-500"
                                                                : ""
                                                        } ${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "pending"
                                                                ? "bg-yellow-500"
                                                                : ""
                                                        } ${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "cancelled"
                                                                ? "bg-red-500"
                                                                : ""
                                                        } ${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "rework/warmup"
                                                                ? "bg-sky-500"
                                                                : ""
                                                        } px-3 py-1 text-xs rounded font-semibold text-white`}
                                                    >
                                                        {item?.status?.name}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {new Date(
                                                        item?.saleDate
                                                    ).toDateString()}
                                                </td>
                                                <td className="px-6 py-4 uppercase">
                                                    {item?.leadBy?.alias}
                                                </td>
                                                <td className="px-6 py-4 uppercase">
                                                    {item?.closer?.alias}
                                                </td>
                                                <td className="px-6 py-4 uppercase">
                                                    {item?.verifier?.alias}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.phone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowra uppercase">
                                                    {item?.title}{" "}
                                                    {item?.firstName}{" "}
                                                    {item?.middleName}{" "}
                                                    {item?.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.process?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.plan?.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {(!leads || leads.length === 0) && <EmptyState />}
                        </div>
                    </motion.div>

                    {/* PAGINATION */}
                    {leads?.length > 0 && (
                        <div className="flex gap-2 mt-4 items-center w-fit mx-auto">
                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((old) => Math.max(old - 1, 1))
                                }
                                className="bg-red-500 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer disabled:cursor-not-allowed"
                            >
                                Prev
                            </button>

                            {/* {pagesArray?.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`text-xs font-semibold  px-6 py-1 rounded-md capitalize cursor-pointer ${
                                        p === page
                                            ? "bg-sky-500 text-white"
                                            : "bg-white text-black border border-slate-400"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))} */}
                            {/* Pages */}
                            {(() => {
                                const totalPages = data?.totalPages || 0;
                                const maxVisible = 5; // number of pages to show around the current page
                                let pages: (number | string)[] = [];

                                if (totalPages <= 7) {
                                    // If few pages, show all
                                    pages = Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1
                                    );
                                } else {
                                    // Always show first + last page
                                    pages.push(1);

                                    if (page > maxVisible) pages.push("...");

                                    const start = Math.max(2, page - 2);
                                    const end = Math.min(
                                        totalPages - 1,
                                        page + 2
                                    );

                                    for (let i = start; i <= end; i++) {
                                        pages.push(i);
                                    }

                                    if (page < totalPages - (maxVisible - 1))
                                        pages.push("...");

                                    pages.push(totalPages);
                                }

                                return pages.map((p, idx) =>
                                    p === "..." ? (
                                        <span key={idx} className="px-3 py-1">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p as number)}
                                            className={`text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer ${
                                                p === page
                                                    ? "bg-sky-500 text-white"
                                                    : "bg-white text-black border border-slate-400"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                );
                            })()}

                            <button
                                disabled={page === data?.totalPages}
                                onClick={() => setPage((old) => old + 1)}
                                className="bg-blue-700 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {show.delete && (
                <DeleteModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    handleDelete={() => mutate(id!)}
                />
            )}
            {show.edit && (
                <EditLeadModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    item={detail}
                />
            )}
            {show.view && (
                <LeadDetailModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    details={detail}
                />
            )}
        </>
    );
};

export default Leads;
