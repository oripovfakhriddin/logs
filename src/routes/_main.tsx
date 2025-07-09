import {
    createFileRoute,
    Outlet,
    useLocation,
    useNavigate,
} from "@tanstack/react-router"
import { useEffect } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { getAccessToken } from "@/lib/get-token"

export const Route = createFileRoute("/_main")({
    component: MainLayout,
})

function MainLayout() {
    const pathname = useLocation().pathname
    const navigate = useNavigate()
    const token = getAccessToken()

    useEffect(() => {
        if (!token) {
            navigate({ to: "/auth" })
        }
    }, [pathname])

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout
