import PageLayout from "@/layouts/page-layout"
import { AllLogsPages } from "@/pages/logs"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/logs")({
    component: () => (
        <PageLayout title="Loglar">
            <AllLogsPages />
        </PageLayout>
    ),
})
