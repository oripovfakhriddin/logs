import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    required: boolean
    htmlFor?: string
    isError: boolean
    className?:string
}

export default function FieldLabel({
    required,
    children,
    htmlFor,
    isError,
    className
}: IProps) {
    return (
        <label className={cn("select-none leading-[1.4] pb-1.5 text-sm cursor-pointer", isError && "text-destructive", className)} htmlFor={htmlFor}>
            {children} {required && <span className="text-destructive pl-1">*</span>}
        </label>
    )
}
