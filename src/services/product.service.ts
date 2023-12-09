import qs from 'qs'

import { Product, Product_Plain } from '@/types/Product'
import { ProductReview, ProductReview_NoRelations } from '@/types/ProductReview'
import { ProductVariant, ProductVariant_Plain } from '@/types/ProductVariant'
import { PurchaseOption, PurchaseOption_Plain } from '@/types/PurchaseOption'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class ProductService extends CMSService {
  static queryKeys = {
    list: (params?: QueryParams<Product_Plain>) => ['/products', params],
    getBySlug: (slug: string, params?: QueryParams<Product_Plain>) => [
      '/slugify/slugs/product',
      slug,
      params,
    ],
    getProductReviews: (params: QueryParams<ProductReview_NoRelations>) => [
      '/product-reviews',
      params,
    ],
  }

  list = async (params?: QueryParams<Product_Plain>) => {
    const url = `${this.baseURL}/products`
    const search = qs.stringify(params)
    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
      cache: 'no-store',
    })
    return await (res.json() as Promise<QueryResponse<Array<Product>>>)
  }

  getBySlug = (slug: string, params?: QueryParams<Product_Plain>) => {
    const url = `${this.baseURL}/slugify/slugs/product/${slug}`
    const search = qs.stringify(params)

    return fetch(`${url}?${search}`, {
      headers: this.headers,
      cache: 'no-store',
    }).then((res) => res.json()) as Promise<QueryResponse<Product>>
  }

  getVariantById = async (id: number, params?: QueryParams<ProductVariant_Plain>) => {
    const url = `${this.baseURL}/product-variants/${id}`
    const search = qs.stringify(params)

    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
      cache: 'no-store',
    })

    return res.json() as Promise<QueryResponse<ProductVariant>>
  }

  getPurchaseOptionById = async (id: number, params?: QueryParams<PurchaseOption_Plain>) => {
    const url = `${this.baseURL}/purchase-options/${id}`
    const search = qs.stringify(params)

    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
      cache: 'no-store',
    })

    return res.json() as Promise<QueryResponse<PurchaseOption>>
  }

  submitReview = async (
    productId: number,
    data: Omit<
      ProductReview_NoRelations,
      'product' | 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'
    >,
  ) => {
    const url = `${this.baseURL}/product-reviews`
    const payload = {
      data: {
        ...data,
        product: productId,
      },
    }

    const body = JSON.stringify(payload)

    const res = await fetch(url, {
      method: 'post',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })

    return res.json() as Promise<QueryResponse<ProductReview>>
  }

  getProductReviews = async (params: QueryParams<ProductReview_NoRelations>) => {
    const url = `${this.baseURL}/product-reviews?${qs.stringify(params)}`

    const res = await fetch(url, {
      headers: this.headers,
    })

    return res.json() as Promise<QueryResponse<ProductReview[]>>
  }
}
