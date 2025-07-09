type WithTimeType = LogsTypes & Time

type WithTimeTypeResults = Result & {
    log: {
        content: WithTimeType[]
    } & PageableInfo
}
