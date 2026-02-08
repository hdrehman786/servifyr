import { useQuery } from "@tanstack/react-query";
import axios from "axios"




export const getRecipe = async () => {
    const response = await axios.get("/api/recipe/getrecipe");
    return response.data;
};

export const singleRecipe = async () => {
    const response = await axios.get("/api/recipe/getsinglerecipe");
    return response.data;
}




export const useGetRecipe = () => {
    return useQuery({
        queryKey: ["recipe"],
        queryFn: getRecipe
    })
};

export const useGetSingleRecipe = () => {
    return useQuery({
        queryKey : ["singlerecipe"],
        queryFn : singleRecipe
    })
};