import axios from "axios";
import { axiosInstanceV2 } from "../v2/lib/axiosInstance";
import toast from "react-hot-toast";

export const createB2BLead = async (formData: any) => {
    try {
        const { data } = await axiosInstanceV2.post(`/b2b-lead`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
