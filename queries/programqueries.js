import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { toast } from "react-toastify";

const getprograms = async (limit) => {
    const response = await axios.get(`/api/program/getprograms?limit=${limit}`);
    return response.data;
}

const addSubscription = async (name) => {
    const response = await axios.put("/api/subscription", { name });
    return response.data;
}

const enrolledPrograms = async (programId) => {
    const response = await axios.put("/api/program/enrollprogram", { programId });
    return response.data;
}


export const useGetPrograms = (limit) => {
    return useQuery({
        queryKey: ['programs', limit],
        queryFn: () => getprograms(limit),
        staleTime: 5 * 60 * 1000,
    })
}


export const useAddSubscription = (data) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addSubscription,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["user"]);
            toast.success(data.message);
            return data;
        },
        onError: (error) => {
            console.log("error", error);
        }
    })
}


export const useEnrolledProgram = (data) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: enrolledPrograms,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["user"]);
            return data
        },
        onError: (error) => {
            console.log(error);
        }
    })
}