import axios from "axios";
import { axiosInstanceV2 } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const getTopSellers = async () => {
    try {
        const { data } = await axiosInstanceV2.get(
            `/main-dashboard/top-sellers`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const getProcessLeaderboardData = async () => {
    try {
        const { data } = await axiosInstanceV2.get(
            `/main-dashboard/leaderboard`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
