import { X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { DatePicker } from "../ui/datepicker"
import { useEffect } from "react"

interface IProps {
    name?: string
    dateFormat?: string
    className?: string
    date?: Date | undefined
    setDate?: (date: Date | undefined) => void
    disabled?: boolean
    paramName?: string
    defaultValue?: Date | string
    placeholder?: string
}

export default function ParamDatePicker({
    name = "date",
    dateFormat = "yyy-MM-dd",
    className,
    paramName = "date",
    defaultValue,
    disabled,
    placeholder,
    ...props
}: IProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const dateString = search[paramName]
    const parsedDate = dateString ? new Date(dateString) : undefined

    const handleOnChange = (date: Date | undefined) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: date ? format(date, dateFormat) : undefined,
                },
            })
        }
    }

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: undefined,
                },
            })
        }
    }

    useEffect(() => {
        navigate({ search: { ...search, [paramName]: defaultValue } })
    }, [])
    return (
        <div
            className={cn(
                "relative flex items-center justify-between min-w-52 max-w-[280px]",
                className,
            )}
        >
            <DatePicker
                date={parsedDate}
                setDate={handleOnChange}
                disabled={disabled}
                {...props}
                defaultValue={new Date()}
                placeholder={placeholder}
                size="default"
            />
            {parsedDate && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-destructive absolute right-2 cursor-pointer"
                />
            )}
        </div>
    )
}
