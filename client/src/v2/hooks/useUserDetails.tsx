import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

// hooks/useAuthUser.ts
export const useUserDetails = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/common/user-detail");
            return data;
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // cache 5 min
    });
};
