import { ProductI } from "./product"

export interface WishResponse {
  status: string
  count: number
  data: ProductI[]
}


