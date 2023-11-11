import qs from 'qs'

import { Product } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse, WithMetadata } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class ProductService extends CMSService {
  static queryKeys = {
    list: (params?:  QueryParams<Product>) => ['/products', params],
    getBySlug: (slug: string, params?: QueryParams<Product>) => ['/slugify/slugs/product', slug, params]
  }

  list = (params?: QueryParams<Product>) => {
    const url = `${this.baseURL}/products`
    const search = qs.stringify(params)
    return fetch(`${url}?${search}`, {
      headers: this.headers,
    }).then((res) => res.json() as Promise<QueryResponse<Array<WithMetadata<Product>>>>)
  }

  getBySlug = (slug: string, params?: QueryParams<Product>) => {
    const url = `${this.baseURL}/slugify/slugs/product/${slug}`
    const search = qs.stringify(params)
    
    return fetch(`${url}?${search}`, {
      headers: this.headers
    }).then(res => res.json()) as Promise<QueryResponse<WithMetadata<Product>>>
  }
}
