import PageLayout from "@/layouts/page-layout"
import DstCountryPage from "@/pages/dst-country"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/dst-country")({
    component: () => (
        <PageLayout>
            <DstCountryPage />
        </PageLayout>
    ),
})
