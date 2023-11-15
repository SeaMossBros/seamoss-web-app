import qs from 'qs'

import { Product } from '@/types/Product'
import { ProductVariant } from '@/types/ProductVariant'
import { PurchaseOption } from '@/types/PurchaseOption'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse, WithMetadata } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class ProductService extends CMSService {
  static queryKeys = {
    list: (params?: QueryParams<Product>) => ['/products', params],
    getBySlug: (slug: string, params?: QueryParams<Product>) => [
      '/slugify/slugs/product',
      slug,
      params,
    ],
  }

  list = async (params?: QueryParams<Product>) => {
    const url = `${this.baseURL}/products`
    const search = qs.stringify(params)
    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
    })
    return await (res.json() as Promise<QueryResponse<Array<WithMetadata<Product>>>>)
  }

  getBySlug = (slug: string, params?: QueryParams<Product>) => {
    const url = `${this.baseURL}/slugify/slugs/product/${slug}`
    const search = qs.stringify(params)

    return fetch(`${url}?${search}`, {
      headers: this.headers,
    }).then((res) => res.json()) as Promise<QueryResponse<WithMetadata<Product>>>
  }

  getVariantById = async (id: number, params?: QueryParams<ProductVariant>) => {
    const url = `${this.baseURL}/product-variants/${id}`
    const search = qs.stringify(params)

    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
    })

    return res.json() as Promise<QueryResponse<WithMetadata<ProductVariant>>>
  }

  getPurchaseOptionById = async (id: number, params?: QueryParams<PurchaseOption>) => {
    const url = `${this.baseURL}/purchase-options/${id}`
    const search = qs.stringify(params)

    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
    })

    return res.json() as Promise<QueryResponse<WithMetadata<PurchaseOption>>>
  }
}
