import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { toast } from "react-toastify";



export const getProducts = async () => {
    const resposne = await axios.get("/api/product/getproducts");
    return resposne.data;
};

export const addToCartProduct = async (id) => {
    const resposne = await axios.put("/api/product/addtocart", { id });
    return resposne.data;
}

export const deleteProductFromCart = async (id) => {
    const response = await axios.put("/api/product/removecart",{id});
    return response.data
}


export const useProduct = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    })
}


export const useAddToCartProduct = () => {
    const queryCient = useQueryClient();
    return useMutation({
        mutationFn: addToCartProduct,
        onSuccess: (data) => {
            queryCient.invalidateQueries(["user"]);
            toast.success(data.message);
            return data
        },
        onError: (error) => {
            toast.error(error.response?.data?.message);
        }
    })
}


export const useDeleteFromCart = () => {
    const queryCient = useQueryClient();
    return useMutation({
        mutationFn: deleteProductFromCart,
        onSuccess: (data) => {
            queryCient.invalidateQueries(["user"]);
            toast.success(data.message);
            return data
        },
        onError: (error) => {
            console.log(error);
            return error;
        }
    })
}