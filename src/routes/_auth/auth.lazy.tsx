import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { LOGIN } from "@/constants/api-endpoints"
import { setAccessToken, setRefreshToken } from "@/lib/set-token"
import { createLazyFileRoute } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { usePost } from "@/hooks/usePost"

type Form = {
    username: string
    password: string
}

export const Route = createLazyFileRoute("/_auth/auth")({
    component: AuthComponent,
})


function AuthComponent() {
    const { error, mutate, isError, isPending } = usePost({
        onSuccess: (data) => {
            const access = data?.access
            const refresh = data?.refresh

            if (access) {
                setAccessToken(access)
                toast.success("Muvaffaqiyatli tizimga kirdingiz!")
            }
            if (refresh) {
                setRefreshToken(refresh)
            }
            window.location.replace("/")
        },
    })
    const methods = useForm<Form>({
        disabled: isPending,
    })

    const onSubmit = methods.handleSubmit((vals) => {
        mutate(LOGIN, vals)
    })

    return (
        <form
            onSubmit={onSubmit}
            className="max-w-md m-auto h-screen p-4 rounded-sm flex justify-center flex-col gap-4"
        >
            <FormInput
                methods={methods}
                name="username"
                label="Login"
                required
                autoComplete="on"
            />
            <FormInput
                methods={methods}
                name="password"
                type="password"
                label="Parol"
                required
                autoComplete="on"
            />
            <Button type="submit" loading={isPending}>
                Kirish
            </Button>

            {isError && (
                <p className="text-destructive text-center">
                    {error?.response?.data?.detail}
                </p>
            )}
        </form>
    )
}
