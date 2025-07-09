import { DAILYLOGS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"

const DailyLogsPage = () => {
    const search = useSearch({
        from: "/_main/daily-logs",
    }) as any

    const { data, isLoading } = useGet<DailyLogsTypeResults>(DAILYLOGS, {
        params: { ...search },
    })

    console.log(data)

    return <div>DailyLogsPage</div>
}

export default DailyLogsPage
