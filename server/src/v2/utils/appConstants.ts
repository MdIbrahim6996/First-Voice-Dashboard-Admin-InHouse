export const environment = process.env.NODE_ENV;
export const CLIENT_URL =
    environment === "development" ? "http://localhost:5173/app/" : "/app";

export const PUHSER_APP_ID = process.env.PUHSER_APP_ID;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PUSHER_KEY = process.env.PUSHER_KEY;
export const PUSHER_SECRET = process.env.PUSHER_SECRET;
export const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER;

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
