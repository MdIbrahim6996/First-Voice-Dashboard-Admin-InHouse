export const returnColors = (status: string) => {
    switch (status) {
        case "pending":
            return "#FFFE71";
        case "success":
            return "#ACE1AF";
        case "cancelled":
            return "#C81D11";
        case "rework/warmup":
            return "#0070BB";
        default:
            return "";
    }
};
export const returnDarkColors = (status: string) => {
    switch (status) {
        case "pending":
            return "#d4a017";
        case "success":
            return "#0B6623";
        case "cancelled":
            return "#C81D11";
        case "rework/warmup":
            return "#0070BB";
        default:
            return "";
    }
};

export const formatNumber = (number: number) =>
    number < 10 ? `0${number}` : number;

export const filterStatus = (status: any) => {
    return status?.filter((item: any) => item?.name === "paid" || "refund");
};

export const formatDate = (date: Date) => {
    const dt = new Date(date);

    // Example: formatted for Asia/Kolkata
    return dt.toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata", // convert to India time
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
};
