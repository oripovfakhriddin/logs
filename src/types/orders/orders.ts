
type OrderType = {
  agent: string | null;
  is_late: boolean
  comment: string;
  container_type: number;
  created_at: string;
  currency: string | null;
  customers: string[];
  address_text: string;
  region: number;
  hint: string | null;
  id: number;
  load_date: string;
  type: number;
  price: number | string | null;
  condition: number;
  start_date: string | null;
  station: string | null;
  status: number | string;
  team_id: string;
  total_spent: number | string;
  transport: number;
  transport_number: string | null;
  updated_at: string;
};


type OrdersTypeResults = {
  results: OrderType[]
  next: string
  count: number
  previous: string
  pages: number
}

type OfferAgent = {
  id: number;
  role: number;
  username: string;
  full_name: string;
  phone_code: string;
  phone_number: string;
  address: string | null;
  region: string | null;
  completed_orders: number;
  in_completed_orders: number;
};

type Offers = {
  id: number;
  agent_name: string;
  station_name: string
  completion_percentage?: number
  load_date: string | null;
  start_date: string | null;
  price: number | null;
  currency: number;
  status: number;
  container: number;
  is_station_required: boolean
}



type OffersTypeResults = {
  results: Offers[]
  next: string
  previous: string
  pages: number
}



type Logs = {
  id: number
  status: number
  agent: string
  changed_at: string
  reason: string
}

type Expanse = {
  id: number
  agent: number
  currency: number
  amount: number
  agent_name: string
  reason: string
  created_at: string
  updated_at: string
}

type OrderDocument = {
  id: number
  file: string
  file_url?:string
  created_at: string
  description: string
}

type CarType = {
  id: number,
  product: string
  volume: number,
  total_weight: number,
  customer: string
  transit_number: string
  product_count: number
}





type ApiProduct = {
  id: number
  name: string
  code: string
}

type ApiCustomer = {
  id: number
  username: string
  full_name: string
  phone_code: string
  phone_number: string
}

type ApiLoad = {
  id?: number
  customer?: number | null
  unit_amount?:string
  product?: number | null
  volume?: number | null
  weight?: number | null
  address_text?: string
  comment?: string | null
  address_url?: string
}

type ApiRegion = {
  id: number
  name: string
  country: {
    id: number
    name: string
  }
}

type ApiCargoResponse = {
  id: number
  loads: ApiLoad[]
  transport_number: number | null
  container_number: number | null
  region: number
  agent: number | null
  agents: number[]
  container_type: number | null
  transport: number | null
  load_date: string
  address_text: string
  condition: number | null
  comment: string | null
  accepted_offer: {
    full_name: string
    price: number
    currency: number
  }

}

type OffersCreate = {
  agent_id?: number;
  currency?: string | null;
  load_date: string | null;
  station?: number
  price?: number | null;
  start_date: string | null;
}
