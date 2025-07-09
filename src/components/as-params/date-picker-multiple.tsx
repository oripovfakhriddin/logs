import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { uz } from "date-fns/locale";
import convertDate from "@/lib/convertDate";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { format } from "date-fns";

type ParamDatePickerMultipleProps = {
    paramName?: string;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    defaultMonth?: Date;
    defaultValue?: Date[];
};

export function ParamDatePickerMultiple({
    paramName = "dates",
    placeholder = "Kunlarni tanlang",
    fullWidth,
    disabled,
    defaultMonth,
    defaultValue = [],
}: ParamDatePickerMultipleProps) {
    const navigate = useNavigate();
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >;

    const dateStrings = search[paramName];
    const parsedDates = dateStrings
        ? dateStrings.split(",").map((date: string) => new Date(date))
        : [];

    const handleOnChange = (dates: Date[] | undefined) => {
        if (!disabled) {
            const formattedDates = dates
                ?.map((date) => format(date, "yyy-MM-dd"))
                .join(",");
            navigate({
                search: {
                    ...search,
                    [paramName]: formattedDates || undefined,
                },
            });
        }
    };

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: undefined,
                },
            });
        }
    }

    useEffect(() => {
        if (defaultValue.length) {
            const formattedDefault = defaultValue
                .map((date) => format(date, "yyy-MM-dd"))
                .join(",");
            navigate({
                search: {
                    ...search,
                    [paramName]: formattedDefault,
                },
            });
        }
    }, [defaultValue, navigate, paramName, search]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "relative pl-10 pr-3 w-60 justify-start text-left font-normal",
                        !parsedDates.length && "text-muted-foreground",
                        fullWidth && "w-full"
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="absolute left-3 top-2 h-4 w-4 opacity-60" />
                    {parsedDates.length ? (
                        <p className="truncate mr-5">
                            {parsedDates
                                .map((date: Date) =>
                                    convertDate(date.toISOString(), true)
                                )
                                .join(", ")}
                        </p>
                    ) : (
                        <span className="truncate opacity-60">
                            {placeholder}
                        </span>
                    )}
                    {parsedDates.length > 0 && !disabled && (
                        <X
                            onClick={reset}
                            className="text-destructive absolute right-3 cursor-pointer"
                            size={16}
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    defaultMonth={defaultMonth}
                    mode="multiple"
                    selected={parsedDates}
                    onSelect={(dates) => handleOnChange(dates)}
                    initialFocus
                    locale={uz}
                />
            </PopoverContent>
        </Popover>
    );
}
