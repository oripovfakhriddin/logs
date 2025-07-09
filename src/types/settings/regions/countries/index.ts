type CountriesType = {
    id: number
    name: string
}

type CountriesResults = {
    next: string
    previous: string
    results: CountriesType[]
    pages:number
}

type SearchParamsCountries = {
  countries_search?: string
  countries_page_size?: number
  countries_page?: number
}