import { cn } from "@/lib/utils"
import {
    Controller,
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import SeeInView from "../ui/see-in-view"
import FieldError from "./form-error"
import { ImagePlus } from "lucide-react"

export default function FormImagePicker<IForm extends FieldValues>({
    name,
    label,
    disabled,
    methods,
    hideError = false,
    required = false,
    className,
    avatar,
}: ImagePickerProps<IForm>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: required,
                message: `${label}ni tanlang`,
            },
        },
    })

    return (
        <div className="w-full flex flex-col items-center">
            <Controller
                name={name}
                control={methods.control}
                render={() => (
                    <div className="relative">
                        {avatar ? (
                            <Avatar
                                className={`scale-150 mb-4 h-16 w-16 ${className}`}
                            >
                                {field.value && (
                                    <SeeInView
                                        url={
                                            typeof field.value === "string"
                                                ? field.value
                                                : field.value &&
                                                  URL.createObjectURL(
                                                      field.value,
                                                  )
                                        }
                                    >
                                        <AvatarImage
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : field.value &&
                                                      URL.createObjectURL(
                                                          field.value,
                                                      )
                                            }
                                            alt="Selected Image"
                                            className="object-cover"
                                        />
                                    </SeeInView>
                                )}
                                <AvatarFallback>
                                    <ImagePlus className="text-gray-500" />
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <>
                                {field.value ? (
                                    <SeeInView
                                        url={
                                            typeof field.value === "string"
                                                ? field.value
                                                : field.value &&
                                                  URL.createObjectURL(
                                                      field.value,
                                                  )
                                        }
                                    >
                                        <img
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : field.value &&
                                                      URL.createObjectURL(
                                                          field.value,
                                                      )
                                            }
                                            alt="Selected Image"
                                            className={`${className}` || ""}
                                        />
                                    </SeeInView>
                                ) : (
                                    <div
                                        className={`${className} bg-secondary`}
                                    />
                                )}
                            </>
                        )}
                        <input
                            type="file"
                            id={name}
                            accept="image/*"
                            disabled={disabled}
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    field.onChange(file)
                                }
                            }}
                            hidden
                        />
                    </div>
                )}
            />
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!error && "text-destructive",
                        "cursor-pointer pt-2",
                    )}
                >
                    {label}
                </Label>
            )}
            {!hideError && !!error && <FieldError>{error.message}</FieldError>}
        </div>
    )
}

interface ImagePickerProps<IForm extends FieldValues> {
    name: Path<IForm>
    label?: string
    disabled?: boolean
    required?: boolean
    methods: UseFormReturn<IForm>
    hideError?: boolean
    className?: ClassNameValue
    avatar?: boolean
}
