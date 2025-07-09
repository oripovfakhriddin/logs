import { useModal } from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode } from "@tanstack/react-router"
import { toast } from "sonner"
import { Button } from "../ui/button"
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import Modal from "./modal"
import { useDelete } from "@/hooks/useDelete"

interface IProps {
    path: string
    id: string | number | undefined
    name?: ReactNode
    onSuccessAction?: () => void
    modalKey?: string
    disableRefetch?: boolean
    refetchKey?: string
    refetchKeys?: unknown[]
}

export default function DeleteModal({
    path,
    id,
    name = "",
    onSuccessAction,
    modalKey = "delete",
    disableRefetch = false,
    refetchKeys,
}: IProps) {
    const { closeModal } = useModal(modalKey)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useDelete({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli o'chirildi", { icon: "✅" })
            if (onSuccessAction) {
                onSuccessAction()
            }
            if (!disableRefetch) {
                queryClient.refetchQueries({
                    queryKey: [path],
                })
            }
            if (refetchKeys) {
                queryClient.refetchQueries({
                    predicate: (q) => {
                        return refetchKeys?.includes(q.queryKey[0])
                    },
                })
            }
            closeModal()
        },
    })

    const handleDelete = () => {
        mutate(path + `/${id}`)
    }

    return (
        <Modal size="max-w-md" modalKey={modalKey}>
            <DialogHeader>
                <DialogTitle className="font-normal max-w-sm">
                    Siz haqiqatdan ham {name} o'chirishni xohlaysizmi ?
                </DialogTitle>
                <DialogDescription>
                    Bu qaytarib bo'lmas jarayon!!!
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant={"destructive"}
                    onClick={handleDelete}
                    loading={isPending}
                >
                    O'chirish
                </Button>
            </DialogFooter>
        </Modal>
    )
}
