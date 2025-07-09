import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { uz } from "date-fns/locale";

export function DatePickerWithRange({
    className,
    disabled,
    date,
    setDate,
}: {
    date: DateRange | undefined;
    setDate: SelectRangeEventHandler;
    disabled?: boolean;
} & {
    className?: React.HTMLAttributes<HTMLDivElement>;
}) {
    
    return (
        <div className={cn("grid gap-2 w-full", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal hover:text-foreground",
                            !date && "text-muted-foreground"
                        )}
                        disabled={disabled}
                    >
                        <CalendarIcon className={cn("mr-1 h-4 w-4 text-gray-400")} />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "yyy-MM-dd")} -{" "}
                                    {format(date.to, "yyy-MM-dd")}
                                </>
                            ) : (
                                format(date.from, "yyy-MM-dd")
                            )
                        ) : (
                            <span className="text-gray-400">Kunlarni tanlang</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={uz}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
