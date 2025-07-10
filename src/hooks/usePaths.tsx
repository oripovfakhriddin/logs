import {
    CalendarArrowUp,
    CalendarDays,
    Clock10,
    HandPlatter,
    LayoutGrid,
    School,
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
    {
        label: "Kunlik loglar",
        icon: <CalendarDays width={20} />,
        path: "/daily-logs",
    },
    {
        label: "DST country",
        icon: <School width={20} />,
        path: "/dst-country",
    },
    {
        label: "Services count",
        icon: <HandPlatter width={20} />,
        path: "/services-count",
    },
]
