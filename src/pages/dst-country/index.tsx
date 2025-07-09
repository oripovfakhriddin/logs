import { DSTCOUNTRY } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"

const DstCountryPage = () => {
    const search = useSearch({
        from: "/_main/dst-country",
    }) as any

    const { data, isLoading } = useGet<DSTCountryLogsType>(DSTCOUNTRY, {
        params: { ...search },
    })

    console.log(data)

    return <div>DstCountryPage</div>
}

export default DstCountryPage
