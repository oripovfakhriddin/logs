import { Controller, Control, FieldValues, Path } from "react-hook-form"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import Select from "../ui/select"
import { getNestedValue } from "./input"

export function FormSelect<
    TForm extends FieldValues,
    T extends Record<string, any>,
>({
    name,
    label,
    options,
    disabled,
    required,
    control,
    setValue,
    valueKey="value",
    labelKey="label",
    hideError = true,
}: thisProps<TForm, T>) {
    const error = getNestedValue(control._formState.errors, name)
    return (
        <div className="w-full">
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={!!required}
                    isError={!!error}
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
                    <div className={label ? "pt-[2px]" : ""}>
                        <Select
                            options={options}
                            label={label || "Tanlang"}
                            value={field.value}
                            className={
                                !!error && "border-destructive focus:right-0 "
                            }
                            setValue={(val) =>
                                val === "other"
                                    ? setValue?.(val)
                                    : field.onChange(val)
                            }
                            disabled={disabled}
                            labelKey={labelKey}
                            valueKey={valueKey}
                        />
                    </div>
                )}
            />
            {!hideError && error && (
                <FieldError>
                    {control._formState.errors[name]?.message as string}
                </FieldError>
            )}
        </div>
    )
}

type thisProps<TForm extends FieldValues, T extends Record<string, any>> = {
    name: Path<TForm>
    label?: string
    options: T[]
    disabled?: boolean
    required?: boolean
    setValue?: (val: string) => void
    control: Control<TForm>
    hideError?: boolean
    labelKey?: keyof T
    valueKey?: keyof T
}
