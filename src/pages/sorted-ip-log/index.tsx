import { SORTEDIPLOG } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"

const SortedIpLogPage = () => {
    const { search } = useSearch({ from: "/_main/sorted-ip-log" }) as any

    const { data, isLoading } = useGet<SortedIpLogTypeResults>(SORTEDIPLOG, {
        params: { ...search },
    })
    console.log(data)

    return <div>SortedIpLogPage</div>
}

export default SortedIpLogPage
