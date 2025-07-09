import { ConfirmContext } from "@/layouts/confirm"
import { useContext } from "react"

export const useConfirm = () => {
    const context = useContext(ConfirmContext)
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider")
    }
    return context.confirm
}
