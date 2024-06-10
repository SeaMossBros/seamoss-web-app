import { Skeleton, Text } from '@mantine/core'
import { useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'
import { formatPrice } from '@/utils/price'

const TotalPrice: React.FC = () => {
  const totalPrice = useWatch<ProductSelectionFormData, 'totalPrice'>({
    name: 'totalPrice',
  })
  const discountedPrice = useWatch<ProductSelectionFormData, 'discountedPrice'>({
    name: 'discountedPrice',
  })

  // console.log('total price', totalPrice);
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

  return (
    <Text fz="xl" c="teal" fw={600}>
      {formatPrice(totalPrice)}
    </Text>
  )
}

export default TotalPrice
