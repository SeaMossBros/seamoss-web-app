import { Product } from "./Product";
import { QueryResponse, WithMetadata } from "./QueryResponse";

export interface CartItem {
  product: QueryResponse<WithMetadata<Product>>
  quantity: number
}