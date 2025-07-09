export const getStorage = <T = any,>(key: string) => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.error(error)
        return null
    }
}
