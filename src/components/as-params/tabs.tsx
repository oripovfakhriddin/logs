import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { PlusCircle } from "lucide-react"
import { ReactNode } from "react"
import { ClassNameValue } from "tailwind-merge"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface ParamTabsProps {
    options: Array<{
        value: string | number
        label: React.ReactNode | string | number
        content?: React.ReactNode
        badge?: number
        className?: ClassNameValue
        disabled?: boolean
    }>
    paramName?: string
    disabled?: boolean
    onAdd?: () => void
    dontCleanOthers?: boolean
    right?: ReactNode
    is_visible?: boolean
    onValueChange?: (val: string) => void
}

const ParamTabs: React.FC<ParamTabsProps> = ({
    options,
    paramName = "page_tabs",
    disabled = false,
    onAdd,
    dontCleanOthers = true,
    right,
    is_visible = true,
    onValueChange,
}) => {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const currentTab = search[paramName] || options[0]?.value

    const handleTabChange = (tab: string) => {
        onValueChange?.(tab)
        if (tab === "add") {
            onAdd?.()
        } else {
            if (disabled || tab === currentTab) return
            dontCleanOthers
                ? navigate({ search: { ...search, [paramName]: tab } as any })
                : navigate({ search: { [paramName]: tab } as any })
        }
    }

    if (!is_visible) return null
    return (
        <Tabs
            value={currentTab}
            onValueChange={handleTabChange}
            className={options?.[0]?.content ? "space-y-4 w-full " : ""}
        >
            <div className="max-w-full overflow-x-auto  flex flex-wrap items-center justify-between gap-4">
                <TabsList className="h-10 flex gap-3 ">
                    {options.map(
                        (option) =>
                            !option.disabled && (
                                <TabsTrigger
                                    key={option.value}
                                    value={option.value?.toString()}
                                    className={`cursor-pointer   relative px-4 ${option.className}`}
                                    aria-current={
                                        option.value === currentTab
                                            ? "page"
                                            : undefined
                                    }
                                    disabled={disabled}
                                >
                                    {option.label}
                                    {!!option.badge && (
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "rounded-full absolute -top-3.5 -right-3.5 border-2 border-background",
                                                search[paramName] ==
                                                    option.value &&
                                                    "!bg-primary !text-primary-foreground",
                                            )}
                                        >
                                            {option.badge}
                                        </Badge>
                                    )}
                                </TabsTrigger>
                            ),
                    )}
                    {!!onAdd && (
                        <TabsTrigger value="add" asChild>
                            <Button
                                icon={<PlusCircle width={18} />}
                                variant="ghost"
                                className="!text-primary h-8"
                            />
                        </TabsTrigger>
                    )}
                </TabsList>
                {right}
            </div>
            {options.map(
                (option) =>
                    !option.disabled &&
                    option.content && (
                        <TabsContent
                            key={option.value}
                            value={option.value?.toString()}
                        >
                            {option.content}
                        </TabsContent>
                    ),
            )}
        </Tabs>
    )
}

export default ParamTabs
