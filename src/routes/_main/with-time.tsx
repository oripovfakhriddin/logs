import PageLayout from "@/layouts/page-layout"
import WithTimePage from "@/pages/with-time"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/with-time")({
    component: () => (
        <PageLayout>
            <WithTimePage />
        </PageLayout>
    ),
})
