export interface Holiday {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface StatusChangeReason {
    item: {
        createdAt: Date;
        fromStatus: string;
        id: number;
        leadId: number;
        reason: string;
        toStatus: string;
        updatedAt: Date;
        userId: number;
    }[];
    handleClose: () => void;
}

export type FiltersType = {
    phone: string;
    post: string;
    fromDate: string;
    toDate: string;
    process: string;
    page: number;
    limit: number;
};

export interface OldLead {
    id: number;
    fname: string;
    lname: string;
    phone: string;
    pin: string;
    process: string;
    sale_at: string;
    salutation: string;
}

export interface OldLeadsResponse {
    leads: {
        json: OldLead[];
    };
    totalPages: number;
}
