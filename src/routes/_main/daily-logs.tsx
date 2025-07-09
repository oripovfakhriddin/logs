import PageLayout from "@/layouts/page-layout"
import DailyLogsPage from "@/pages/daily-logs"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/daily-logs")({
    component: () => (
        <PageLayout>
            <DailyLogsPage />
        </PageLayout>
    ),
})
