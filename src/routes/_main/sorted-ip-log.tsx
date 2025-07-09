import { createFileRoute } from "@tanstack/react-router"
import PageLayout from "@/layouts/page-layout"
import SortedIpLogPage from "@/pages/sorted-ip-log"

export const Route = createFileRoute("/_main/sorted-ip-log")({
    component: () => (
        <PageLayout>
            <SortedIpLogPage />
        </PageLayout>
    ),
})
