import { useNavigate, useSearch } from "@tanstack/react-router"
import { format, parse } from "date-fns"
import { MonthPicker } from "../ui/month-picker"

interface ParamMonthPickerProps {
    name?: string
    monthFormat?: string
    className?: string
    paramName?: string
    disabled?: boolean
    callbacks?: MonthCalProps["callbacks"]
    variant?: MonthCalProps["variant"]
    disabledDates?: Date[]
}

const DEFAULT_MONTH_FORMAT = "yyyy-MM"

export default function ParamMonthPicker({
    monthFormat = DEFAULT_MONTH_FORMAT,
    paramName = "month",
    disabled,
    callbacks,
    variant,
    disabledDates,
}: ParamMonthPickerProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const monthString = search[paramName]
    const parsedMonth: Date | undefined =
        monthString ? parse(monthString, monthFormat, new Date()) : undefined

    const selectedMonth =
        parsedMonth && !isNaN(parsedMonth.getTime()) ? parsedMonth : undefined

    const handleMonthSelect = (date: Date) => {
        if (!disabled) {
            const formattedMonth = format(date, monthFormat)
            navigate({
                search: {
                    ...search,
                    [paramName]: formattedMonth,
                },
            })
        }
    }

    return (
        <MonthPicker
            selectedMonth={selectedMonth}
            onMonthSelect={handleMonthSelect}
            callbacks={callbacks}
            variant={variant}
            disabledDates={disabledDates}
            disabled={disabled}
        />
    )
}
