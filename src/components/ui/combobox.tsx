import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronDown, Plus, X } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { useState } from "react"
import { Skeleton } from "./skeleton"
import { DEBOUNCETIME } from "@/constants/default"

export type ComboboxProps<T extends Record<string, any>> = {
    options: T[] | undefined
    value: string | number | null
    setValue: (val: any) => void
    onAdd?: () => void
    label: string
    disabled?: boolean
    isLoading?: boolean
    isError?: boolean
    className?: ClassNameValue
    labelKey?: keyof T
    valueKey?: keyof T
    skeletonCount?: number
    onSearchChange?: (val: string) => void
}

export function Combobox<T extends Record<string, any>>({
    options,
    value,
    setValue,
    label,
    disabled,
    onAdd,
    isError,
    labelKey = "label",
    valueKey = "value",
    className,
    isLoading,
    skeletonCount = 5,
    onSearchChange,
}: ComboboxProps<T>) {
    const [open, setOpen] = useState(false)

    const handleSelect = (option: T) => {
        const returnValue = option[valueKey]
        setValue(returnValue)
        setOpen(false)
    }

    const handleClickAdd = () => {
        onAdd ? onAdd?.() : undefined
    }

    const sortedOptions = options?.sort((a, b) => {
        const isASelected = a[valueKey] == value
        const isBSelected = b[valueKey] == value
        return isASelected === isBSelected ? 0 : isASelected ? -1 : 1
    })

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-full  justify-between bg-background   px-2 hover:bg-background font-normal text-gray-400 hover:text-gray-400",
                        value && "font-medium text-foreground",
                        isError && " border-destructive",
                        className,
                    )}
                    disabled={disabled}
                >
                    <div className="flex items-center gap-2   ">
                        <ChevronDown className=" min-h-4 min-w-4 h-4 w-4  text-primary opacity-50 " />
                        <span className="line-clamp-1 break-all">
                            {value
                                ? options
                                      ?.find((d) => d[valueKey] == value)
                                      ?.[labelKey]?.toString() || value
                                : label}
                        </span>
                    </div>
                    {onAdd && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation()
                                handleClickAdd()
                            }}
                            className="dark:bg-card bg-slate-200 hover:bg-slate-300 hover:scale-105 p-1 rounded-full"
                        >
                            <Plus className=" h-4 w-4 shrink-0  text-primary" />
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command shouldFilter={onSearchChange ? false : true}>
                    <CommandInput
                        onValueChange={(text) => {
                            if (onSearchChange) {
                                setTimeout(() => {
                                    onSearchChange(text)
                                }, DEBOUNCETIME)
                            }
                        }}
                        placeholder={label}
                    />
                    {!!value && (
                        <span className="absolute cursor-pointer text-destructive top-1.5 right-1 p-1">
                            <X
                                className="text-destructive"
                                width={16}
                                onClick={() => setValue(null)}
                            />
                        </span>
                    )}
                    <CommandList>
                        <CommandEmpty>Mavjud emas</CommandEmpty>
                        <CommandGroup>
                            {sortedOptions?.map((d, i) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => handleSelect(d)}
                                >
                                    {d[labelKey]}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value == d[valueKey]
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}

                            {isLoading ? (
                                <div className="space-y-1">
                                    {Array.from({ length: skeletonCount }).map(
                                        (_, index) => (
                                            <CommandItem
                                                key={index}
                                                className="p-0"
                                            >
                                                <Skeleton className="w-full h-7" />
                                            </CommandItem>
                                        ),
                                    )}
                                </div>
                            ) : null}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
