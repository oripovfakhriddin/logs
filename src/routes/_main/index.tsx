import PageLayout from "@/layouts/page-layout"
import DashboardPage from "@/pages/dashboard"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
    component: () => (
        <PageLayout title="Dashboard">
            <DashboardPage />
        </PageLayout>
    ),
})
