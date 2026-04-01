import { useQuery } from "@tanstack/react-query";
import { getAllOldLeadForms } from "../../../api/lead";
import { useEffect, useRef, useState } from "react";

import OldLeadFormDetailModal from "../../../components/Modal/OldLeadFormDetailModal";
import type { FiltersType } from "../../types/app.types";
import Filters from "../OldLeads/elements/Filters";
import PageHeader from "../OldLeads/elements/PageHeader";
import OldLeadFormsTable from "./elements/OldLeadFormsTable";
import Pagination from "../OldLeads/elements/Pagination";

const OldLeadForms = () => {
    const [show, setShow] = useState({
        edit: false,
        delete: false,
        view: false,
    });

    const [filters, setFilters] = useState<FiltersType>({
        phone: "",
        post: "",
        fromDate: "",
        toDate: "",
        process: "",
        limit: 30,
        page: 1,
    });

    const [info, setInfo] = useState({
        detail: {},
        show: false,
    });

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

    // const [page, setPage] = useState(1);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["old-leadforms", filters],
        queryFn: () =>
            getAllOldLeadForms(
                filters.phone,
                filters.post,
                filters.fromDate,
                filters.toDate,
                filters.page,
                filters.limit,
                filters.process
            ),
        placeholderData: true,
    });

    const leads = data?.leads?.json;

    const headers = [
        { label: "ID", key: "id" },
        { label: "USER ID", key: "user_id" },
        { label: "SALE AT", key: "sale_at" }, //name or alias
        { label: "SALUTATION", key: "closer_user_id" }, //name or alias
        { label: "FIRST NAME", key: "fname" },
        { label: "MIDDLE NAME", key: "mname" },
        { label: "LAST NAME", key: "lname" },
        { label: "CENTRE", key: "centre" },
        { label: "ADDRESS", key: "address1" },
        { label: "CITY", key: "city" },
        { label: "COUNTY", key: "country" },
        { label: "POST CODE", key: "pin" },
        { label: "DATE OF BIRTH", key: "dob" },
        { label: "PASSWORD", key: "password" },
        { label: "PHONE", key: "phone" },
        // PLAN DETAILS
        { label: "PROCESS", key: "process" },
        { label: "PLAN", key: "plan" },
        { label: "FEE", key: "fee" },
        { label: "CURRENCY", key: "currency" },
        // PAYMENT DETAILS
        // BANK
        { label: "BANK NAME", key: "bank_name" },
        { label: "ACCOUNT NAME", key: "account_name" },
        { label: "ACCOUNT NUMBER", key: "account_no" },
        { label: "SORT", key: "sort_code" },
        // CARD
        { label: "CARD TYPE", key: "card_type" },
        { label: "CARD NUMBER", key: "card_no" },
        { label: "EXPIRY MONTH", key: "expiry_month" },
        { label: "EXPIRY YEAR", key: "expiry_year" },
        { label: "CARD CVV", key: "card_cvv" },
        //
        { label: "COMMENT", key: "comments" },
    ];

    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <Filters filters={filters} setFilters={setFilters} />
                    <PageHeader
                        text="Leads - All Old Lead Forms"
                        headers={headers}
                        leads={leads}
                    />
                    <OldLeadFormsTable
                        leads={leads}
                        topScrollRef={topScrollRef}
                        bottomScrollRef={bottomScrollRef}
                        tableRef={tableRef}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        setInfo={setInfo}
                        page={filters.page}
                        limit={filters.limit}
                    />
                    <Pagination
                        leads={leads}
                        page={filters.page}
                        setFilters={setFilters}
                        totalPages={data?.totalPages || 0}
                    />
                </div>
            </div>

            {show.view && (
                <OldLeadFormDetailModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    details={info.detail}
                />
            )}
        </>
    );
};

export default OldLeadForms;
