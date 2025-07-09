import {
    Control,
    FieldValues,
    Path,
    RegisterOptions,
    useController,
} from "react-hook-form"
import { cn } from "@/lib/utils"
import { NumericFormat, NumericFormatProps } from "react-number-format"
import { Label } from "./label"

interface IProps<IForm extends FieldValues> {
    label?: string
    required?: boolean
    registerOptions?: RegisterOptions<IForm>
    formatOptions?: Intl.NumberFormatOptions
    wrapperClassName?: string
    thousandSeparatmor?: string
    decimalSeparator?: string
}

export function NumberInput<IForm extends FieldValues>({
    label,
    registerOptions,
    wrapperClassName,
    className,
    formatOptions,
    thousandSeparator,
    decimalSeparator,
    ...props
}: IProps<IForm> & NumericFormatProps) {
    return (
        <div>
            <Label htmlFor={props.name || label} className="pb-1">
                {label}
            </Label>
            <NumericFormat
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                autoComplete="off"
                id={props.name || label}
                thousandSeparator={thousandSeparator}
                decimalSeparator={decimalSeparator}
                {...props}
                placeholder={props.placeholder || label}
            />
        </div>
    )
}
