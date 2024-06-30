import { Skeleton, Text } from '@mantine/core'
import { useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'
import { DiscountUnit } from '@/types/PurchaseOption'
import { formatPrice } from '@/utils/price'

const TotalPrice: React.FC = () => {
  const totalPrice = useWatch<ProductSelectionFormData, 'totalPrice'>({
    name: 'totalPrice',
  })
  const discountedPrice = useWatch<ProductSelectionFormData, 'discountedPrice'>({
    name: 'discountedPrice',
  })
  const variant = useWatch<ProductSelectionFormData, 'variant'>({
    name: 'variant',
  })

  if (!totalPrice)
    return (
      <Skeleton width={100} visible>
        <Text fz="xl" c="teal" fw={600}>
          --
        </Text>
      </Skeleton>
    )

  if (discountedPrice) {
    return (
      <Text component="p">
        <Text component="span" td="line-through">
          {formatPrice(totalPrice)}
        </Text>
        <Text component="span" c="teal" ml="sm" fz="xl" fw={600}>
          {formatPrice(discountedPrice)}
        </Text>
      </Text>
    )
  }

  if (
    variant.attributes.has_discount &&
    variant.attributes.discount_unit === DiscountUnit.Fiat &&
    variant.attributes.discount_value
  ) {
    return (
      <Text component="p">
        <Text component="p">
          <Text component="span" c="teal" fz="xl" fw={600}>
            {formatPrice(totalPrice)}
          </Text>
        </Text>
        <Text component="p">
          <Text c="red" component="span" td="line-through">
            {formatPrice(totalPrice + variant.attributes.discount_value * variant.quantity)}
          </Text>{' '}
          <Text component="span" fz="xs">
            (Save {formatPrice(variant.attributes.discount_value * variant.quantity)})
          </Text>
        </Text>
      </Text>
    )
  }

  return (
    <Text fz="xl" c="teal" fw={600}>
      {formatPrice(totalPrice)}
    </Text>
  )
}

export default TotalPrice
