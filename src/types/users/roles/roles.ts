type RolesType = {
    id: number
    name: string
    country: string | number
}

type RolesResults = {
    next: string
    previous: string
    results: RolesType[]
    pages: number
}

type SearchParamsRoles = {
    roles_search?: string
    roles_page_size?: number
    roles_page?: number
}
