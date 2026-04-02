import axios from "axios";
import { SERVER_URL, SERVER_URL_V2 } from "../constants/apiConstant";

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export const axiosInstanceV2 = axios.create({
    baseURL: SERVER_URL_V2,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
