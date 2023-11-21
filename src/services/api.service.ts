import qs from 'qs'

export default class APIService {
  static queryKeys = {
    getPriceEstimation: (...params: Parameters<APIService['getPriceEstimation']>) => [
      '/api/cart/estimations',
      params,
    ],
    getCartBillingDetails: (...params: Parameters<APIService['getCartBillingDetails']>) => [
      '/api/cart/:id/billing',
      params,
    ],
  }

  getPriceEstimation = async (variantId: number, quantity: number, purchaseOptionId: number) => {
    const search = qs.stringify({
      variant: variantId,
      purchaseOption: purchaseOptionId,
      quantity,
    })
    const res = await fetch(`/api/cart/estimations?${search}`)

    return res.json() as Promise<{
      data: {
        totalPrice: number
        discountedPrice: number | null
      }
    }>
  }

  getCartBillingDetails = async (cartId: number) => {
    const url = `/api/cart/${cartId}/billing`

    const res = await fetch(url)

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
