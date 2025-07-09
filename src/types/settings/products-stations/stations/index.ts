type StationsType = {
    id: number
    name: string
}

type StationsResults = {
    next: string
    previous: string
    results: StationsType[]
    pages:number
}

type SearchParamsStation = {
  station_search?: string
  station_page_size?: number
  station_page?: number
}