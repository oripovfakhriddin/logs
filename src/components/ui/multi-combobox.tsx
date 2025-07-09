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
import { useState } from "react"
import { ClassNameValue } from "tailwind-merge"
import { Skeleton } from "./skeleton"
import { DEBOUNCETIME } from "@/constants/default"

type ComboboxProps<T extends Record<string, any>> = {
    options: T[] | undefined
    values: (string | number | null)[]
    setValues: (val: any) => void
    onAdd?: () => void
    label: string
    disabled?: boolean
    isLoading?: boolean
    isError?: boolean
    className?: ClassNameValue
    labelKey?: keyof T
    skeletonCount?: number
    valueKey?: keyof T
    onSearchChange?: (val: string) => void
}
export function MultiCombobox<T extends Record<string, any>>({
    options,
    values,
    setValues,
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
        const newValue = option[valueKey]
        const updatedValues = values?.find((v) => v === newValue)
            ? values?.filter((v) => v !== newValue)
            : (values || []).concat(newValue)
        setValues(updatedValues)
        setOpen(false)
    }

    const handleClickAdd = () => {
        onAdd ? onAdd?.() : undefined
    }

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between bg-background overflow-hidden px-2 hover:bg-background font-normal text-gray-400 hover:text-gray-400",
                        values && "font-medium text-foreground",
                        isError && " border-destructive",
                        className,
                    )}
                    disabled={disabled}
                >
                    <div className="flex items-center gap-2 ">
                        <ChevronDown className=" h-4 w-4  text-primary opacity-50 " />
                        {values?.length && values?.length < 3
                            ? options
                                  ?.filter((d) => values?.includes(d[valueKey]))
                                  .map((d) => d[labelKey])
                                  .join(", ")
                            : values?.length
                            ? values?.length + " ta tanlandi"
                            : label}
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
                        className="h-10"
                    />
                    {!!values && (
                        <span className="absolute cursor-pointer text-destructive top-1.5 right-1 p-1">
                            <X
                                className="text-destructive"
                                width={16}
                                onClick={() => setValues(null)}
                            />
                        </span>
                    )}
                    <CommandList>
                        <CommandEmpty>Mavjud emas</CommandEmpty>
                        <CommandGroup className="!overflow-y-scroll">
                            {options?.map((d, i: number) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => handleSelect(d)}
                                >
                                    {d[labelKey]}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            values?.includes(d[valueKey])
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
