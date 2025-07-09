import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { items } from "@/hooks/usePaths"
import { Link } from "@tanstack/react-router"

export function NavMain() {
    return (
        <SidebarGroup className="lg:pt-[70px]">
            <SidebarGroupContent className="flex flex-col gap-2 ">
                <SidebarMenu>
                    <SidebarMenuItem className="mb-3 lg:hidden">
                        <div className="flex gap-3 items-center min-w-[180px]">
                            <SidebarTrigger className="text-gray-500 dark:text-white" />
                            <Link to="/" className="text-2xl text-primary font-bold">
                               CSEC
                            </Link>
                        </div>
                    </SidebarMenuItem>
                    {items.map((item,index) => (
                        <Link
                            key={index}
                            to={item.path}
                            activeProps={{
                                className:
                                    "[&_button]:bg-primary hover:[&_button]:bg-primary hover:[&_button]:text-primary-foreground text-primary-foreground",
                            }}
                            className="rounded-lg"
                        >
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip={item.label}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
