import qs from 'qs'

export default class APIService {
  static queryKeys = {
    getPriceEstimation: (...params: Parameters<APIService['getPriceEstimation']>) => [
      '/api/estimations',
      params,
    ],
  }

  getPriceEstimation = async (variantId: number, quantity: number, purchaseOptionId: number) => {
    const search = qs.stringify({
      variant: variantId,
      purchaseOption: purchaseOptionId,
      quantity,
    })
    const res = await fetch(`/api/estimations?${search}`)

    return res.json() as Promise<{
      data: {
        totalPrice: number
        discountedPrice: number | null
      }
    }>
  }
}
