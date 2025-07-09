type LogisticsType = {
    id: string
    role: number
    full_name: string
    username: string
    phone_code?: string
    phone_number: number | string
    address: string
    completed_orders?: number
    not_completed_orders: number
}

type LogisticsTypeResults = {
    next: string
    previous: string
    results: LogisticsType[]
    pages: number
}
