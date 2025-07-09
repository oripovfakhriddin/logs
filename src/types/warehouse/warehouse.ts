type WarehouseType = {
    id: number;
    product:string
    volume:number
    weight:number
    customer:string
};


type WarehouseTypeResults = {
    next: string
    previous: string
    results: WarehouseType[]
    pages:number
}