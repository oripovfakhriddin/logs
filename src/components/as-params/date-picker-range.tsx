import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { DatePickerWithRange } from "../form/date-range-picker";
import { useEffect } from "react";

interface IProps {
    name?: string;
    dateFormat?: string;
    className?: string;
    date?: DateRange | undefined;
    setDate?: SelectRangeEventHandler;
    disabled?: boolean;
    from?: string;
    to?: string;
    defaultValue?: DateRange | undefined;
}

export default function ParamDateRange({
    name = "date",
    dateFormat = "yyy-MM-dd",
    className,
    from = "from",
    to = "to",
    disabled,
    defaultValue,
    ...props
}: IProps) {
    const navigate = useNavigate();
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >;

    useEffect(() => {
        if (defaultValue) {
            navigate({
                search: {
                    ...search,
                    [from]: defaultValue?.from
                        ? format(defaultValue.from, dateFormat)
                        : undefined,
                    [to]: defaultValue?.to
                        ? format(defaultValue.to, dateFormat)
                        : undefined,
                },
            });
        }
    }, []);

    const fromDateString = search[from];
    const toDateString = search[to];

    const parsedDate: DateRange | undefined = {
        from: fromDateString ? new Date(fromDateString) : undefined,
        to: toDateString ? new Date(toDateString) : undefined,
    };

    const handleOnChange = (range: DateRange | undefined) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [from]: range?.from
                        ? format(range.from, dateFormat)
                        : undefined,
                    [to]: range?.to ? format(range.to, dateFormat) : undefined,
                },
            });
        }
    };

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [from]: undefined,
                    [to]: undefined,
                },
            });
        }
    }

    return (
        <div
            className={cn(
                "relative flex items-center justify-between min-w-64 w-max",
                className
            )}
        >
            <DatePickerWithRange
                date={parsedDate}
                setDate={handleOnChange}
                disabled={disabled}
                {...props}
            />
            {(parsedDate.from || parsedDate.to) && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-destructive absolute right-2 cursor-pointer"
                />
            )}
        </div>
    );
}
