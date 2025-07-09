import PageLayout from "@/layouts/page-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
    component: () => (
        <PageLayout title="Dashboard">
            <h1 className="text-2xl font-bold">Loglar Bosh Sahifasi</h1>
        </PageLayout>
    ),
})
