import { ReactNode } from "react"

import { useModal } from "@/hooks/useModal"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog"

type Props = {
    modalKey?: string
    title?: ReactNode
    description?: ReactNode
    children?: ReactNode
    className?: string
    size?:
        | "max-w-lg"
        | "max-w-xl"
        | "max-w-2xl"
        | "max-w-3xl"
        | "max-w-4xl"
        | "max-w-sm"
        | "max-w-md"
    onClose?: () => void
}

// Modal component that uses the context to control visibility
const Modal = ({
    title,
    description,
    children,
    modalKey = "default",
    className = "",
    size = "max-w-lg",
    onClose,
}: Props) => {
    const { isOpen, closeModal } = useModal(modalKey)

    const handleClose = () => {
        if (onClose) {
            onClose()
        }
        closeModal()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            {isOpen && (
                <DialogContent aria-describedby="" className={size + className}>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {!title && (
                        <VisuallyHidden>
                            <DialogTitle>title</DialogTitle>
                        </VisuallyHidden>
                    )}
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                    {children}
                </DialogContent>
            )}
        </Dialog>
    )
}

export default Modal
