import { Media } from "./Media";
import { QueryResponse, WithMetadata } from "./QueryResponse";

export interface ProductVariant {
  id: number;
  createdAt: string;  updatedAt: string;  publishedAt?: string;  name: string;
  unit_price?: number;
  is_default?: boolean;
  stock?: number;
  units_per_stock?: number;
  image?: QueryResponse<WithMetadata<Media>>;
}