import qs from 'query-string'

import { Product } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class ProductService extends CMSService {
  static queryKeys = {
    list: (params?:  QueryParams<Product>) => ['/products', params],
  }

  list = (params?: QueryParams<Product>) => {
    const url = qs.stringifyUrl({
      url: `${this.baseURL}/products`,
      query: params as any,
    })
    return fetch(url, {
      headers: this.headers,
    }).then((res) => res.json() as Promise<QueryResponse<Product>>)
  }
}
