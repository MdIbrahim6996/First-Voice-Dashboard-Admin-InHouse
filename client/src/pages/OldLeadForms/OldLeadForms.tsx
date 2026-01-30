import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { getAllOldLeadForms } from "../../api/lead";
import { useEffect, useRef, useState } from "react";

import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

const OldLeadForms = () => {
    const [phone, setPhone] = useState("");
    const [post, setPost] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [limit, setLimit] = useState(30);

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

    const [page, setPage] = useState(1);

    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["old-leadforms", page],
        queryFn: () =>
            getAllOldLeadForms(phone, post, fromDate, toDate, page, limit),
        placeholderData: true,
    });

    const leads = data?.leads?.json;

    // const pagesArray = Array.from(
    //     { length: data?.totalPages },
    //     (_, i) => i + 1
    // );

    const resetFilters = () => {
        setPhone("");
        setPost("");
        setFromDate("");
        setToDate("");
        refetch();
    };

    const limitArray = [30, 50, 100, 500, 1000];

    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <div className="grid grid-cols-5 gap-x-3 gap-y-3">
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
                                <label htmlFor="post">Post Code</label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="post"
                                    placeholder="POST CODE"
                                    value={post}
                                    onChange={(e) => setPost(e?.target?.value)}
                                    onKeyDown={(
                                        e: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                        if (e.key === "Enter") {
                                            refetch();
                                        }
                                    }}
                                    id="post"
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
                            </div>
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
                        className="mb-5 text-gray-900 bg-white flex justify-between items-center"
                    >
                        <p className="text-3xl font-semibold uppercase origin-center w-fit">
                            Leads - All Old Lead Forms
                        </p>
                        <CSVLink
                            // headers={headers}
                            data={leads ? leads : []}
                            filename="OldLeadForms.csv"
                        >
                            <button className="py-1.5 px-7 bg-green-700 text-white rounded-md text-sm flex gap-1 items-center cursor-pointer">
                                <FaFileCsv className="text-lg" /> Export as CSV
                            </button>
                        </CSVLink>
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
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                Sr. No.
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                date
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                salutation
                                            </th>

                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                First Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                Last Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                Post Code
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                Phone No.
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-6 py-3"
                                            >
                                                Process
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {leads?.map((item: any, i: number) => (
                                            <tr
                                                key={item?.id}
                                                className={`capitalize text-center border-b :border-gray-700 border-gray-200`}
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                                >
                                                    {(page - 1) * limit + i + 1}
                                                </th>

                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {new Date(
                                                        item?.sale_date
                                                    ).toDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.cust_title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.cust_first_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.cust_last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.pincode}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.phone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                    {item?.process}
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
                        <div className="flex flex-wrap gap-2 mt-4 items-center w-fit mx-auto">
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
        </>
    );
};

export default OldLeadForms;
