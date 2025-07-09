import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Link, useNavigate } from "@tanstack/react-router"
import { LogOut, User } from "lucide-react"
import { ThemeColorToggle } from "./color-toggle"
import { SidebarTrigger } from "../ui/sidebar"
import { ReactNode } from "react"

type Props = {
    title?: string
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
}
const Header = ({ rigthChildren, leftChildren, title }: Props) => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate({ to: "/auth" })
        localStorage.removeItem("token")
        localStorage.clear()
        localStorage.removeItem("refresh")
    }

    return (
        <header className="py-2 pr-3 pl-2 gap-4 dark:border-b  flex items-center justify-between bg-card max-w-full box-border">
            <div className="flex gap-6 items-center  max-w-full  custom-scrollbar">
                <div className="flex gap-3 items-center sm:min-w-[180px]">
                    <SidebarTrigger className="text-gray-500 dark:text-white" />
                    <Link
                        to="/"
                        className="text-2xl text-primary  font-bold sm:block hidden"
                    >
                        LOGlar
                    </Link>
                </div>
                {title ?? (
                    <p className="text-gray-500 dark:text-white">{title}</p>
                )}
                {leftChildren ? leftChildren : null}
            </div>
            <hgroup className="flex items-center gap-4">
                {rigthChildren ? rigthChildren : null}
                <ThemeColorToggle />
                <DropdownMenu>
                    <div className="relative h-10">
                        <DropdownMenuTrigger className="!outline-none">
                            <Avatar className="relative overflow-hidden">
                                <AvatarImage
                                    src={undefined}
                                    alt="user img"
                                    className="object-cover"
                                />
                                <AvatarFallback className="!bg-primary/10 font-bold !text-primary hover:!bg-primary/5">
                                    OF
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            asChild
                        >
                            <Link to="/">
                                <User width={16} /> Oripov Faxriddin
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2 !text-red-500"
                            onClick={handleLogOut}
                        >
                            <LogOut width={16} /> Chiqish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </hgroup>
        </header>
    )
}

export default Header
