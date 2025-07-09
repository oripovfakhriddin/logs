import { cn } from "@/lib/utils"
import React from "react"

export const CustomHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between flex-wrap gap-x-4 gap-y-2 mb-3",
            className,
        )}
        {...props}
    />
))
CustomHeader.displayName = "CustomHeader"
