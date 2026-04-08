import React from "react";
import type { FiltersType } from "../../../types/app.types";

interface IPaginationProps {
    leads: any[];
    page: number;
    totalPages: number;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

const Pagination = ({
    leads,
    page,
    setFilters,
    totalPages = 0,
}: IPaginationProps) => {
    return (
        <div>
            {" "}
            {leads?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 items-center w-fit mx-auto">
                    <button
                        disabled={page === 1}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                page: Math.max(prev.page - 1, 1),
                            }))
                        }
                        className="bg-red-500 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>

                    {/* Pages */}
                    {(() => {
                        // const totalPages = data?.totalPages || 0;
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
                            const end = Math.min(totalPages - 1, page + 2);

                            for (let i = start; i <= end; i++) {
                                pages.push(i);
                            }

                            if (page < totalPages - (maxVisible - 1))
                                pages.push("...");

                            pages.push(totalPages);
                        }

                        return pages.map((p, idx) =>
                            p === "..." ? (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="px-3 py-1"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={`page-${p}`}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            page: p as number,
                                        }))
                                    }
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
                        disabled={page === totalPages}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                page: prev.page + 1,
                            }))
                        }
                        className="bg-blue-700 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pagination;
