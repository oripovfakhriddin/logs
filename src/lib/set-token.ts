import {
    USER_ACCESS_KEY,
    USER_REFRESH_KEY,
} from "@/constants/localstorage-keys"

export const setAccessToken = (token: string) => {
    localStorage.setItem(USER_ACCESS_KEY, token)
}
export const setRefreshToken = (token: string) => {
    localStorage.setItem(USER_REFRESH_KEY, token)
}
