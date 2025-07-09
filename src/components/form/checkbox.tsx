import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import FieldLabel from "./form-label"
import FieldError from "./form-error"

export function FormCheckbox<TForm extends FieldValues>({
    name,
    label,
    disabled,
    control,
    required,
    hideError = true,
}: thisProps<TForm>) {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled || field.disabled}
                            className="-mt-1"
                            id={name}
                        />
                        <FieldLabel
                            htmlFor={name}
                            required={!!required}
                            isError={!!control._formState.errors?.[name]}
                        >
                            {label}
                        </FieldLabel>
                    </div>
                )}
            />
            {!hideError && control._formState.errors?.[name] && (
                <FieldError>
                    {control._formState.errors[name]?.message as string}
                </FieldError>
            )}
        </div>
    )
}

interface thisProps<TForm extends FieldValues> {
    name: Path<TForm>
    label: string
    disabled?: boolean
    control: Control<TForm>
    required?: boolean
    hideError?: boolean
}
