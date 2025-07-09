import { cn } from "@/lib/utils"
import {
    Edit,
    EllipsisVertical,
    Eye,
    SquarePen,
    Trash2,
    Undo,
} from "lucide-react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

type Props = {
    menuMode?: boolean
    onEdit?: () => void
    onDelete?: () => void
    onUndo?: () => void
    onView?: () => void
    className?: string
}

export default function TableActions({
    menuMode = false,
    onEdit,
    onDelete,
    onUndo,
    onView,
    className,
}: Props) {
    return menuMode ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={className}>
                <Button
                    variant="ghost"
                    className="!text-primary size-6 "
                    size={"icon"}
                    icon={<EllipsisVertical width={16} />}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={1}>
                {onView && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onView()
                        }}
                        className="!text-green-500"
                    >
                        <Eye width={16} className="mr-1.5" />
                        Ko'rish
                    </DropdownMenuItem>
                )}
                {onEdit && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                        }}
                        className="!text-primary"
                    >
                        <Edit width={16} className="mr-1.5" />
                        Tahrirlash
                    </DropdownMenuItem>
                )}
                {onDelete && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="!text-destructive"
                    >
                        <Trash2 width={16} className="mr-1.5" /> O'chirish
                    </DropdownMenuItem>
                )}
                {onUndo && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onUndo()
                        }}
                        className="!text-destructive"
                    >
                        <Undo width={16} className="mr-1.5" /> Qaytarish
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <div
            className={cn(
                "flex items-center justify-end gap-3 py-2",
                className,
            )}
        >
            {onView && (
                <Button
                    icon={<Eye className="text-green-500" size={16} />}
                    size="sm"
                    className="p-0 h-3"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation()
                        onView()
                    }}
                ></Button>
            )}
            {onEdit && (
                <Button
                    icon={<SquarePen className="text-primary" size={16} />}
                    size="sm"
                    className="p-0 h-3"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit()
                    }}
                ></Button>
            )}
            {onDelete && (
                <Button
                    icon={<Trash2 className="text-destructive" size={16} />}
                    size="sm"
                    className="p-0 h-3"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                    }}
                ></Button>
            )}
            {onUndo && (
                <Button
                    icon={<Undo className="text-destructive" size={16} />}
                    size="sm"
                    className="p-0 h-3"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation()
                        onUndo()
                    }}
                ></Button>
            )}
        </div>
    )
}
