import { NextRequest } from 'next/server'

import ProductService from '@/services/product.service'
import { DiscountUnit } from '@/types/PurchaseOption'

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl

  try {
    const _variantId = searchParams.get('variant')
    const _purchaseOptionId = searchParams.get('purchaseOption')
    const _quantity = searchParams.get('quantity')

    if (!_variantId) throw new Error('Missing variant for estimation')
    if (!_purchaseOptionId) throw new Error('Missing purchase option for estimation')
    if (!_quantity) throw new Error('Missing quantity for estimation')

    const quantity = parseInt(_quantity)
    if (isNaN(quantity)) throw new Error('Invalid quantity value for estimation')

    const productService = new ProductService()
    const variantRes = await productService.getVariantById(parseInt(_variantId))

    if (!variantRes.data) throw new Error('Variant not found')

    const { attributes: variant } = variantRes.data

    const { unit_price, units_per_stock = 1 } = variant

    if (!unit_price) throw new Error('Variant unit price not defined')

    const totalPrice = unit_price * units_per_stock * quantity

    const purchaseOptionRes = await productService.getPurchaseOptionById(
      parseInt(_purchaseOptionId),
    )

    if (!purchaseOptionRes.data) throw new Error('Purchase option not found')

    const { attributes: purchaseOption } = purchaseOptionRes.data

    const discountedPrice = (() => {
      if (!purchaseOption.has_discount) return null
      const { discount_unit, discount_value = 0 } = purchaseOption

      switch (discount_unit) {
        case DiscountUnit.Fiat:
          return totalPrice - discount_value
        case DiscountUnit.Percentage:
          const percentageLeft = 100 - discount_value
          return (totalPrice / 100) * percentageLeft
        default:
          return null
      }
    })()

    return Response.json({
      data: {
        totalPrice,
        discountedPrice,
      },
    })
  } catch (err) {
    console.log('error:', err)
    return Response.json({ err })
  }
}
