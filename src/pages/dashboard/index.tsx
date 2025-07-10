import { Fragment, useState } from "react"
import { useSearch } from "@tanstack/react-router"
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

const DashboardPage = () => {
    const [timeRange, setTimeRange] = useState("90d")
    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2025-08-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    const search = useSearch({
        from: "/_main",
    }) as any

    const { data: dataDST, isLoading: isLoadingDST } =
        useGet<DSTCountryLogsTypeResults>(DSTCOUNTRY, {
            params: {
                ...search,
                startTime: "2025-07-01",
                endDate: "2025-07-03",
            },
        })

    const { data: dataServicesCount, isLoading: isLoadingServicesCount } =
        useGet<ServicesCountTypeResult>(SERVICESCOUNT, {
            params: {
                ...search,
                startDate: "2025-07-01",
                endDate: "2025-07-03",
            },
        })

    const { data: dataDaily, isLoading: isLoadingDaily } =
        useGet<DailyLogsTypeResults>(DAILYLOGS, {
            params: {
                ...search,
                startDate: "2025-07-01",
                endDate: "2025-07-03",
            },
        })

    console.log("dataDaily", dataDaily)

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

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4  lg:grid-cols-3  mb-4">
                <Card className="flex flex-col lg:col-span-2">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>
                            Loglarning malakatlar bo'yicha taqsimoti
                        </CardTitle>
                        <CardDescription>{`2025-07-01 => 2025-07-03`}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfigDST}
                            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[500px] pb-0"
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
                            {`2025-07-01 => 2025-07-03`}dagi mamlakatlarning
                            loglari soni
                        </div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="items-center">
                        <CardTitle>Loglardagi xizmatlarning sonlari</CardTitle>
                        <CardDescription>{`2025-07-01 => 2025-07-03`}</CardDescription>
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
                            {`2025-07-01 => 2025-07-03`} oraliqdagi jami 7 ta
                            xizmatning diagramasi
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <Card className="pt-0">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1">
                        <CardTitle>Daily Logs</CardTitle>
                        <CardDescription>
                            Bu diagrama{" "}
                            {timeRange === "90d"
                                ? "Oxirgi 3 oy"
                                : timeRange === "30d"
                                ? "Oxirgi 30 kun"
                                : "Oxirgi 7 kun"}
                            {"ni "}
                            ko'rsatmoqda.
                        </CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Oxirgi 3 oy
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Oxirgi 30 kun
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Oxirgi 7 kun
                            </SelectItem>
                        </SelectContent>
                    </Select>
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

const chartData = [
    { date: "2025-06-01", count: 97 },
    { date: "2025-06-02", count: 97 },
    { date: "2025-06-03", count: 97 },
    { date: "2025-06-04", count: 97 },
    { date: "2025-06-05", count: 222 },
    { date: "2025-06-06", count: 222 },
    { date: "2025-06-07", count: 222 },
    { date: "2025-06-08", count: 222 },
    { date: "2025-06-09", count: 167 },
    { date: "2025-06-10", count: 167 },
    { date: "2025-06-11", count: 167 },
    { date: "2025-06-12", count: 167 },
    { date: "2025-06-13", count: 242 },
    { date: "2025-06-14", count: 242 },
    { date: "2025-06-15", count: 242 },
    { date: "2025-06-16", count: 242 },
    { date: "2025-06-17", count: 373 },
    { date: "2025-06-18", count: 301 },
    { date: "2025-06-19", count: 245 },
    { date: "2025-06-20", count: 409 },
    { date: "2025-06-21", count: 59 },
    { date: "2025-06-22", count: 261 },
    { date: "2025-06-23", count: 327 },
    { date: "2025-06-24", count: 292 },
    { date: "2025-06-25", count: 342 },
    { date: "2025-06-26", count: 137 },
    { date: "2025-06-27", count: 120 },
    { date: "2025-06-28", count: 138 },
    { date: "2025-06-29", count: 446 },
    { date: "2025-06-30", count: 364 },
    { date: "2025-07-01", count: 165 },
    { date: "2025-07-02", count: 293 },
    { date: "2025-07-03", count: 247 },
    { date: "2025-07-04", count: 385 },
    { date: "2025-07-05", count: 481 },
    { date: "2025-07-06", count: 498 },
    { date: "2025-07-07", count: 388 },
    { date: "2025-07-08", count: 149 },
    { date: "2025-07-09", count: 227 },
    { date: "2025-07-10", count: 293 },
    { date: "2025-07-11", count: 335 },
    { date: "2025-07-12", count: 197 },
    { date: "2025-07-13", count: 197 },
    { date: "2025-07-14", count: 448 },
    { date: "2025-07-15", count: 473 },
    { date: "2025-07-16", count: 338 },
    { date: "2025-07-17", count: 499 },
    { date: "2025-07-18", count: 315 },
    { date: "2025-07-19", count: 235 },
    { date: "2025-07-20", count: 177 },
    { date: "2025-07-21", count: 82 },
    { date: "2025-07-22", count: 81 },
    { date: "2025-07-23", count: 252 },
    { date: "2025-07-24", count: 294 },
    { date: "2025-07-25", count: 201 },
    { date: "2025-07-26", count: 213 },
    { date: "2025-07-27", count: 420 },
    { date: "2025-07-28", count: 233 },
    { date: "2025-07-29", count: 78 },
    { date: "2025-07-30", count: 340 },
    { date: "2025-07-31", count: 178 },
    { date: "2025-08-01", count: 178 },
    { date: "2025-08-02", count: 470 },
    { date: "2025-08-03", count: 103 },
    { date: "2025-08-04", count: 439 },
    { date: "2025-08-05", count: 88 },
    { date: "2025-08-06", count: 294 },
    { date: "2025-08-07", count: 323 },
    { date: "2025-08-08", count: 385 },
    { date: "2025-08-09", count: 438 },
    { date: "2025-08-10", count: 155 },
    { date: "2025-08-11", count: 92 },
    { date: "2025-08-12", count: 492 },
    { date: "2025-08-13", count: 81 },
    { date: "2025-08-14", count: 426 },
    { date: "2025-08-15", count: 307 },
    { date: "2025-08-16", count: 371 },
    { date: "2025-08-17", count: 475 },
    { date: "2025-08-18", count: 107 },
    { date: "2025-08-19", count: 341 },
    { date: "2025-08-20", count: 408 },
    { date: "2025-08-21", count: 169 },
    { date: "2025-08-22", count: 317 },
    { date: "2025-08-23", count: 480 },
    { date: "2025-08-24", count: 132 },
    { date: "2025-08-25", count: 141 },
    { date: "2025-08-26", count: 434 },
    { date: "2025-08-27", count: 448 },
    { date: "2025-08-28", count: 149 },
    { date: "2025-08-29", count: 103 },
    { date: "2025-08-30", count: 446 },
]
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
