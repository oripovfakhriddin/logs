import React, { useState } from "react"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart"
import { Area, CartesianGrid, XAxis, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ParamCombobox } from "../as-params/combobox"

const LineChartCustom = ({
    chartData,
}: {
    chartData: { date: string; count: number }[]
}) => {
    const [searchRange, setSearchRange] = useState<number>(7)
    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2025-08-30")
        let daysToSubtract = 90
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
    }
    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 mb-2 sm:mb-0">
                    <CardTitle className="">Kunlik loglar</CardTitle>
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
    )
}

export default LineChartCustom
