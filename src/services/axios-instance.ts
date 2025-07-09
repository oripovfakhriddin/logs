import { REFRESH_TOKEN } from "@/constants/api-endpoints"
import {
    USER_ACCESS_KEY,
    USER_REFRESH_KEY,
} from "@/constants/localstorage-keys"
import { getAccessToken, getRefreshToken } from "@/lib/get-token"
import { setAccessToken } from "@/lib/set-token"
import { QueryClient } from "@tanstack/react-query"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: `http://localhost:8090/api/log/`,
    headers: {
        "Content-Type": "application/json",
    },
})

export function setupAxiosInterceptors(queryClient: QueryClient) {
    axiosInstance.interceptors.request.use(
        function (config) {
            const token = getAccessToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        function (error) {
            return Promise.reject(error)
        },
    )

    axiosInstance.interceptors.response.use(
        function (response) {
            return response
        },
        async function (error) {
            const originalRequest = error.config
            const status = error.response?.status
            const isLoginPage = window.location.pathname === "/auth"

            // Agar request yo'q bo'lsa yoki status yo'q bo'lsa, reject
            if (!originalRequest || !status) {
                return Promise.reject(error)
            }
            return Promise.reject(error)
        },
    )
}

export default axiosInstance
