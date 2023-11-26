import { Skeleton, Stack, Text } from '@mantine/core'

import { CartItem } from '@/types/CartItem'

import CartItemSingle from './CartItemSingle'

export type CartItemsProps = {
  isLoading: boolean
  isFetched: boolean
  items: Array<CartItem>
  billingInfo: Record<
    number,
    {
      totalPrice: number
      discountedPrice: number | null
    }
  >
  onRefetch: () => void
}

const CartItems: React.FC<CartItemsProps> = ({
  isLoading,
  isFetched,
  items,
  billingInfo,
  onRefetch,
}) => {
  if (isFetched && !items?.length) return <Text>There is no items in your cart</Text>

  return (
    <Stack gap="sm">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => <Skeleton key={index} height={100} visible />)
        : items.map((item) => (
            <CartItemSingle
              key={item.id}
              item={item}
              total={billingInfo?.[item.id]?.totalPrice ?? null}
              discountedPrice={billingInfo?.[item.id]?.discountedPrice ?? null}
              onRefetch={onRefetch}
            />
          ))}
    </Stack>
  )
}

export default CartItems
