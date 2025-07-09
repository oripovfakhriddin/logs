import {
    USER_ACCESS_KEY,
    USER_REFRESH_KEY,
} from "@/constants/localstorage-keys"

export const getAccessToken = () => {
    const token = localStorage.getItem(USER_ACCESS_KEY)
    return token
}
export const getRefreshToken = () => {
    const token = localStorage.getItem(USER_REFRESH_KEY)
    return token
}
