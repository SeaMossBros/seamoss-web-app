import qs from 'qs'

import { Order_NoRelations } from '@/types/Order'

import CMSService from './core/cms.service'
import axios from 'axios'

export default class OrderService extends CMSService {
  static queryKeys = {
    confirmPayment: (sessionId: string) => ['/payments/confirm', sessionId],
  }

  create = async (data: { cartId: number }) => {
    const url = `${this.baseURL}/orders`

    const payload = {
      data,
    }

    const res = await axios(url, {
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: JSON.stringify(payload),
    })

    return res.data as Promise<{
      data: Order_NoRelations
      paymentUrl: string
    }>
  }

  confirmPayment = async (sessionId: string) => {
    const url = `${this.baseURL}/payments/confirm${qs.stringify(
      {
        session_id: sessionId,
      },
      {
        addQueryPrefix: true,
      },
    )}`

    const res = await fetch(url, {
      headers: {
        ...this.headers,
        Accept: 'application/json',
      },
    })

    return res.json() as Promise<{
      order?: Order_NoRelations
      status: 'open' | 'complete' | 'expired'
    }>
  }
}
