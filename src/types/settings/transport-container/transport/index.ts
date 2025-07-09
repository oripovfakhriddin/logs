type TransportType = {
    id: number
    name: string
    is_station_required:boolean
}

type TransportResults = {
    next: string
    previous: string
    results: TransportType[]
    pages:number
}

type SearchParamsTransport = {
  transport_search?: string
  transport_page_size?: number
  transport_page?: number
}