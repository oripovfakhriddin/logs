type Pageable = {
    pageNumber: number
    pageSize: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
}

type PageableInfo = {
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    first: boolean
    numberOfElements: number
    empty: boolean
}
