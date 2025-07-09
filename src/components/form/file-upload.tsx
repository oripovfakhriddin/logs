import { Control, FieldValues, Path, useController } from "react-hook-form"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { FileUploader } from "react-drag-drop-files"
import Spinner from "../ui/spinner"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { Input } from "../ui/input"

type TProps<Form extends FieldValues> = {
    control: Control<Form>
    name: Path<Form>
    label?: string
    required?: boolean
    wrapperClassName?: string
    multiple?: boolean
    isCompressed?: boolean
    maxLength?: number
    maxSize?: number
    isPaste?: boolean
    dropAccept?: string[]
    hideError?: boolean
}

type FileType<Multiple extends boolean> = Multiple extends true
    ? FileList
    : File | null

export default function FileUpload<TForm extends FieldValues>({
    control,
    name,
    label,
    required = false,
    wrapperClassName,
    multiple = false,
    isCompressed = true,
    maxSize = 1000,
    maxLength = 1,
    isPaste = true,
    hideError = true,
}: TProps<TForm>) {
    const maxS = maxSize * 1024 * 1024
    const [isCompressing, setIsCompressing] = useState(false)
    const {
        field: { value, onChange, ...field },
        fieldState,
    } = useController({
        control,
        name,
        // @ts-expect-error defsdf
        defaultValue: multiple ? [] : undefined,
        rules: {
            validate: (val) => {
                let err = ""
                let valid = true

                if (required && (!val || (multiple && val.length === 0))) {
                    err = "Ushbu maydon majburiy"
                    valid = false
                }

                if (multiple && val) {
                    const totalSize = val?.reduce(
                        (prev: number, current: File) =>
                            prev + (current?.size || 0),
                        0,
                    )
                    if (val.length > maxLength) {
                        err = `Maksimum ${maxLength} ta fayl yuklash mumkin`
                        valid = false
                    }
                    if (totalSize > maxS) {
                        err = isCompressed
                            ? `Kompressdan keyin rasmlar hajmi ${maxSize} MB dan oshib ketdi`
                            : `Rasmlar hajmi ${maxSize} MB dan oshib ketdi`
                        valid = false
                    }
                }

                if (!multiple && val && val.size > maxS) {
                    err = isCompressed
                        ? `Kompressdan keyin rasm hajmi ${maxSize} MB dan oshib ketdi`
                        : `Rasm hajmi ${maxSize} MB dan oshib ketdi`
                    valid = false
                }

                return valid || err
            },
        },
    })

    const fileArray: File[] = !multiple ? (value ? [value] : []) : value

    async function handleOnChange(files: File[]) {
        if (files.length > 0) {
            if (isCompressed && files[0].type.includes("image")) {
                setIsCompressing(true)
                const compressedFiles = await Promise.all(
                    files.map((item) => item),
                )
                setIsCompressing(false)
                onChange(
                    multiple
                        ? [...compressedFiles, ...fileArray]
                        : compressedFiles[0],
                )
            } else {
                onChange(multiple ? [...files, ...fileArray] : files[0])
            }
        }
    }

    function onPaste(e: React.ClipboardEvent<HTMLDivElement>) {
        if (e.clipboardData.files.length) {
            handleOnChange([e.clipboardData.files[0]])
        }
    }

    return (
        <fieldset
            className={cn("flex flex-col  min-w-48 w-full", wrapperClassName)}
        >
            {label && (
                <FieldLabel isError={!!fieldState.error} required={required}>
                    {label}
                </FieldLabel>
            )}
            {isPaste && (
                <Input
                    {...field}
                    onPaste={onPaste}
                    tabIndex={0}
                    placeholder="(CTRL+V)"
                    fullWidth
                />
            )}

            <FileUploader
                classes={cn(
                    "!h-20 !w-full !outline-none !border-primary mt-0 flex justify-center items-center gap-3 [&_path]:!fill-primary [&_div]:flex-col [&_div]:!justify-center [&_div]:items-center [&_div]:!grow-0",
                    !!fieldState.error &&
                        "!border-destructive [&_path]:!fill-destructive",
                    field.disabled &&
                        "!border-muted-foreground [&_path]:!fill-muted-foreground pointer-events-none cursor-not-allowed",
                )}
                handleChange={
                    field.disabled
                        ? undefined
                        : (val: FileType<typeof multiple>) => {
                              if (multiple) {
                                  handleOnChange(
                                      Array.from((val as FileList) || []),
                                  )
                              } else {
                                  handleOnChange([val as File])
                              }
                          }
                }
                multiple={multiple}
                name={field.name}
                label={label}
            />

            {fieldState.error && !hideError && (
                <FieldError>{fieldState.error?.message}</FieldError>
            )}

            <article className={fileArray?.length ? "space-y-3 pt-4" : ""}>
                {isCompressing && (
                    <div className="grid place-items-center pb-3">
                        <Spinner />
                    </div>
                )}
                <div className={fileArray.length ? "pb-3" : ""}>
                    {fileArray.map((file, index) => {
                        if (!(file instanceof File)) {
                            return null
                        }
                        const url = URL.createObjectURL(file)
                        return (
                            <main
                                key={index}
                                className="flex items-center justify-between gap-4"
                            >
                                <a
                                    className="text-blue-500 line-clamp-1 break-all"
                                    target="_blank"
                                    href={url}
                                    rel="noreferrer noopener"
                                >
                                    {file.name}
                                </a>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="!text-destructive"
                                    icon={<X width={18} />}
                                    onClick={() =>
                                        onChange(
                                            fileArray.filter(
                                                (_, i) => i !== index,
                                            ),
                                        )
                                    }
                                    disabled={field.disabled}
                                />
                            </main>
                        )
                    })}
                </div>
                {fileArray.length > 1 && (
                    <div className="grid place-items-end">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => onChange([])}
                            disabled={field.disabled}
                        >
                            Tozalash
                        </Button>
                    </div>
                )}
            </article>
        </fieldset>
    )
}
