import { CartItem } from "./cart"
import { UserI } from "./user"

export interface OrderI {
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: UserI
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}





