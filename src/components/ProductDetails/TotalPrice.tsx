import { Text } from '@mantine/core'
import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'
import { formatPrice } from '@/utils/price'

const TotalPrice: React.FC = () => {
  const variant = useWatch<ProductSelectionFormData, 'variant'>({
    name: 'variant',
  })

  const totalPrice = useMemo(() => {
    if (!variant) return null

    const {
      attributes: { unit_price, units_per_stock = 1 },
      quantity,
    } = variant

    if (!unit_price) return null
    return unit_price * units_per_stock * quantity
  }, [variant])

  return (
    <Text fz="xl" c="primary-green" fw={600}>
      {formatPrice(totalPrice)}
    </Text>
  )
}

export default TotalPrice
