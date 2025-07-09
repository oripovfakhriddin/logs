import * as React from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button, buttonVariants } from "./button"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { format } from "date-fns"
import { uz } from "date-fns/locale"

const MONTHS: Month[][] = [
    [
        { number: 0, name: "Yan" },
        { number: 1, name: "Fev" },
        { number: 2, name: "Mart" },
        { number: 3, name: "Apr" },
    ],
    [
        { number: 4, name: "May" },
        { number: 5, name: "Iyun" },
        { number: 6, name: "Iyul" },
        { number: 7, name: "Avg" },
    ],
    [
        { number: 8, name: "Sen" },
        { number: 9, name: "Okt" },
        { number: 10, name: "Noy" },
        { number: 11, name: "Dek" },
    ],
]

function MonthPicker({
    onMonthSelect,
    selectedMonth,
    minDate,
    maxDate,
    disabledDates,
    callbacks,
    onYearBackward,
    onYearForward,
    variant,
    className,
    disabled,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & MonthCalProps) {
    return (
        <div className={cn(className)} {...props}>
            <MonthCal
                onMonthSelect={onMonthSelect}
                callbacks={callbacks}
                selectedMonth={selectedMonth}
                onYearBackward={onYearBackward}
                onYearForward={onYearForward}
                variant={variant}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                disabled={disabled}
            ></MonthCal>
        </div>
    )
}

function MonthCal({
    selectedMonth,
    onMonthSelect,
    callbacks,
    variant,
    minDate,
    maxDate,
    disabledDates,
    onYearBackward,
    onYearForward,
    disabled,
}: MonthCalProps) {
    const [year, setYear] = React.useState<number>(
        selectedMonth?.getFullYear() ?? new Date().getFullYear(),
    )
    const [month, setMonth] = React.useState<number>(
        selectedMonth?.getMonth() ?? new Date().getMonth(),
    )
    const [menuYear, setMenuYear] = React.useState<number>(year)

    if (minDate && maxDate && minDate > maxDate) minDate = maxDate

    const disabledDatesMapped = disabledDates?.map((d) => {
        return { year: d.getFullYear(), month: d.getMonth() }
    })

    const [open, setOpen] = React.useState(false)
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger disabled={disabled} asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal text-muted-foreground",
                            selectedMonth && "font-medium text-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedMonth ?
                            format(selectedMonth, "MMMM yyyy", { locale: uz })
                        :   <span>Oy tanlang</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3">
                    <div className="flex justify-center pt-1 relative items-center w-full">
                        <div className="text-sm font-medium">
                            {callbacks?.yearLabel ?
                                callbacks?.yearLabel(menuYear)
                            :   menuYear}
                        </div>
                        <div className="space-x-1 flex items-center">
                            <button
                                onClick={() => {
                                    setMenuYear(menuYear - 1)
                                    if (onYearBackward) onYearBackward()
                                }}
                                className={cn(
                                    buttonVariants({
                                        variant: variant?.chevrons ?? "outline",
                                    }),
                                    "inline-flex items-center justify-center h-7 w-7 p-0 absolute left-1",
                                )}
                            >
                                <ChevronLeft className="opacity-50 h-4 w-4" />
                            </button>
                            <button
                                onClick={() => {
                                    setMenuYear(menuYear + 1)
                                    if (onYearForward) onYearForward()
                                }}
                                className={cn(
                                    buttonVariants({
                                        variant: variant?.chevrons ?? "outline",
                                    }),
                                    "inline-flex items-center justify-center h-7 w-7 p-0 absolute right-1",
                                )}
                            >
                                <ChevronRight className="opacity-50 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <table className="w-full border-collapse mt-2">
                        <tbody>
                            {MONTHS.map((monthRow, a) => {
                                return (
                                    <tr
                                        key={"row-" + a}
                                        className="flex w-full"
                                    >
                                        {monthRow.map((m) => {
                                            return (
                                                <td
                                                    key={m.number}
                                                    className="h-10 w-1/4 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setMonth(m.number)
                                                            setYear(menuYear)
                                                            if (onMonthSelect) {
                                                                onMonthSelect(
                                                                    new Date(
                                                                        menuYear,
                                                                        m.number,
                                                                    ),
                                                                )
                                                                setOpen(false)
                                                            }
                                                        }}
                                                        disabled={
                                                            (maxDate ?
                                                                menuYear >
                                                                    maxDate?.getFullYear() ||
                                                                (menuYear ==
                                                                    maxDate?.getFullYear() &&
                                                                    m.number >
                                                                        maxDate.getMonth())
                                                            :   false) ||
                                                            (minDate ?
                                                                menuYear <
                                                                    minDate?.getFullYear() ||
                                                                (menuYear ==
                                                                    minDate?.getFullYear() &&
                                                                    m.number <
                                                                        minDate.getMonth())
                                                            :   false) ||
                                                            ((
                                                                disabledDatesMapped
                                                            ) ?
                                                                disabledDatesMapped?.some(
                                                                    (d) =>
                                                                        d.year ==
                                                                            menuYear &&
                                                                        d.month ==
                                                                            m.number,
                                                                )
                                                            :   false)
                                                        }
                                                        className={cn(
                                                            buttonVariants({
                                                                variant:
                                                                    (
                                                                        month ==
                                                                            m.number &&
                                                                        menuYear ==
                                                                            year
                                                                    ) ?
                                                                        (variant
                                                                            ?.calendar
                                                                            ?.selected ??
                                                                        "default")
                                                                    :   (variant
                                                                            ?.calendar
                                                                            ?.main ??
                                                                        "ghost"),
                                                            }),
                                                            "h-full w-full p-0 font-normal aria-selected:opacity-100",
                                                        )}
                                                    >
                                                        {callbacks?.monthLabel ?
                                                            callbacks.monthLabel(
                                                                m,
                                                            )
                                                        :   m.name}
                                                    </button>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </PopoverContent>
            </Popover>
        </>
    )
}

MonthPicker.displayName = "MonthPicker"

export { MonthPicker }
