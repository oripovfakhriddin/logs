import { cn } from "@/lib/utils"
import { SVGProps } from "react"
import {
    FieldValues,
    Path,
    PathValue,
    RegisterOptions,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import FieldLabel from "./form-label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    registerOptions?: RegisterOptions<IForm>
    wrapperClassName?: ClassNameValue
    hideError?: boolean
}

export default function Rate<IForm extends FieldValues>({
    methods,
    name,
    label,
    required = false,
    registerOptions,
    wrapperClassName,
    className,
    hideError = true,
    ...props
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
    const rating = methods.watch(name)

    const {
        register,
        formState: { errors },
    } = methods

    const isError = !!errors?.[name]

    const reg = register(name, {
        required: {
            value: required,
            message: methods.formState.errors[name]?.message as any,
        },
        ...registerOptions,
        disabled: props.disabled,
    })

    function setValue(value: number) {
        const star = value as PathValue<
            IForm,
            Path<IForm> & (string | undefined)
        >
        methods.clearErrors(name)
        if (star == Number(rating)) {
            methods.resetField(name)
        } else {
            methods.setValue(name, star)
        }
    }

    return (
        <fieldset className={cn("w-full max-w-md flex flex-col")}>
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={required}
                    isError={isError}
                >
                    {label}
                </FieldLabel>
            )}
            <input
                type="text"
                className="hidden"
                {...reg}
                {...props}
                id={name}
            />
            <div className="flex  gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setValue(star)}
                        className={cn(
                            "text-foreground hover:text-primary hover:fill-foreground transition-colors",
                            rating >= star ? "text-primary" : "",
                            isError ? "text-destructive" : "",
                        )}
                    >
                        <StarIcon className="w-6 h-6" />
                    </button>
                ))}
            </div>
        </fieldset>
    )
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}
