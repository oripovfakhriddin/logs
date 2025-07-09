import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormReturn,
} from "react-hook-form"
import { cn } from "@/lib/utils"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { ClassNameValue } from "tailwind-merge"
import { Textarea } from "../ui/textarea"
import { getNestedValue } from "./input"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    registerOptions?: RegisterOptions<IForm>
    wrapperClassName?: ClassNameValue
    hideError?: boolean
}

export function FormTextarea<IForm extends FieldValues>({
    methods,
    name,
    label,
    required = false,
    registerOptions,
    wrapperClassName,
    className,
    hideError = true,
    ...props
}: IProps<IForm> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const {
        register,
        formState: { errors },
    } = methods

    const reg = register(name, {
        required: required ? `${label}ni kiriting` : false,
        ...registerOptions,
        disabled: props.disabled,
    })

    const { disabled, ...otherProps } = props
    const error = getNestedValue(errors, name)

    return (
        <fieldset className={cn("flex flex-col w-full", wrapperClassName)}>
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={required}
                    isError={!!error}
                >
                    {label}
                </FieldLabel>
            )}
            <Textarea
                {...reg}
                {...otherProps}
                disabled={disabled || methods.formState.disabled}
                placeholder={props.placeholder || label}
                id={name}
                className={
                    !!error && label
                        ? "border-destructive focus:border-border !ring-destructive"
                        : ""
                }
            />
            {!hideError && errors[name] && (
                <FieldError>{errors[name]?.message as string}</FieldError>
            )}
        </fieldset>
    )
}

export default FormTextarea
