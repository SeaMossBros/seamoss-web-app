import { CartItem } from "./CartItem"
import { QueryResponse, WithMetadata } from "./QueryResponse"

export interface Cart {
  id: number
  cart_items: QueryResponse<Array<WithMetadata<CartItem>>>
}