import { Fragment, useState } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from "recharts"

import { DAILYLOGS, DSTCOUNTRY, SERVICESCOUNT } from "@/constants/api-endpoints"
import { TrendingUp } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select2"
import { format } from "date-fns"
import ParamDateRange from "@/components/as-params/date-picker-range"
import { time } from "console"
import { ParamCombobox } from "@/components/as-params/combobox"
import PieChartCustom from "@/components/charts/pie-chart"
import BarChartCustom from "@/components/charts/bar-chart"
import LineChartCustom from "@/components/charts/line-chart"

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

    const chartDataServicesCount = Object.entries(
        dataServicesCount?.log || {},
    ).map(([services, count]) => ({
        services,
        count,
    }))

    const chartDataDaily = Object.entries(dataDaily?.log || {}).map(
        ([date, count]) => ({
            date: format(new Date(date), dateFormat),
            count,
        }),
    )

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
                <PieChartCustom data={dataDST} />
                <BarChartCustom chartData={chartDataServicesCount} />
            </div>
            <LineChartCustom chartData={chartDataDaily} />
        </div>
    )
}

export default DashboardPage
