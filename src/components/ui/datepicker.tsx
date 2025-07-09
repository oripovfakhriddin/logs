import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
    date,
    setDate,
    placeholder,
    fullWidth,
    calendarProps,
    defaultValue,
    isError,
    addButtonProps,
}: {
    date: Date | any
    setDate: any
    placeholder?: string
    fullWidth?: boolean
    calendarProps?: CalendarProps | undefined
    defaultValue?: Date
    isError?: boolean
    addButtonProps:ButtonProps
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] !h-9 justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        fullWidth && "w-full",
                        isError && "border-destructive",
                    )}
                    {...addButtonProps}
                >
                    <CalendarIcon className="mr-1 text-gray-400 h-4 w-4" />
                    {date ? (
                        format(date, "dd/MM/yyyy")
                    ) : (
                        <span className="text-gray-400">
                            {placeholder || "Kunni tanlang"}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...calendarProps}
                    mode="single"
                    selected={new Date(date || (defaultValue as Date))}
                    onSelect={(newDate) =>
                        setDate(format(new Date(newDate as Date), "yyyy-MM-dd"))
                    }
                />
            </PopoverContent>
        </Popover>
    )
}
