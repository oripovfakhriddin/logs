import { cn } from "@/lib/utils"
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { Input } from "../ui/input"
import FieldError from "./form-error"
import FieldLabel from "./form-label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    registerOptions?: RegisterOptions<IForm>
    wrapperClassName?: ClassNameValue
    hideError?: boolean
    prefixIcon?: React.ReactNode
    uppercase?: boolean // Added new prop
}

export function getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((acc, key) => acc?.[key], obj)
}

export function FormInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    required = false,
    registerOptions,
    wrapperClassName,
    className,
    type = "text",
    hideError = true,
    uppercase = false,
    ...props
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
    const {
        register,
        formState: { errors },
    } = methods

    const error = getNestedValue(errors, name)

    const reg = register(name, {
        required: required ? `${label}ni kiriting` : false,
        ...(uppercase && {
            setValueAs: (value: string) => value?.toUpperCase(),
        }),
        ...registerOptions,
    })

    return (
        <fieldset className={cn("flex flex-col w-full justify-between ", wrapperClassName)}>
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={required}
                    isError={error}
                >
                    {label}
                </FieldLabel>
            )}
            <Input
                type={type}
                placeholder={props.placeholder || label}
                {...reg}
                {...props}
                id={name}
                fullWidth
                className={cn(
                   error && label
                        ? "border-destructive focus:border-border !ring-destructive"
                        : "",
                    uppercase && "uppercase placeholder:capitalize", // Add uppercase class for visual feedback
                    className,
                )}
            />
            {!hideError && error.message && (
                <FieldError>{error.message?.message as string}</FieldError>
            )}
        </fieldset>
    )
}

export default FormInput
