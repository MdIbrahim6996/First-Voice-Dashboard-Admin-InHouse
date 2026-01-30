import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const getAppliance = async (leadId: number) => {
    try {
        const { data } = await axiosInstance.get(`/appliance/${leadId}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAppliance",
            });
        }
        return error;
    }
};
export const getAppliancePerPage = async (leadIds: number[]) => {
    try {
        const { data } = await axiosInstance.post(
            `/appliance/appliance-per-page`,
            { leadIds }
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAppliance",
            });
        }
        return error;
    }
};
export const updateAppliance = async (id: number, formdata: any) => {
    try {
        const { data } = await axiosInstance.put(`/appliance/${id}`, {
            ...formdata,
        });
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAppliance",
            });
        }
        return error;
    }
};

export const deleteAppliance = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`/appliance/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAppliance",
            });
        }
        return error;
    }
};
