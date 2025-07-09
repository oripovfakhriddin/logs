type ProductsType = {
  id: number
  name: string
  code: string | number
  unit_type: number
  unit_data: {
    id:number
    name:string
  }
}

type ProductResults = {
  next: string
  previous: string
  results: ProductsType[]
  pages: number
}

type SearchParamsProduct = {
  product_search?: string
  product_page_size?: number
  product_page?: number
}