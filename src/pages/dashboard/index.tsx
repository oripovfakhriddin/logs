import { lazy, Suspense, useMemo } from "react"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

import { DAILYLOGS, DSTCOUNTRY, SERVICESCOUNT } from "@/constants/api-endpoints"

import { format } from "date-fns"
import ParamDateRange from "@/components/as-params/date-picker-range"
const PieChartCustom = lazy(() => import("@/components/charts/pie-chart"))
const BarChartCustom = lazy(() => import("@/components/charts/bar-chart"))
const LineChartCustom = lazy(() => import("@/components/charts/line-chart"))

const DashboardPage = () => {
    const dateFormat = "yyyy-MM-dd"
    const today = new Date()
    const search = useSearch({
        from: "/_main",
    }) as any

    const { data: dataDST, isLoading: isLoadingDST } =
        useGet<DSTCountryLogsTypeResults>(DSTCOUNTRY, {
            params: {
                startDate: search?.startDate,
                endDate: search?.endDate,
            },
        })

    const { data: dataServicesCount, isLoading: isLoadingServicesCount } =
        useGet<ServicesCountTypeResult>(SERVICESCOUNT, {
            params: {
                startDate: search?.startDate,
                endDate: search?.endDate,
            },
        })

    const { data: dataDaily, isLoading: isLoadingDaily } =
        useGet<DailyLogsTypeResults>(DAILYLOGS, {
            params: {
                range: search?.range || 7,
            },
        })

    const chartDataServicesCount = useMemo(() => {
        return Object.entries(dataServicesCount?.log || {}).map(
            ([services, count]) => ({ services, count }),
        )
    }, [dataServicesCount])

    const chartDataDaily = useMemo(() => {
        return Object.entries(dataDaily?.log || {}).map(([date, count]) => ({
            date: format(new Date(date), dateFormat),
            count,
        }))
    }, [dataDaily])

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className=" flex flex-col gap-4 sm:flex-row items-center justify-between">
                    <CardTitle className="text-center">
                        Oraliqni o'zgartirish orqali barcha statistikalarni
                        yangilashingiz mumkin.
                    </CardTitle>
                    <ParamDateRange
                        className="w-full sm:w-auto"
                        from="startDate"
                        to="endDate"
                        defaultValue={{
                            from: new Date(
                                today.getTime() - 24 * 60 * 60 * 1000,
                            ),
                            to: today,
                        }}
                    />
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 gap-4  lg:grid-cols-3  mb-4">
                <Suspense fallback={<div>Yuklanmoqda...</div>}>
                    <PieChartCustom data={dataDST} />
                </Suspense>
                <Suspense fallback={<div>Yuklanmoqda...</div>}>
                    <BarChartCustom chartData={chartDataServicesCount} />
                </Suspense>
            </div>
            <Suspense fallback={<div>Yuklanmoqda...</div>}>
                <LineChartCustom chartData={chartDataDaily} />
            </Suspense>
        </div>
    )
}

export default DashboardPage
