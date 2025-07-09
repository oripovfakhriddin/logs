import PageLayout from "@/layouts/page-layout"
import ServicesCountPage from "@/pages/sevices-count"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/services-count")({
    component: () => (
        <PageLayout>
            <ServicesCountPage />
        </PageLayout>
    ),
})
