import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { useSearch } from "@tanstack/react-router"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { TrendingUp } from "lucide-react"

const BarChartCustom = React.memo(
    ({ chartData }: { chartData: { services: string; count: number }[] }) => {
        const search = useSearch({ from: "/_main" }) as any

        const chartConfig = {
            count: {
                label: "Services",
                color: "var(--chart-2)",
            },
            label: {
                color: "var(--background)",
            },
        }
        return (
            <Card>
                <CardHeader className="items-center">
                    <CardTitle className="text-center">
                        Loglardagi xizmatlarning sonlari
                    </CardTitle>
                    <CardDescription>{`${search?.startDate} => ${search?.endDate}`}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
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
                            <XAxis dataKey="count" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <Bar
                                dataKey="count"
                                layout="vertical"
                                fill="#8884d8"
                                radius={4}
                            >
                                <LabelList
                                    dataKey="count"
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
                    <div className="text-muted-foreground items-center text-center leading-none">
                        {`${search?.startDate} => ${search?.endDate}`}{" "}
                        oraliqdagi jami {chartData.length} ta xizmatning
                        diagramasi
                    </div>
                </CardFooter>
            </Card>
        )
    },
)

BarChartCustom.displayName = "BarChartCustom"

export default BarChartCustom
