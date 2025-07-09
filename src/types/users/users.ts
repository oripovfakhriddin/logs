type UsersType = {
    id: string
    role: string
    full_name: string
    username: string
    phone_number: string
    address: string
    age: string
    position: string
    picture: string
    salary: string
    gender: string
    birthdate: string
    password?:string
}
type UsersTypeResults = {
    next: string
    previous: string
    results: UsersType[]
    pages: number
}
