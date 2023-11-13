import { Media } from './Media'
import { QueryResponse, WithMetadata } from './QueryResponse'

export interface ProductProperty {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  image?: QueryResponse<WithMetadata<Media>>
}
