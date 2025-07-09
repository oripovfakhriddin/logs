import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { Input, InputProps } from "../ui/input"
import { DEBOUNCETIME } from "@/constants/default"

type ParamInputProps = {
    searchKey?: string
    pageKey?: string
} & InputProps

export default function ParamInput({
    searchKey = "search",
    pageKey = "page",
    ...props
}: ParamInputProps) {
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = useSearch({ strict: false })
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            navigate({
                search: {
                    ...params,
                    [pageKey]: undefined,
                },
            })
        }
    } 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }
        debounceTimeoutRef.current = setTimeout(() => {
            navigate({
                search: {
                    ...params,
                    [searchKey]: val || undefined,
                    [pageKey]: undefined,
                },
            })
        }, DEBOUNCETIME)
    }

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [])

    return (
        <>
            <Input
                defaultValue={params[searchKey]}
                placeholder={"Qidiruv..."}
                type="search"
                ref={inputRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="h-9 "
                {...props}
            />
        </>
    )
}
