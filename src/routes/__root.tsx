import { Outlet, createRootRoute } from "@tanstack/react-router"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/layouts/theme"
import { ConfirmProvider } from "@/layouts/confirm"
import { PromptProvider } from "@/layouts/prompt"
import ThemeDataProvider from "@/layouts/color"
import { ModalProvider } from "@/components/provider/modal-provider"

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <ModalProvider>
            <ThemeProvider defaultTheme="light" storageKey="theme">
                <ThemeDataProvider>
                    <ConfirmProvider>
                        <PromptProvider>
                            <Outlet />
                        </PromptProvider>
                    </ConfirmProvider>
                    <Toaster position="top-right" />
                </ThemeDataProvider>
            </ThemeProvider>
        </ModalProvider>
    )
}
