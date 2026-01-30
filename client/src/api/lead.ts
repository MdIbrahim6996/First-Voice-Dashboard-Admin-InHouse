import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

//COMMON
export const getAllLead = async (
    status: number,
    phone: string,
    process: number,
    leadUser: number,
    closerUser: number,
    verifierUser: number,
    saleDate: string,
    fromDate: string,
    toDate: string,
    page: number,
    limit: number
) => {
    try {
        const { data } = await axiosInstance.get(
            `/lead?status=${status}&phone=${phone}&process=${process}&leadUser=${leadUser}&closerUser=${closerUser}&verifierUser=${verifierUser}&saleDate=${saleDate}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}`
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
export const getAllOldLead = async (
    phone: string,
    post: string,
    fromDate: string,
    toDate: string,
    page: number,
    limit: number,
    process?: string
) => {
    try {
        const { data } = await axiosInstance.get(
            `/lead/old?phone=${phone}&post=${post}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}&process=${process}`
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
export const getAllOldLeadForms = async (
    phone: string,
    post: string,
    fromDate: string,
    toDate: string,
    page: number,
    limit: number,
    process?: string
) => {
    try {
        const { data } = await axiosInstance.get(
            `/lead/old-leadforms?phone=${phone}&post=${post}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}&process=${process}`
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

//SUPERADMIN
export const createLead = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`/lead`, {
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
//SUPERADMIN
export const updateLead = async (formData: any) => {
    try {
        const { data } = await axiosInstance.put(
            `${SERVER_URL}/superadmin/lead/${formData?.id}`,
            {
                ...formData,
            }
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
//SUPERADMIN
export const deleteLead = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `${SERVER_URL}/superadmin/lead/${id}`
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

// USER
export const createUserLead = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`${SERVER_URL}/user/lead`, {
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
//User
export const getAllLeadOfUser = async (
    userId: number,
    status: number,
    saleDate: string,
    fromDate: string,
    toDate: string
) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/lead/${userId}?status=${status}&saleDate=${saleDate}&fromDate=${fromDate}&toDate=${toDate}`
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
