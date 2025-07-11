import { Fragment, useEffect, useState } from "react"
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

const DashboardPage = () => {
    const dateFormat = "yyyy-MM-dd"
    const today = new Date()
    const navigate = useNavigate()
    const [searchRange, setSearchRange] = useState<number>(7)
    const search = useSearch({
        from: "/_main",
    }) as any

    const { data: dataDST, isLoading: isLoadingDST } =
        useGet<DSTCountryLogsTypeResults>(DSTCOUNTRY, {
            params: search,
        })

    const { data: dataServicesCount, isLoading: isLoadingServicesCount } =
        useGet<ServicesCountTypeResult>(SERVICESCOUNT, {
            params: search,
        })

    const { data: dataDaily, isLoading: isLoadingDaily } =
        useGet<DailyLogsTypeResults>(DAILYLOGS, {
            params: {
                range: search?.range || 7,
            },
        })

    function countryToColor(country: string): string {
        let hash = 0
        for (let i = 0; i < country.length; i++) {
            hash = country.charCodeAt(i) + ((hash << 5) - hash)
        }

        const hue = Math.abs(hash) % 360

        const saturation = 65 + (Math.abs(hash) % 25)
        const lightness = 45 + ((hash >> 3) % 20)

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const chartDataDST = Object.entries(dataDST?.log || {}).map(
        ([country, visitors]) => ({
            country,
            visitors,
            fill: countryToColor(country),
        }),
    )

    const chartConfigDST = {
        visitors: { label: "Visitors" },
        ...Object.keys(dataDST?.log || {}).reduce((acc, country) => {
            acc[country] = {
                label: country,
                color: countryToColor(country),
            }
            return acc
        }, {} as Record<string, { label: string; color: string }>),
    }

    const chartDataServicesCount = Object.entries(
        dataServicesCount?.log || {},
    ).map(([services, count]) => ({
        services: services,
        visitors: count,
    }))

    const chartConfigServicesCount = {
        visitors: {
            label: "Services",
            color: "var(--chart-2)",
        },
        label: {
            color: "var(--background)",
        },
    }

    const chartDataDaily = Object.entries(dataDaily?.log || {}).map(
        ([date, count]) => ({
            date: format(new Date(date), dateFormat),
            count,
        }),
    )

    const filteredData = chartDataDaily.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2025-08-30")
        let daysToSubtract = 90
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

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
                <Card className="flex flex-col lg:col-span-2">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-center">
                            Loglarning malakatlar bo'yicha taqsimoti
                        </CardTitle>
                        <CardDescription>{`${search?.startDate} => ${search?.endDate}`}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfigDST}
                            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] pb-0"
                        >
                            <PieChart>
                                <ChartTooltip
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartDataDST}
                                    dataKey="visitors"
                                    label
                                    nameKey="country"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Amerika eng yuqori ko'rsatkichga ega.
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground leading-none">
                            {`${search?.startDate} => ${search?.endDate}`}{" "}
                            oralig'idagi mamlakatlarning loglari soni
                        </div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="items-center">
                        <CardTitle className="text-center">
                            Loglardagi xizmatlarning sonlari
                        </CardTitle>
                        <CardDescription>{`${search?.startDate} => ${search?.endDate}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfigServicesCount}>
                            <BarChart
                                accessibilityLayer
                                data={chartDataServicesCount}
                                layout="vertical"
                                margin={{
                                    right: 16,
                                }}
                            >
                                <CartesianGrid horizontal={false} />
                                <YAxis
                                    dataKey="services"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        value.toString().slice(0, 3)
                                    }
                                    hide
                                />
                                <XAxis dataKey="visitors" type="number" hide />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="line" />
                                    }
                                />
                                <Bar
                                    dataKey="visitors"
                                    layout="vertical"
                                    fill="#8884d8"
                                    radius={4}
                                >
                                    <LabelList
                                        dataKey="visitors"
                                        position="right"
                                        offset={8}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-center gap-2 text-sm">
                        <div className="flex gap-2 items-center leading-none font-medium">
                            HTTPS xizmati eng yuqori ko'rsatkichga ega.
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground items-center leading-none">
                            {`${search?.startDate} => ${search?.endDate}`}{" "}
                            oraliqdagi jami {chartDataServicesCount.length} ta
                            xizmatning diagramasi
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <Card className="pt-0">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1 mb-2 sm:mb-0">
                        <CardTitle className="text-center">
                            Kunlik loglar
                        </CardTitle>
                    </div>
                    <ParamCombobox
                        options={Array.from({ length: 100 }, (_, i) => ({
                            range: i + 1,
                        }))}
                        valueKey="range"
                        labelKey="range"
                        label="Oxirgi 7 kunlik"
                        paramName="range"
                        className="w-full sm:w-[300px]  "
                        onSearchChange={(val) => {
                            setSearchRange(Number(val))
                        }}
                    />
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[300px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient
                                    id="fillDesktop"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop offset="5%" stopOpacity={0.8} />
                                    <stop offset="95%" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(
                                                value,
                                            ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="count"
                                type="natural"
                                fill="#1eec17"
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
}

export default DashboardPage
