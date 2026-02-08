"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export const Providers = ({ children })=>{
    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}