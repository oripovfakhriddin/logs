import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Pie, PieChart } from "recharts"
import { TrendingUp } from "lucide-react"
import { useSearch } from "@tanstack/react-router"

const PieChartCustom = ({
    data,
}: {
    data: DSTCountryLogsTypeResults | undefined
}) => {
    const search = useSearch({
        from: "/_main",
    }) as {
        startDate: string
        endDate: string
    }

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

    const chartConfig = {
        visitors: { label: "Visitors" },
        ...Object.keys(data?.log || {}).reduce((acc, country) => {
            acc[country] = {
                label: country,
                color: countryToColor(country),
            }
            return acc
        }, {} as Record<string, { label: string; color: string }>),
    }

    const chartData = Object.entries(data?.log || {}).map(
        ([country, visitors]) => ({
            country,
            visitors,
            fill: countryToColor(country),
        }),
    )
    return (
        <Card className="flex flex-col lg:col-span-2">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-center">
                    Loglarning malakatlar bo'yicha taqsimoti
                </CardTitle>
                <CardDescription>{`${search?.startDate} => ${search?.endDate}`}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
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
                    {`${search?.startDate} => ${search?.endDate}`} oralig'idagi
                    mamlakatlarning loglari soni
                </div>
            </CardFooter>
        </Card>
    )
}

export default PieChartCustom
