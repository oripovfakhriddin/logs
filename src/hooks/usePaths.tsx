import {
    LayoutGrid,
    ScrollText,
} from "lucide-react"
import { ReactNode } from "react"

export interface MenuItem {
    label: string
    icon?: ReactNode
    path: string
}

export const items: MenuItem[] = [
    {
        label: "Dashboard",
        icon: <LayoutGrid width={20} />,
        path: "/",
    },
    {
        label: "Loglar",
        icon: <ScrollText width={20} />,
        path: "/logs",
    },
]
