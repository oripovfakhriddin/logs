import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    className?: string
}
export default function FieldError({ children, className }: IProps) {
    return (
        <p
            className={cn(
                "text-destructive pt-1 pl-1 text-[0.8rem] font-medium",
                className,
            )}
        >
            {children}
        </p>
    )
}
