import { Center, Skeleton, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCallback, useState } from 'react'

import { CartItem } from '@/types/CartItem'

import CartItemUpdateModal from '../CartItemUpdateModal'
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
  const [itemToUpdate, setItemToUpdate] = useState<CartItem | null>(null)
  const [updateModalOpened, updateModal] = useDisclosure(false, {
    onClose: () => {
      setItemToUpdate(null)
      onRefetch()
    },
  })

  const onRequestUpdate = useCallback(
    (item: CartItem) => {
      setItemToUpdate(item)
      updateModal.open()
    },
    [updateModal],
  )

  if (isFetched && !items?.length) return (
    <Center>
      <Text>There is no items in your cart</Text>
    </Center>
  )

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
              onRequestUpdate={onRequestUpdate}
            />
          ))}
      {itemToUpdate ? (
        <CartItemUpdateModal
          item={itemToUpdate}
          opened={updateModalOpened}
          onClose={updateModal.close}
        />
      ) : null}
    </Stack>
  )
}

export default CartItems
