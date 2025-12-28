import { BrandI } from "./brand"
import { CategoryI } from "./category"
import { SubcategoryI } from "./subCategory"

export interface ProductI {
  sold: number | null
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  priceAfterDiscount: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}



