type SortedIpLogType = LogsTypes & Time

type SortedIpLogTypeResults = Result & {
    log: {
        content: SortedIpLogType[]
    } & PageableInfo
}
