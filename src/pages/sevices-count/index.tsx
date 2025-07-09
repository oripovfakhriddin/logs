import { SERVICESCOUNT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"

const ServicesCountPage = () => {
    const { search } = useSearch({ from: "/_main/services-count" }) as any
    const { data, isLoading } = useGet<ServicesCountTypeResult>(SERVICESCOUNT, {
        params: { ...search },
    })

    console.log(data)
    return <div>ServicesCountPage</div>
}

export default ServicesCountPage
