import { Article_NoRelations, Article_Plain } from './Article'
import { Media_Plain } from './Media'
import { Product_NoRelations, Product_Plain } from './Product'
import { PaginationOptions, Population } from './QueryParams'
import { QueryResponse } from './QueryResponse'

export type SearchPopulation = {
  products?: Population<Product_NoRelations>
  articles?: Population<Article_NoRelations>
}

export type SearchPagination = {
  products?: PaginationOptions
  articles?: PaginationOptions
}

export type SearchParams = {
  pagination?: SearchPagination
  populate?: SearchPopulation
}

export interface SearchResponse {
  articles: QueryResponse<
    Array<
      Article_Plain & {
        cover: Media_Plain
      }
    >
  >
  products: QueryResponse<
    Array<
      Product_Plain & {
        thumbnail: Media_Plain
      }
    >
  >
}
