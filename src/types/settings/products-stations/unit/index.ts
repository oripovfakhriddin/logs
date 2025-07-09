type UnitType = {
    id: number
    name: string
}

type UnitResults = {
    next: string
    previous: string
    results: UnitType[]
    pages:number
}

type SearchParamsUnit = {
  unit_search?: string
  unit_page_size?: number
  unit_page?: number
}