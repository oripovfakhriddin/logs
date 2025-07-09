type ContainerType = {
    id: number
    name: string
}

type ContainerResults = {
    next: string
    previous: string
    results: ContainerType[]
    pages:number
}

type SearchParamsContainer = {
  container_search?: string
  container_page_size?: number
  container_page?: number
}