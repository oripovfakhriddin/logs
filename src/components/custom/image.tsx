import placeHolderImg from "@/assets/images/placeholder.avif"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Props = React.ImgHTMLAttributes<HTMLImageElement>
export default function Image({ className, src, ...props }: Props) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <img
            onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = placeHolderImg
            }}
            onLoad={() => {
                setIsLoading(false)
            }}
            loading="lazy"
            className={cn(
                "duration-300 delay-75 ease-in-out",
                isLoading ?
                    "scale-105 blur-2xl grayscale"
                :   "scale-100 blur-0 grayscale-0",
                className,
            )}
            src={src || placeHolderImg}
            {...props}
        />
    )
}
