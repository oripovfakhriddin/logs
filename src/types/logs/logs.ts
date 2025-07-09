type LogsTypes = {
    id: string
    date: string
    time: string
    eventTime: number
    tz: string
    logId: string
    type: string
    subType: string
    level: string
    vd: string
    identifier: null | number
    srcIP: string
    srcName: string
    srcPort: number
    srcIntf: string
    srcIntfRole: string
    dstIP: string
    dstPort: number
    dstIntf: string
    dstIntfRole: string
    srcCountry: string
    dstCountry: string
    sessionId: number
    proto: number
    action: string
    policyId: number
    policyType: string
    polUUID: string
    policyName: string
    service: string
    tranDisP: string
    transIP: string
    transport: number
    duration: number
    sentByte: number
    rcvdbyte: number
    sentPkt: number
    rcvdPkt: number
    appCat: string
    utmAction: null | string
    countWeb: null | number
    srchwVendor: string
    osName: string
    srcswVersion: string
    masterSrcMac: string
    srcMac: string
    srcserver: number
}

type LogsTypeResults = Result & {
    log: {
        content: LogsTypes[]
    } & PageableInfo
}
