import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import Spinner from "./spinner"
import { CircleCheck, CircleX } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                className:
                    "shadow-sm border bg-card text-card-foreground flex items-center",
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
            {...props}
            icons={{
                loading: <Spinner size="sm" />,
                success: <CircleCheck size={20} className="text-primary" />,
                error: <CircleX size={20} className="text-destructive" />,
            }}
        />
    )
}

export { Toaster }
