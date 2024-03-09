import axios from 'axios'
import qs from 'qs'

import { QueryResponse } from '@/types/QueryResponse'
import { SupportMessage, SupportMessage_Plain } from '@/types/SupportMessage'

import CMSService from './core/cms.service'

export default class APIService extends CMSService {
  static queryKeys = {
    getPriceEstimation: (...params: Parameters<APIService['getPriceEstimation']>) => [
      '/api/cart/estimations',
      JSON.stringify(params),
    ],
    getCartBillingDetails: (...params: Parameters<APIService['getCartBillingDetails']>) => [
      '/api/cart/:id/billing',
      JSON.stringify(params),
    ],
  }

  getSupportMessages = async () => {
    const url = `${this.baseURL}/support-messages`
    // console.log('url', url)
    const res = await axios(url, {
      method: 'get',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    // console.log('res', res)

    return res.data as Promise<QueryResponse<SupportMessage[]>>
  }

  submitSupportMessage = async (data: SupportMessage_Plain) => {
    const url = `${this.baseURL}/support-messages`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })

    return res.json() as Promise<QueryResponse<SupportMessage>>
  }

  getPriceEstimation = async (variantId: number, quantity: number, purchaseOptionId: number) => {
    const search = qs.stringify({
      variant: variantId,
      purchaseOption: purchaseOptionId,
      quantity,
    })

    console.log('in estimation query:')
    console.log('variantId:', variantId)
    console.log('purchaseOptionId:', purchaseOptionId)
    console.log('quantity:', quantity)

    const res = await axios(`/api/cart/estimations?${search}`, {
      method: 'GET',
    })

    console.log('res', res.data)

    return res.data as Promise<{
      data: {
        totalPrice: number
        discountedPrice: number | null
      }
    }>
  }

  getCartBillingDetails = async (cartId: number) => {
    const url = `/api/cart/${cartId}/billing`

    const res = await fetch(url, {
      cache: 'no-store',
    })

    return res.json() as Promise<{
      data: {
        items: Record<
          number,
          {
            totalPrice: number
            discountedPrice: number | null
          }
        >
        total: number
      }
    }>
  }
}
