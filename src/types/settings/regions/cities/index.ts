type CitiesType = {
    id: number
    name: string
    country: string | number
}

type CitiesResults = {
    next: string
    previous: string
    results: CitiesType[]
    pages:number
}

type SearchParamsCities = {
  cities_search?: string
  cities_page_size?: number
  cities_page?: number
}