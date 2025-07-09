import { Calendar as CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { uz } from "date-fns/locale"
import convertDate from "@/lib/convertDate"

type Props = {
    date: Date[] | any
    setDate: (days: Date[]) => void
    placeholder?: string
    fullWidth?: boolean
    disabled?: boolean
    defaultMonth?: Date
}

export function DatePickerMultiple({
    date,
    setDate,
    placeholder,
    fullWidth,
    disabled,
    defaultMonth,
}: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "relative pl-10 pr-3 w-60 justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        fullWidth && "w-full",
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="absolute left-3 top-2 h-4 w-4 opacity-60" />
                    {date.length ?
                        <p className="truncate mr-5">
                            {date
                                .map((date: Date) =>
                                    convertDate(String(date), true),
                                )
                                .join(", ")}
                        </p>
                    :   <span className="truncate opacity-60">
                            {placeholder}
                        </span>
                    }

                    {date?.length > 0 && (
                        <X
                            onClick={() => {
                                setDate([])
                            }}
                            className="text-destructive absolute right-3"
                            size={16}
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    defaultMonth={defaultMonth}
                    mode="multiple"
                    selected={date}
                    // @ts-expect-error sfs
                    onSelect={setDate}
                    initialFocus
                    locale={uz}
                />
            </PopoverContent>
        </Popover>
    )
}
