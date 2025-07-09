import { DatePicker } from "@/components/ui/datepicker"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { CalendarProps } from "../ui/calendar"
import FieldError from "./form-error"
import FieldLabel from "./form-label"
import { getNestedValue } from "./input"

export function FormDatePicker<TForm extends FieldValues>({
    name,
    label,
    disabled,
    control,
    required = false,
    calendarProps,
    hideError = true,
    placeholder,
}: thisProps<TForm>) {
    const error = getNestedValue(control._formState.errors, name)


    return (
        <div className="flex flex-col">
            {label && (
                <FieldLabel
                    isError={!!error}
                    htmlFor={name}
                    required={required}
                >
                    {label}
                </FieldLabel>
            )}
            <Controller
                name={name}
                control={control}
                rules={
                    required ? { required: `${label || name}ni kiriting` } : {}
                }
                render={({ field }) => (
                    <DatePicker
                        calendarProps={{
                            ...calendarProps,
                            defaultMonth: field.value
                                ? new Date(field.value)
                                : undefined,
                        }}
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={field.onChange}
                        placeholder={placeholder || label}
                        addButtonProps={{
                            disabled:field.disabled || disabled
                        }}
                        fullWidth
                        isError={!!error}
                    />
                )}
            />
            {!hideError && control._formState?.errors?.[name] && (
                <FieldError>
                    {control._formState.errors[name]?.message as string}
                </FieldError>
            )}
        </div>
    )
}

interface thisProps<TForm extends FieldValues> {
    name: Path<TForm>
    label?: string
    disabled?: boolean
    control: Control<TForm>
    required?: boolean
    calendarProps?: CalendarProps | undefined
    hideError?: boolean
    placeholder?: string
}
