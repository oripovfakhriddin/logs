import React from "react"
import {
    Select as Select2,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select2"
import { ClassNameValue } from "tailwind-merge"
export default function Select<T extends Record<string, any>>({
    value,
    setValue,
    options,
    label,
    className,
    disabled,
    labelKey="label",
    valueKey="value",
}: thisProps<T>) {
    return (
        <Select2
            disabled={disabled}
            value={value?.toString()}
            onValueChange={setValue}
        >
            <SelectTrigger className={`w-full bg-background ${className}`}>
                <SelectValue className={`${className}`} placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.map((s, i) => (
                        <SelectItem
                            key={i}
                            value={s[valueKey as keyof T]?.toString()}
                        >
                            {s[labelKey as keyof T]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select2>
    )
}

interface thisProps<T extends Record<string, any>> {
    value: string | number | null
    setValue: React.Dispatch<React.SetStateAction<string>>
    options: T[]
    label: string
    className?: ClassNameValue
    disabled?: boolean
    labelKey?: keyof T
    valueKey?: keyof T
}
