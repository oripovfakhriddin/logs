import { ColumnDef } from "@tanstack/react-table"

export const useLogsColumns = (): ColumnDef<LogsTypes>[] => {
    return [
        {
            header: "Date",
            accessorKey: "date",
            enableSorting: true,
        },
        {
            header: "Time",
            accessorKey: "time",
            enableSorting: true,
        },
        {
            header: "srcIP",
            accessorKey: "srcIP",
            enableSorting: true,
        },
        {
            header: "srcName",
            accessorKey: "srcName",
            enableSorting: true,
        },
        {
            header: "dstIP",
            accessorKey: "dstIP",
            enableSorting: true,
        },
        {
            header: "srcCountry",
            accessorKey: "srcCountry",
            enableSorting: true,
        },
        {
            header: "dstCountry",
            accessorKey: "dstCountry",
            enableSorting: true,
        },

        {
            header: "action",
            accessorKey: "action",
            enableSorting: true,
        },

        {
            header: "sentByte",
            accessorKey: "sentByte",
            enableSorting: true,
        },
        {
            header: "rcvdbyte",
            accessorKey: "rcvdbyte",
            enableSorting: true,
        },
        {
            header: "sentPkt",
            accessorKey: "sentPkt",
            enableSorting: true,
        },
        {
            header: "rcvdPkt",
            accessorKey: "rcvdPkt",
            enableSorting: true,
        },
        {
            header: "appCat",
            accessorKey: "appCat",
            enableSorting: true,
        },
        {
            header: "osName",
            accessorKey: "osName",
            enableSorting: true,
        },
        {
            header: "srcswVersion",
            accessorKey: "srcswVersion",
            enableSorting: true,
        },
        {
            header: "masterSrcMac",
            accessorKey: "masterSrcMac",
            enableSorting: true,
        },
        {
            header: "srcserver",
            accessorKey: "srcserver",
            enableSorting: true,
        },
    ]
}
