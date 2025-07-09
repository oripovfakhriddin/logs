import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: process.env.NODE_ENV === "development" ? 0 : 3,
            gcTime: 1000 * 60 * 2,
        },
    },
})
