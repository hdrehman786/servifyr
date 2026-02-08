import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchuserdata = async () => {
    const response = await axios.get("/api/profile/getuserdata");
    return response.data;
};

const updateUserData = async (profile) => {
    const response = await axios.put("/api/profile/updateprofile", profile);
    return response.data;
};

const deleteUSerData = async () => {
    const response = await axios.post("/api/auth/logout");
    return response.data;
};

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchuserdata,
        retry: false,
        staleTime: 0,
        errorOutline: false 
    })
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};


export const useLogoutUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteUSerData,
        onSuccess: (data) => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.clear();
            window.location.href = "/";
            return data;
        },
        onError: (error) => {
            console.error("Logout error:", error);
        }
    });
}