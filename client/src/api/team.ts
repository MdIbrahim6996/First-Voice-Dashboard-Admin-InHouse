import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

// SUPERADMIN
export const createTeam = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`${SERVER_URL}/team`, {
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

// COMMON
export const getAllTeams = async () => {
    try {
        const { data } = await axiosInstance.get(`/team`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }

        return error;
    }
};
export const getSingleTeam = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(`/team/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }

        return error;
    }
};

export const deleteTeam = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`${SERVER_URL}/team/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }

        return error;
    }
};
